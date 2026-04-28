import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ExportSectionComponent } from './export-section/export-section.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { IngestionSectionComponent } from './ingestion-section/ingestion-section.component';
import { ResultsSectionComponent } from './results-section/results-section.component';
import { SectionLayoutComponent } from './section-layout/section-layout.component';
import { SelectionSectionComponent } from './selection-section/selection-section.component';
import { ModelTrainingSectionComponent } from './model-training-section/model-training-section.component';

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
export class App {}
