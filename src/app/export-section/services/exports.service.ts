import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class ExportsService {
	private readonly http = inject(HttpClient);
	private readonly _filesEndpoint = 'http://localhost:8000/api/files';

	public downloadExport(fileId: number, fileType: string): void {
		this.http
			.get(`${this._filesEndpoint}/${fileId}`, {
				observe: 'response',
				responseType: 'blob',
			})
			.subscribe((response) => this._downloadBlob(response, fileId, fileType));
	}

	private _downloadBlob(response: HttpResponse<Blob>, fileId: number, fileType: string): void {
		const blob = response.body;

		if (!blob) {
			return;
		}

		const downloadUrl = URL.createObjectURL(blob);
		const anchor = document.createElement('a');
		anchor.href = downloadUrl;
		console.log(response.headers.get('content-disposition'));
		anchor.download = this._getFileName(
			response.headers.get('content-disposition'),
			fileId,
			fileType,
		);
		anchor.click();
		URL.revokeObjectURL(downloadUrl);
	}

	private _getFileName(
		contentDisposition: string | null,
		fileId: number,
		fileType: string,
	): string {
		if (!contentDisposition) {
			return `file-${fileId}.${fileType}`;
		}

		const fileNameMatch = /filename\*=UTF-8''([^;]+)|filename="?([^";]+)"?/i.exec(
			contentDisposition,
		);
		return decodeURIComponent(
			fileNameMatch?.[1] ?? fileNameMatch?.[2] ?? `file-${fileId}.${fileType}`,
		);
	}
}
