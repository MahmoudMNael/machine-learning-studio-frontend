import { Component } from '@angular/core';
import { IngestionSectionComponent } from '../ingestion-section/ingestion-section.component';

@Component({
  selector: 'app-root',
  imports: [IngestionSectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class App {}

