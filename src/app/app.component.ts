import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HeroSectionComponent } from './hero-section/hero-section.component';
import { SectionLayoutComponent } from './section-layout/section-layout.component';

@Component({
	selector: 'app-root',
	imports: [HeroSectionComponent, SectionLayoutComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
