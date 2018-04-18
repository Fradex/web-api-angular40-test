import { Component, OnInit, ViewChild } from '@angular/core';
import { GoodsService } from '../service/goods.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IGoods } from '../models/goods';
import { DbOperation } from '../constants/enums';
import { Observable } from 'rxjs/Rx';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Global } from '../constants/global';

/**
 * Компонент товары пользователйй
 */
@Component({
	selector: "goods-comp",
	templateUrl: `./app/views/goods.component.html`
})

export class GoodsComponent implements OnInit {
	@ViewChild('modal') modal: ModalComponent;
	goods: IGoods[];
	product: IGoods;
	public isFormShow: boolean = false;
	goodsForm: FormGroup;
	indLoading: boolean = false;
	msg: string;
	dbops: DbOperation;
	modalTitle: string;
	modalBtnTitle: string;

	/**
	 * .ctor
	 * @param fb
	 * @param goodsService
	 */
	constructor(private fb: FormBuilder, private goodsService: GoodsService) { }

	/**
	 * Показать форму добавления
	 */
	showForm() {
		this.isFormShow = true;
	}

	ngOnInit(): void {
		this.goodsForm = this.fb.group({
			Id: [''],
			Name: ['', Validators.required],
			Description: [''],
			Price: ['']
		});

		this.loadGoods();
	}

	/**
	 * Загрузить товары
	 */
	loadGoods(): void {
		this.indLoading = true;
		this.goodsService.get()
			.subscribe(goods => { this.goods = goods; this.indLoading = false; },
			error => this.msg = <any>error);
	}

	/**
	 * Обновление формы
	 * @param refresh
	 */
	onRefresh(refresh: boolean): void {
		if (refresh) {
			this.loadGoods();
			this.msg = "Данные успешно добавлены!";
			this.isFormShow = false;
		}
	};

	/**
	 * Редактировать товар
	 * @param id
	 */
	editGoods(id: number) {
		this.dbops = DbOperation.Update;
		this.setControlsState(true);
		this.modalTitle = "Редактировать товар";
		this.modalBtnTitle = "Редактировать";
		this.product = this.goods.filter(x => x.Id == id)[0];
		this.goodsForm.setValue(this.product);
		this.modal.open();
	}

	/**
	 * Удалить товар
	 * @param id
	 */
	deleteGoods(id: number) {
		this.dbops = DbOperation.Delete;
		this.setControlsState(false);
		this.modalTitle = "Вы действительно хотите удалить?";
		this.modalBtnTitle = "Удалить";
		this.product = this.goods.filter(x => x.Id == id)[0];
		this.goodsForm.setValue(this.product);
		this.modal.open();
	}

	/**
	 * Устапновить сосотояние формы (lock полей)
	 * @param isEnable
	 */
	setControlsState(isEnable: boolean) {
		isEnable
			? this.goodsForm.enable()
			: this.goodsForm.disable();
	}

	/**
	 * Отправить запрос с формы
	 * @param formData данные формы
	 */
	onSubmit(formData: any) {
		this.msg = "";

		switch (this.dbops) {
			case DbOperation.Update:
				this.goodsService.put(formData._value.Id, formData._value).subscribe(
					data => {
						if (data == 1) //Success
						{
							this.msg = "Данные успешно обновлены.";
							this.loadGoods();
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
				this.goodsService.delete(formData._value.Id).subscribe(
					data => {
						if (data == 1) //Success
						{
							this.msg = "Данные успешно удалены.";
							this.loadGoods();
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