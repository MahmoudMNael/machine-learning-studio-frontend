import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-hero-section',
	templateUrl: './hero-section.component.html',
	styleUrl: './hero-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSectionComponent {
	protected readonly title = 'Machine Learning Studio';
}
