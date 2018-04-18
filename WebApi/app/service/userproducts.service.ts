import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BaseService } from "./base.service";
import { Global } from '../constants/global';

/**
 * Базовый сервис (CRUD)
 */
@Injectable()
export class UserProductsService extends BaseService {
	url: string = Global.BASE_USER_PRODUCTS_ENDPOINT;


	/**
	 * .ctor
	 * @param _http 
	 */
	constructor(protected _http: Http) { super(_http); }
}