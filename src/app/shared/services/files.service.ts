import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

interface PreviewData {
	columns: string[];
	rows: Record<string, unknown>[];
	fileName: string;
	totalRows: number;
}

@Injectable({
	providedIn: 'root',
})
export class FilesService {
	public handleFile(file: File): PreviewData {
		const fileExtension = file.name.split('.').pop()?.toLowerCase();
		let obj;
		if (fileExtension === 'csv') {
			obj = this._handleCSVFile(file);
		} else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
			obj = this._handleExcelFile(file);
		}

		return obj;
	}

	private _handleCSVFile(file: File): PreviewData {
		const reader = new FileReader();

		reader.onload = (e: ProgressEvent<FileReader>) => {
			const content = e.target?.result as string;
			const columns = this.parseCSVColumns(content);
			const rows = this._parseCSV(content).rows;

			return {
				columns,
				rows,
				fileName: file.name,
				totalRows: rows.length,
			};
		};

		reader.readAsText(file);
	}

	private _handleExcelFile(file: File): PreviewData {
		const reader = new FileReader();

		reader.onload = (e: ProgressEvent<FileReader>) => {
			const data = e.target?.result as ArrayBuffer;
			const workbook = XLSX.read(data, { type: 'array' });
			const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
			const jsonData: Record<string, unknown>[] = XLSX.utils.sheet_to_json(firstSheet);

			if (jsonData.length === 0) {
				return;
			}

			const columns = Object.keys(jsonData[0]);
			const rows = jsonData;

			return {
				columns,
				rows,
				fileName: file.name,
				totalRows: rows.length,
			};
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

		const columns = lines[0].split(',').map((col) => col.trim());
		const rows = lines.slice(1).map((line) => {
			const values = line.split(',').map((val) => val.trim());
			const row: Record<string, unknown> = {};
			columns.forEach((col, index) => {
				row[col] = values[index] ?? '';
			});
			return row;
		});

		return { columns, rows };
	}
}
