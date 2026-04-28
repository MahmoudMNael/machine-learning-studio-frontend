import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { dataFilesStore } from '../state/data-files';

interface Metric {
	label: string;
	value: string | number;
}

@Component({
	selector: 'app-results-section',
	imports: [],
	templateUrl: './results-section.component.html',
	styleUrl: './results-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsSectionComponent {
	protected readonly metrics = signal<Metric[]>([
		{ label: 'Accuracy', value: 0.94 },
		{ label: 'Precision', value: 0.91 },
		{ label: 'Recall', value: 0.96 },
		{ label: 'F1-Score', value: 0.93 },
	]);
}
