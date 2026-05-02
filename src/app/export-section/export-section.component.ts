import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { sessionStore } from '../state/session';
import { ExportsService } from './services/exports.service';

interface ExportFormat {
	label: string;
	variant: 'secondary' | 'primary';
}

@Component({
	selector: 'app-export-section',
	imports: [],
	templateUrl: './export-section.component.html',
	styleUrl: './export-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExportSectionComponent {
	protected readonly exportsService = inject(ExportsService);
	protected readonly session = sessionStore.current();

	protected download(format: string) {
		const file = this.session?.report?.bestModel.files.find((item) => item.type == format);

		if (file?.id) {
			this.exportsService.downloadExport(file.id, file.type);
		}
	}

	protected readonly exportFormats: ExportFormat[] = [
		{ label: 'pkl', variant: 'secondary' },
		{ label: 'joblib', variant: 'primary' },
	];
}
