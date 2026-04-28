import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { dataFilesStore } from '../state/data-files';
import { FileUploadService } from './services/file.serices';

type TrainingStatus = 'idle' | 'success' | 'error';

@Component({
    selector: 'app-model-training-section',
    imports: [],
    templateUrl: './model-training-section.component.html',
    styleUrl: './model-training-section.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModelTrainingSectionComponent {
    public readonly dataFile = dataFilesStore.current;
    public readonly isTraining = signal(false);
    public readonly trainingProgress = signal(0);
    public readonly trainingStatus = signal<TrainingStatus>('idle');
    public readonly trainingStatusMessage = signal('');

    private _trainingTimerId: ReturnType<typeof setInterval> | undefined;

    public trainModel(): void {
        const dataFile = this.dataFile();
		if (!dataFile) {
			this.trainingStatus.set('error');
			this.trainingStatusMessage.set('No data file selected for training.');
			return;
		}

		this.isTraining.set(true);
		this.trainingProgress.set(0);
		this.trainingStatus.set('idle');
		this.trainingStatusMessage.set('Training in progress...');

		FileUploadService.prototype.uploadDataFile(dataFile).subscribe({	
			next: (event) => {
				if (event.type === 1 && event.total) {
					const progress = Math.round((event.loaded / event.total) * 100);
					this.trainingProgress.set(progress);
				} else if (event.type === 4) {
					this.finishTraining();
				}
			}
		});
    }

    private finishTraining(): void {
        if (this._trainingTimerId) {
            clearInterval(this._trainingTimerId);
            this._trainingTimerId = undefined;
        }

        this.isTraining.set(false);
        this.trainingStatus.set('success');
        this.trainingStatusMessage.set(`Training completed for ${this.dataFile()?.name ?? 'the selected file'}.`);
    }
}
