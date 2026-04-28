import { ChangeDetectionStrategy, Component } from '@angular/core';

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
	protected readonly exportFormats: ExportFormat[] = [
		{ label: '.pkl', variant: 'secondary' },
		{ label: '.joblib', variant: 'primary' },
	];
}
