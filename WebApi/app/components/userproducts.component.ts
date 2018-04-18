import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../service/user.service';
import { GoodsService } from '../service/goods.service';
import { UserProductsService } from '../service/userproducts.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUserProduct } from '../models/userproduct';
import { IUser } from '../models/user';
import { IGoods } from '../models/goods';
import { DbOperation } from '../constants/enums';
import { Observable } from 'rxjs/Rx';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Global } from '../constants/global';

/**
 * Контрол пользовательских продуктов
 */
@Component({
	selector: "userproducts-comp",
	templateUrl: `./app/views/userproducts.component.html`
})

export class UserProductsComponent implements OnInit {
	@ViewChild('modal') modal: ModalComponent;
	userProducts: IUserProduct[];
	userProduct: IUserProduct;
	isFormShow: boolean = false;
	userProductForm: FormGroup;
	indLoading: boolean = false;
	msg: string;
	dbops: DbOperation;
	modalTitle: string;
	modalBtnTitle: string;
	users: IUser[];
	products: IGoods[];

	/**
	 * .ctor
	 * @param fb formBuider
	 * @param service сервис
	 */
	constructor(private fb: FormBuilder, private service: UserProductsService, private userService: UserService, private goodsService: GoodsService) { }

	/**
	 * Показать форму
	 */
	showForm() {
		this.isFormShow = true;
	}

	/**
	 * обработчик инициализации формы
	 */
	ngOnInit(): void {
		this.loadUsers();
		this.loadProducts();

		this.userProductForm = this.fb.group({
			Id: [''],
			UserId: ['', Validators.required],
			GoodId: ['', Validators.required]
		});

		this.loadUserProducts();
	}

	/**
	 * Загрузить пользовательские продукты
	 */
	loadUserProducts(): void {
		this.indLoading = true;
		this.service.get()
			.subscribe(userProducts => { this.userProducts = userProducts; this.indLoading = false; },
			error => this.msg = <any>error);
	}

	/**
	 * Загрузить пользователей
	 */
	loadUsers(): void {
		this.indLoading = true;
		this.userService.get()
			.subscribe(users => { this.users = users; this.indLoading = false; },
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

	/**
	 * Обновление формы
	 * @param refresh флаг необходимости обновления грида
	 */
	onRefresh(refresh: boolean): void {
		if (refresh) {
			this.loadUserProducts();
			this.msg = "Данные успешно добавлены!";
			this.isFormShow = false;
		}
	};

	/**
	 * редактировать пользовательский товар
	 * @param id идентификатор
	 */
	editUserProduct(id: number) {
		this.dbops = DbOperation.Update;
		this.setControlsState(true);
		this.modalTitle = "Редактировать";
		this.modalBtnTitle = "Редактировать";
		this.userProduct = this.userProducts.filter(x => x.Id == id)[0];
		this.userProductForm.setValue({
			Id: this.userProduct.Id,
			UserId: this.userProduct.UserId,
			GoodId: this.userProduct.GoodId
		});
		this.modal.open();
	}

	/**
	 * Удалить пользовательский продукт
	 * @param id идентификатор
	 */
	deleteUserProduct(id: number) {
		this.dbops = DbOperation.Delete;
		this.setControlsState(false);
		this.modalTitle = "Вы действительно хотите удалить?";
		this.modalBtnTitle = "Удалить";
		this.userProduct = this.userProducts.filter(x => x.Id == id)[0];
		this.userProductForm.setValue({
			Id: this.userProduct.Id,
			UserId: this.userProduct.UserId,
			GoodId: this.userProduct.GoodId
		});
		this.modal.open();
	}

	/**
	 * Устапновить сосотояние формы (lock полей)
	 * @param isEnable
	 */
	setControlsState(isEnable: boolean) {
		isEnable
			? this.userProductForm.enable()
			: this.userProductForm.disable();
	}

	/**
	 * Отправить запрос с формы
	 * @param formData данные формы
	 */
	onSubmit(formData: any) {
		this.msg = "";

		switch (this.dbops) {
			case DbOperation.Update:
				this.service.put(formData._value.Id, formData._value).subscribe(
					data => {
						if (data == 1) //Success
						{
							this.msg = "Данные успешно обновлены.";
							this.loadUserProducts();
						}
						else {
							this.msg = "Произошла ошибка!";
						}

						this.modal.dismiss();
					},
					error => {
						this.msg = error;
					}
				);
				break;
			case DbOperation.Delete:
				this.service.delete(formData._value.Id).subscribe(
					data => {
						if (data == 1) //Success
						{
							this.msg = "Данные успешно удалены.";
							this.loadUserProducts();
						}
						else {
							this.msg = "Произошла ошибка!";
						}

						this.modal.dismiss();
					},
					error => {
						this.msg = error;
					}
				);
				break;

		}
	}
}