import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
import { NgForm } from '@angular/forms';
import { UserService } from '../service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Global } from '../constants/global';

/**
 * Компонент для создание пользоваателей
 */
@Component({
	selector: 'createuser-comp',
	templateUrl: `./app/views/createuser.component.html`
})

export class CreateUserComponent implements OnInit {
	msg: string;
	userForm: FormGroup;

	/**
	 * .ctor
	 * @param fb
	 * @param goodService
	 */
	constructor(private fb: FormBuilder, private goodService: UserService) { }

	ngOnInit(): void {
		this.userForm = this.fb.group({
			Id: [''],
			Name: ['', Validators.required],
			City: [''],
			Email: [''],
			Age: ['']
		});
	}

	/**
	 * Отправить данные формы на сохранение 
	 * @param formData
	 */
	onSubmit(formData: any) {
		this.goodService.post(formData._value).subscribe(
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