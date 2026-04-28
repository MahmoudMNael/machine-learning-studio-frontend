import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { IngestionSectionComponent } from '../ingestion-section/ingestion-section.component';
import { SectionLayoutComponent } from './section-layout/section-layout.component';
import { SelectionSectionComponent } from './selection-section/selection-section.component';

@Component({
	selector: 'app-root',
	imports: [HeroSectionComponent, IngestionSectionComponent, SectionLayoutComponent, SelectionSectionComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}