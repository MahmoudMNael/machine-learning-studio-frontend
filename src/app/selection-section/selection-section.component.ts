import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { dataFilesStore } from '../state/data-files';
import { TaskType, trainingConfigStore } from '../state/training-config';

interface TaskChoice {
	id: number;
	title: string;
	description: string;
	icon: string;
	taskType: TaskType;
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
			taskType: 'classification',
		},
		{
			id: 2,
			title: 'Regression',
			description: 'Predict continuous numerical values.',
			icon: 'pi pi-chart-line',
			taskType: 'regression',
		},
		{
			id: 3,
			title: 'Clustering',
			description: 'Group similar data points together.',
			icon: 'pi pi-share-alt',
			taskType: 'clustering',
		},
	]);

	protected readonly selectedOption = computed(() => {
		const taskType = trainingConfigStore.taskType();
		return this.choices().find((choice) => choice.taskType === taskType) || this.choices()[0];
	});

	protected readonly selectedFile = dataFilesStore.current;
	protected readonly selectedTaskType = trainingConfigStore.taskType;
	protected readonly selectedTargetColumn = trainingConfigStore.targetColumn;

	selectOption(taskType: TaskType): void {
		trainingConfigStore.setTaskType(taskType);
		if (taskType === 'clustering') {
			dataFilesStore.setTargetColumn(null);
		}
	}

	selectTargetColumn(event: Event): void {
		const selectElement = event.target as HTMLSelectElement;
		const targetColumn = selectElement.value || null;
		trainingConfigStore.setTargetColumn(targetColumn);
		dataFilesStore.setTargetColumn(targetColumn);
	}
}
