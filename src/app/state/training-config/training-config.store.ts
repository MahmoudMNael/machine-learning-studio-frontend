import { signal } from '@angular/core';

export type TaskType = 'classification' | 'regression' | 'clustering';

interface TrainingConfigStore {
	taskType: TaskType;
	targetColumn: string | null;
}

const initialState: TrainingConfigStore = {
	taskType: 'classification',
	targetColumn: null,
};

const _store = signal<TrainingConfigStore>(initialState);

export const trainingConfigStore = {
	state: _store.asReadonly(),
	taskType: () => _store().taskType,
	targetColumn: () => _store().targetColumn,
	isSupervised: () => _store().taskType !== 'clustering',
	setTaskType: (taskType: TaskType): void => {
		_store.update((state) => ({
			...state,
			taskType,
			targetColumn: taskType === 'clustering' ? null : state.targetColumn,
		}));
	},
	setTargetColumn: (targetColumn: string | null): void => {
		_store.update((state) => ({
			...state,
			targetColumn: taskTypeAllowsTarget(state.taskType) ? targetColumn : null,
		}));
	},
	clear: (): void => {
		_store.set(initialState);
	},
};

function taskTypeAllowsTarget(taskType: TaskType): boolean {
	return taskType !== 'clustering';
}
