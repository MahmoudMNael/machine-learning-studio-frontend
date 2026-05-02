import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, expand, Observable, switchMap, takeWhile, tap, timer } from 'rxjs';
import { DataFile } from '../../state/data-files/data-files.store';
import { Report, sessionStore } from '../../state/session/session.store';

interface UploadDatasetResponse {
	session_id: string;
	dataset_id: string;
	status: 'queued';
}

export interface ResultsResponse {
	status: 'resultstatus.in_progress' | 'resultstatus.done' | 'resultstatus.failed';
	error_message?: string;
	report?: unknown;
}

@Injectable({
	providedIn: 'root',
})
export class DatasetsService {
	private readonly _endpoint = 'http://localhost:8000/api/train';

	constructor(private readonly http: HttpClient) {}

	public uploadDataset(
		file: DataFile,
		taskType: string,
		targetColumn: string | null = null,
	): Observable<UploadDatasetResponse> {
		const formData = new FormData();
		formData.append('file', file.file, file.name);
		formData.append('task_type', taskType);

		if (targetColumn) {
			formData.append('target_column', targetColumn);
		}

		return this.http.post<UploadDatasetResponse>(this._endpoint, formData);
	}

	public uploadDatasetAndStartSession(
		file: DataFile,
		taskType: string,
		targetColumn: string | null = null,
	): Observable<UploadDatasetResponse> {
		return this.uploadDataset(file, taskType, targetColumn).pipe(
			tap((response) => {
				sessionStore.init(response.session_id);
			}),
		);
	}

	private _pollResults(sessionId: string, intervalMs = 1000): Observable<ResultsResponse> {
		const url = `http://localhost:8000/api/results/${sessionId}`;

		return this.http.get<ResultsResponse>(url).pipe(
			expand((resp) =>
				resp.status === 'resultstatus.in_progress'
					? timer(intervalMs).pipe(switchMap(() => this.http.get<ResultsResponse>(url)))
					: EMPTY,
			),
			takeWhile((resp) => resp.status === 'resultstatus.in_progress', true),
		);
	}

	/**
	 * Polls and when result is `done` maps the snake_case response to the
	 * app `Report` shape and writes it into the `sessionStore` via `setResult`.
	 * Returns the same stream of `ResultsResponse` so callers can subscribe.
	 */
	public pollAndSetResult(sessionId: string, intervalMs = 1000): Observable<ResultsResponse> {
		return this._pollResults(sessionId, intervalMs).pipe(
			tap((resp) => {
				console.log('Polling result:', resp);
				if (resp.status === 'resultstatus.done' && resp.report) {
					const r: any = resp.report;
					const mapped: Report = {
						taskType: r.task_type,
						trainingTimeSeconds: r.training_time_seconds,
						bestModel: {
							modelType: r.best_model?.model_type,
							metrics: r.best_model?.metrics ?? {},
							files: (r.best_model?.files ?? []).map((f: any) => ({
								id: f.id,
								type: f.type,
								name: f.file_name ?? f.filename ?? f.name,
							})),
						},
					};

					sessionStore.setResult(mapped);
				} else if (resp.status === 'resultstatus.failed') {
					sessionStore.setError(resp.error_message ?? 'Training failed');
				}
			}),
		);
	}
}
