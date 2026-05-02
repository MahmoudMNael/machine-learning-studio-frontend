import { signal } from '@angular/core';

type FileType = 'pkl' | 'joblib';

export enum Status {
	InProgress = 'in_progress',
	Done = 'done',
	Fail = 'failed',
}

interface File {
	id: number;
	type: FileType;
	name?: string;
}

interface BestModel {
	modelType: string;
	metrics: Record<string, number>;
	files: File[];
}

export interface Report {
	taskType: string;
	trainingTimeSeconds: number;
	bestModel: BestModel;
}

export interface Session {
	sessionId: string;
	report: Report | null;
}

interface SessionStore {
	current: Session | null;
	status: Status | null;
	error: string | null;
}

const initialState: SessionStore = {
	current: null,
	status: null,
	error: null,
};

const _store = signal<SessionStore>(initialState);

export const sessionStore = {
	state: _store.asReadonly(),
	current: () => _store().current,
	status: () => _store().status,
	error: () => _store().error,
	init: (sessionId: string): void => {
		_store.set({
			current: {
				sessionId,
				report: null,
			},
			status: Status.InProgress,
			error: null,
		});
	},

	setResult: (report: Report): void => {
		const currentSession = _store().current;

		if (!currentSession) {
			return;
		}

		_store.set({
			current: {
				...currentSession,
				report,
			},
			status: Status.Done,
			error: null,
		});
	},

	setError: (errorMessage: string): void => {
		const currentSession = _store().current;

		if (!currentSession) {
			return;
		}

		_store.set({
			current: currentSession,
			status: Status.Fail,
			error: errorMessage,
		});
	},

	clear: (): void => {
		_store.set(initialState);
	},
};
