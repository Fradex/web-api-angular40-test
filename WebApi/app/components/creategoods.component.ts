import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
import { NgForm } from '@angular/forms';
import { GoodsService } from '../service/goods.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Global } from '../constants/global';

/**
 * Компонент создания товара
 */
@Component({
	selector: 'creategoods-comp',
	templateUrl: `./app/views/creategoods.component.html`
})

export class CreateGoodsComponent implements OnInit {
	msg: string;
	goodsForm: FormGroup;

	/**
	 * .ctor
	 * @param fb
	 * @param goodsService
	 */
	constructor(private fb: FormBuilder, private goodsService: GoodsService) { }

	ngOnInit(): void {
		this.goodsForm = this.fb.group({
			Id: [''],
			Name: ['', Validators.required],
			Description: [''],
			Price: ['']
		});
	}

	/**
	 * Отправить форму на сохранение 
	 * @param formData
	 */
	onSubmit(formData: any) {
		this.goodsService.post(formData._value).subscribe(
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
}