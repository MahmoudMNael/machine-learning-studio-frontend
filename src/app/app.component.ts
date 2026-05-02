import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { ExportSectionComponent } from './export-section/export-section.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { IngestionSectionComponent } from './ingestion-section/ingestion-section.component';
import { ModelTrainingSectionComponent } from './model-training-section/model-training-section.component';
import { ResultsSectionComponent } from './results-section/results-section.component';
import { SectionLayoutComponent } from './section-layout/section-layout.component';
import { SelectionSectionComponent } from './selection-section/selection-section.component';
import { dataFilesStore } from './state/data-files/data-files.store';
import { Status, sessionStore } from './state/session/session.store';

@Component({
	selector: 'app-root',
	imports: [
		HeroSectionComponent,
		SectionLayoutComponent,
		SelectionSectionComponent,
		ResultsSectionComponent,
		IngestionSectionComponent,
		ModelTrainingSectionComponent,
		ExportSectionComponent,
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
	public readonly isFileUploaded = computed(() => dataFilesStore.current() !== null);
	public readonly isSessionInitialized = computed(
		() => sessionStore.current() !== null && sessionStore.status() === Status.Done,
	);
}
