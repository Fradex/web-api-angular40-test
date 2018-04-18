import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BaseService } from "./base.service";
import { Global } from '../constants/global';

/**
 * Базовый сервис (CRUD)
 */
@Injectable()
export class GoodsService extends BaseService {
	url: string = Global.BASE_GOODS_ENDPOINT;


	/**
	 * .ctor
	 * @param _http 
	 */
	constructor(protected _http: Http) { super(_http); }
}