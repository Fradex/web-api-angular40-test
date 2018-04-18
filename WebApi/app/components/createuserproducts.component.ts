import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
import { NgForm } from '@angular/forms';
import { UserService } from '../service/user.service';
import { GoodsService } from '../service/goods.service';
import { UserProductsService } from '../service/userproducts.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Global } from '../constants/global';
import { IUser } from '../models/user';
import { IGoods } from '../models/goods';

/**
 * Компонент для создания пользовательских продуктов
 */
@Component({
	selector: 'createuserproducts-comp',
	templateUrl: `./app/views/createuserproducts.component.html`
})

export class CreateUserProductsComponent implements OnInit {
	msg: string;
	userProductsForm: FormGroup;
	users: IUser[];
	products: IGoods[];

	/**
	 * .ctor
	 * @param fb
	 * @param service
	 */
	constructor(private fb: FormBuilder, private service: UserProductsService, private userService: UserService, private goodsService: GoodsService) { }

	ngOnInit(): void {
		this.userProductsForm = this.fb.group({
			Id: [''],
			UserId: ['', Validators.required],
			GoodId: ['', Validators.required]
		});

		this.loadProducts();
		this.loadUsers();
	}

	/**
	 * Отправить данные формы на сохранение
	 * @param formData
	 */
	onSubmit(formData: any) {
		this.service.post(formData._value).subscribe(
			data => {
				if (data == 1) //Success
				{
					this.msg = "Данные успешно добавлены.";
					this.change(true);

				}
				else {
					this.msg = "Произошла ошибка!";
				}
			},
			error => {
				this.msg = error;
			}
		);
	}

	@Output() onRefresh = new EventEmitter<boolean>();
	change(refresh: boolean) {
		this.onRefresh.emit(refresh);
	}

	/**
	 * Загрузить пользователей
	 */
	loadUsers(): void {
		this.userService.get()
			.subscribe(users => { this.users = users; },
			error => this.msg = <any>error);
	}

	/**
	 * Загрузить продукты
	 */
	loadProducts(): void {
		this.goodsService.get()
			.subscribe(products => { this.products = products; },
			error => this.msg = <any>error);
	}
}