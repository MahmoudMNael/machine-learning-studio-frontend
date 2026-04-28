import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

interface FileParseResult {
	columns: string[];
	rows: Record<string, unknown>[];
	fileName: string;
	totalRows: number;
}

@Injectable({
	providedIn: 'root',
})
export class FilesService {
	public async handleFile(file: File): Promise<FileParseResult> {
		const fileExtension = file.name.split('.').pop()?.toLowerCase();
		let obj 

		if (fileExtension === 'csv') {
			obj = this._handleCSVFile(file);
			return await obj;
		}

		if (fileExtension === 'xlsx' || fileExtension === 'xls') {
			obj = this._handleExcelFile(file);
			return await obj;
		}

		return {
			columns: [],
			rows: [],
			fileName: '',
			totalRows: 0,
		};
	}

	private _handleCSVFile(file: File): Promise<FileParseResult> {
		return new Promise<FileParseResult>((resolve, reject) => {
			const reader = new FileReader();

			reader.onload = () => {
				const data = String(reader.result ?? '');
				const rows = data
					.split('\n')
					.map((row) => row.trim())
					.filter((row) => row.length > 0);

				if (rows.length === 0) {
					resolve({
						columns: [],
						rows: [],
						fileName: file.name,
						totalRows: 0,
					});
					return;
				}

				const headers = rows[0].split(',').map((header) => header.trim());
				const parsedRows = rows.slice(1).map((row) => {
					const values = row.split(',').map((value) => value.trim());
					const rowObj: Record<string, unknown> = {};
					headers.forEach((header, index) => {
						rowObj[header] = values[index] ?? null;
					}
					);
					return rowObj;
				});

				resolve({
					columns: headers,
					rows: parsedRows,
					fileName: file.name,
					totalRows: parsedRows.length,
				});
			};

			reader.onerror = () => reject(reader.error);
			reader.readAsText(file);
		});
	}

	private async _handleExcelFile(file: File): Promise<FileParseResult> {
		return new Promise<FileParseResult>((resolve, reject) => {
			const reader = new FileReader();

			reader.onload = () => {
				const data = new Uint8Array(reader.result as ArrayBuffer);
				const workbook = XLSX.read(data, { type: 'array' });
				const sheet = workbook.Sheets[workbook.SheetNames[0]];
				const result: FileParseResult = {
					columns: [],
					rows: [],
					fileName: file.name,
					totalRows: 0,
				};

				const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as unknown[][];
				result.totalRows = rows.length;

				const headers = rows[0] as string[];
				result.columns = headers;

				for (let i = 1; i < rows.length; i++) {
					const row = rows[i];
					const rowObj: Record<string, unknown> = {};
					headers.forEach((header, index) => {
						rowObj[header] = row[index] ?? null;
					}
					);
					result.rows.push(rowObj);
				}

				resolve(result);
			};

			reader.onerror = () => reject(reader.error);
			reader.readAsArrayBuffer(file);
		},);
	}
}


