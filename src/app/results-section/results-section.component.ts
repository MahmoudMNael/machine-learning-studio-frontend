import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { sessionStore } from '../state/session';

@Component({
	imports: [DecimalPipe],
	selector: 'app-results-section',
	templateUrl: './results-section.component.html',
	styleUrl: './results-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsSectionComponent {
	protected readonly metrics = computed<Record<string, number>>(
		() => sessionStore.current()?.report?.bestModel.metrics ?? {},
	);

	protected readonly modelType = computed<string>(
		() => sessionStore.current()?.report?.bestModel.modelType ?? 'N/A',
	);

	protected readonly metricEntries = computed(() =>
		Object.entries(this.metrics()).map(([key, value]) => ({ key, value })),
	);

	protected isInteger(value: number): boolean {
		return Number.isInteger(value);
	}
}
