import {
	ChangeDetectionStrategy,
	Component,
	computed,
	DestroyRef,
	effect,
	inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { dataFilesStore } from '../state/data-files';
import { sessionStore, Status } from '../state/session';
import { trainingConfigStore } from '../state/training-config';
import { DatasetsService } from './services/datasets.service';

@Component({
	selector: 'app-model-training-section',
	imports: [],
	templateUrl: './model-training-section.component.html',
	styleUrl: './model-training-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModelTrainingSectionComponent {
	private readonly datasetsService = inject(DatasetsService);
	public readonly dataFile = dataFilesStore.current;
	protected readonly selectedTaskType = trainingConfigStore.taskType;
	protected readonly selectedTargetColumn = trainingConfigStore.targetColumn;

	protected readonly isInProgress = computed(() => sessionStore.status() == Status.InProgress);

	public trainModel(): void {
		const file = this.dataFile();

		if (!file) {
			return;
		}

		this.datasetsService
			.uploadDatasetAndStartSession(file, this.selectedTaskType(), this.selectedTargetColumn())
			.subscribe({
				error: (error: unknown) => {
					sessionStore.setError(
						error instanceof Error ? error.message : 'Failed to start training',
					);
				},
			});
	}

	private readonly _destroyRef = inject(DestroyRef);
	private _activePollingSessionId: string | null = null;

	private readonly _watchSessionForPolling = effect(() => {
		const currentSession = sessionStore.current();
		const status = sessionStore.status();

		console.log(status);

		if (!currentSession || status !== Status.InProgress) {
			this._activePollingSessionId = null;
			return;
		}

		if (this._activePollingSessionId === currentSession.sessionId) {
			return;
		}

		this._activePollingSessionId = currentSession.sessionId;

		this.datasetsService
			.pollAndSetResult(currentSession.sessionId)
			.pipe(takeUntilDestroyed(this._destroyRef))
			.subscribe();
	});
}
