import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FilesService } from '../shared/services/files.service';
import { dataFilesStore } from '../state/data-files';

interface PreviewData {
	columns: string[];
	rows: Record<string, unknown>[];
	fileName: string;
	totalRows: number;
}

@Component({
	selector: 'app-ingestion-section',
	templateUrl: './ingestion-section.component.html',
	styleUrls: ['./ingestion-section.component.scss'],
	imports: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngestionSectionComponent {
	private readonly filesService = inject(FilesService);
	private readonly MAX_PREVIEW_ROWS = 5;

	readonly dropHeader = 'Upload Dataset';
	readonly dropContent = 'Drag and drop your .csv or .xlsx files here';
	readonly uploadButtonText = 'Select a file to upload';
	readonly previewHeader = 'Data Preview';
	readonly acceptedFileTypes = '.csv,.xlsx,xls';

	private readonly _previewData = signal<PreviewData | null>(null);
	private readonly _isDragOverState = signal(false);

	readonly _hasData = computed(() => this._previewData() !== null);
	readonly _fileName = computed(() => this._previewData()?.fileName ?? '');
	readonly _columns = computed(() => this._previewData()?.columns ?? []);
	readonly _previewRows = computed(
		() => this._previewData()?.rows.slice(0, this.MAX_PREVIEW_ROWS) ?? [],
	);
	readonly _previewSummary = computed(() => {
		const data = this._previewData();
		return data ? `Showing 5 of ${data.totalRows} rows` : '';
	});

	_isDragOver(): boolean {
		return this._isDragOverState();
	}

	onDragOver(event: DragEvent): void {
		event.preventDefault();
		this._isDragOverState.set(true);
	}

	onDragLeave(event: DragEvent): void {
		event.preventDefault();
		this._isDragOverState.set(false);
	}

	async onDrop(event: DragEvent) {
		event.preventDefault();
		this._isDragOverState.set(false);

		const files = event.dataTransfer?.files;
		if (files && files.length > 0) {
			let obj = await this.filesService.handleFile(files[0]);
			this._previewData.set({
				columns: obj.columns,
				rows: obj.rows,
				fileName: obj.fileName,
				totalRows: obj.totalRows,
			});
			dataFilesStore.setDataFile(files[0], obj.columns);
		}
	}

	async onFileSelected(event: Event) {
		const input = event.target as HTMLInputElement;
		const files = input.files;
		if (files && files.length > 0) {
			let obj = await this.filesService.handleFile(files[0]);
			this._previewData.set({
				columns: obj.columns,
				rows: obj.rows,
				fileName: obj.fileName,
				totalRows: obj.totalRows,
			});
			dataFilesStore.setDataFile(files[0], obj.columns);
		}
	}

	public openFilePicker(fileInput: HTMLInputElement, event?: Event): void {
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}
		fileInput.click();
	}
}
