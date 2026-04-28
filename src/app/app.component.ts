import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { ResultsSectionComponent } from './results-section/results-section.component';
import { IngestionSectionComponent } from './ingestion-section/ingestion-section.component';
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
		ModelTrainingSectionComponent
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
