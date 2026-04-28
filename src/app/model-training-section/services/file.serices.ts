import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataFile } from '../../state/data-files/data-files.store';

@Injectable({
	providedIn: 'root',
})
export class FileUploadService {
	private readonly _endpoint = '/api/train';

	constructor(private readonly http: HttpClient) {}

	public uploadDataFile(dataFile: DataFile): Observable<HttpEvent<any>> {
		const form = new FormData();
		form.append('file', dataFile.file, dataFile.name);
		form.append('metadata', JSON.stringify({ id: dataFile.id, name: dataFile.name, columns: dataFile.columns }));

		return this.http.post(this._endpoint, form, {
			reportProgress: true,
			observe: 'events',
		});
	}
}

