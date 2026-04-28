import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';

interface PreviewData {
  columns: string[];
  rows: Record<string, unknown>[];
  fileName: string;
  totalRows: number;
}

@Component({
  selector: 'app-ingestion-section',
  templateUrl: './ingestion-section.component.html',
  styleUrls: ['./ingestion-section.component.scss'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngestionSectionComponent {
  private readonly MAX_PREVIEW_ROWS = 5;

  readonly headerNumber = '1';
  readonly headerTitle = 'Data Ingestion';
  readonly dropHeader = 'Upload Dataset';
  readonly dropContent = 'Drag and drop your .csv or .xlsx files here';
  readonly uploadButtonText = 'or click to browse';
  readonly previewHeader = 'Data Preview';
  readonly acceptedFileTypes = '.csv,.xlsx,xls';

  private readonly _previewData = signal<PreviewData | null>(null);
  private readonly _isDragOverState = signal(false);

  readonly _hasData = computed(() => this._previewData() !== null);
  readonly _fileName = computed(() => this._previewData()?.fileName ?? '');
  readonly _columns = computed(() => this._previewData()?.columns ?? []);
  readonly _previewRows = computed(() => 
    this._previewData()?.rows.slice(0, this.MAX_PREVIEW_ROWS) ?? []
  );
  readonly _previewSummary = computed(() => {
    const data = this._previewData();
    return data ? `Showing 5 of ${data.totalRows} rows` : '';
  });

  _isDragOver(): boolean {
    return this._isDragOverState();
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this._isDragOverState.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this._isDragOverState.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this._isDragOverState.set(false);

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this._handleFile(files[0]);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files && files.length > 0) {
      this._handleFile(files[0]);
    }
  }

  private _handleFile(file: File): void {
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (fileExtension === 'csv') {
      this._handleCSVFile(file);
    } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
      this._handleExcelFile(file);
    }
  }

  private _handleCSVFile(file: File): void {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const content = e.target?.result as string;
      const columns = this.parseCSVColumns(content);
      const rows = this._parseCSV(content).rows;

      this._previewData.set({
        columns,
        rows,
        fileName: file.name,
        totalRows: rows.length,
      });
    };

    reader.readAsText(file);
  }

  private _handleExcelFile(file: File): void {
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const data = e.target?.result as ArrayBuffer;
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData: Record<string, unknown>[] = XLSX.utils.sheet_to_json(
        firstSheet
      );

      if (jsonData.length === 0) {
        return;
      }

      const columns = Object.keys(jsonData[0]);
      const rows = jsonData;

      this._previewData.set({
        columns,
        rows,
        fileName: file.name,
        totalRows: rows.length,
      });
    };

    reader.readAsArrayBuffer(file);
  }

  public readonly parseCSVColumns = (content: string): string[] => {
    const lines = content.trim().split('\n');
    if (lines.length === 0) {
      return [];
    }

    return lines[0]
      .split(',')
      .map((col) => col.trim())
      .filter((col) => col.length > 0);
  };

  private _parseCSV(content: string): { columns: string[]; rows: Record<string, unknown>[] } {
    const lines = content.trim().split('\n');
    if (lines.length === 0) {
      return { columns: [], rows: [] };
    }

    const columns = lines[0].split(',').map(col => col.trim());
    const rows = lines.slice(1).map(line => {
      const values = line.split(',').map(val => val.trim());
      const row: Record<string, unknown> = {};
      columns.forEach((col, index) => {
        row[col] = values[index] ?? '';
      });
      return row;
    });

    return { columns, rows };
  }

  public openFilePicker(fileInput: HTMLInputElement, event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    fileInput.click();
  }
}