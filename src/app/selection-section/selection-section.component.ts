import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { dataFilesStore } from '../state/data-files';

interface TaskChoice {
	id: number;
	title: string;
	description: string;
	icon: string;
	type: 'supervised' | 'unsupervised';
}

@Component({
	selector: 'app-selection-section',
	templateUrl: './selection-section.component.html',
	styleUrl: './selection-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectionSectionComponent {
	protected readonly choices = signal<TaskChoice[]>([
		{
			id: 1,
			title: 'Classification',
			description: 'Predict discrete categories or classes.',
			icon: 'pi pi-tags',
			type: 'supervised',
		},
		{
			id: 2,
			title: 'Regression',
			description: 'Predict continuous numerical values.',
			icon: 'pi pi-chart-line',
			type: 'supervised',
		},
		{
			id: 3,
			title: 'Clustering',
			description: 'Group similar data points together.',
			icon: 'pi pi-share-alt',
			type: 'unsupervised',
		},
	]);

	private readonly selectedOptionId = signal<number>(1);

	protected readonly selectedOption = computed(() => {
		const id = this.selectedOptionId();
		return this.choices().find((choice) => choice.id === id) || this.choices()[0];
	});

	protected readonly selectedFile = dataFilesStore.current;

	selectOption(id: number) {
		this.selectedOptionId.set(id);
	}
}
