import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

/**
 * Базовый сервис (CRUD)
 */
@Injectable()
export class BaseService {
	protected url: string;

	/**
	 * .ctor
	 * @param _http 
	 */
	constructor(protected _http: Http) { }

	/**
	 * Полусить данные
	 * @param url
	 */
	get(): Observable<any> {
		if (this.url == null) {
			console.log('Url is empty.');
			return null;
		}

		return this._http.get(this.url)
			.map((response: Response) => <any>response.json())
			.do(data => console.log("All: " + JSON.stringify(data)))
			.catch(this.handleError);
	}

	/**
	 * Отправить дпанные на сохраенние
	 * @param url
	 * @param model
	 */
	post(model: any): Observable<any> {
		if (this.url == null) {
			console.log('Url is empty.');
			return null;
		}

		let body = JSON.stringify(model);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this._http.post(this.url, body, options)
			.map((response: Response) => <any>response.json())
			.catch(this.handleError);
	}

	/**
	 * Обновить данные
	 * @param url
	 * @param id
	 * @param model
	 */
	put(id: number, model: any): Observable<any> {

		if (this.url == null) {
			console.log('Url is empty.');
			return null;
		}

		let body = JSON.stringify(model);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this._http.put(this.url + id, body, options)
			.map((response: Response) => <any>response.json())
			.catch(this.handleError);
	}

	/**
	 * Удалить объект по ид
	 * @param url
	 * @param id
	 */
	delete(id: number): Observable<any> {
		if (this.url == null) {
			console.log('Url is empty.');
			return null;
		}

		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this._http.delete(this.url + id, options)
			.map((response: Response) => <any>response.json())
			.catch(this.handleError);
	}

	/**
	 * Обработать ошибку
	 * @param error
	 */
	private handleError(error: Response) {
		console.error(error);
		return Observable.throw(error.json().error || 'Server error');
	}
}
