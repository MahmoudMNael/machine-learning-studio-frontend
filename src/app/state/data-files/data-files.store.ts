import { signal } from '@angular/core';

export interface DataFile {
	id: string;
	name: string;
	size: number;
	mimeType: string;
	file: File;
	columns: string[];
	targetColumn: string | null;
}

interface DataFilesStore {
	current: DataFile | null;
	loading: boolean;
	error: string | null;
}

const initialState: DataFilesStore = {
	current: null,
	loading: false,
	error: null,
};

const _store = signal<DataFilesStore>(initialState);

export const dataFilesStore = {
	// Signals
	state: _store.asReadonly(),
	current: () => _store().current,
	loading: () => _store().loading,
	error: () => _store().error,

	// Methods
	setDataFile: (file: File, columns: string[], targetColumn: string | null = null): DataFile => {
		const dataFile: DataFile = {
			id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
			name: file.name,
			size: file.size,
			mimeType: file.type || 'application/octet-stream',
			file,
			columns: columns,
			targetColumn,
		};
		_store.update((state) => ({
			...state,
			current: dataFile,
			loading: false,
			error: null,
		}));
		return dataFile;
	},

	setTargetColumn: (targetColumn: string | null): void => {
		_store.update((state) => {
			if (!state.current) {
				return state;
			}

			return {
				...state,
				current: {
					...state.current,
					targetColumn,
				},
			};
		});
	},

	clearDataFile: (): void => {
		_store.set(initialState);
	},

	getDataFile: (): DataFile | null => _store().current,
};
