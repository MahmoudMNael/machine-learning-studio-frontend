import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
	selector: 'app-section-layout',
	imports: [],
	templateUrl: './section-layout.component.html',
	styleUrl: './section-layout.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionLayoutComponent {
	private static nextHeaderId = 0;

	public readonly sectionNumber = input.required<string>();
	public readonly sectionHeader = input.required<string>();
	protected readonly headerId = `section-layout-header-${SectionLayoutComponent.nextHeaderId++}`;
}
