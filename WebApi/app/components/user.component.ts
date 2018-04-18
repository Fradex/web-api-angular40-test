import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../models/user';
import { DbOperation } from '../constants/enums';
import { Observable } from 'rxjs/Rx';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Global } from '../constants/global';

/**
 * Компонент для сущности пользователь
 */
@Component({
	selector: "user-comp",
	templateUrl: `./app/views/user.component.html`
})

export class UserComponent implements OnInit {
	@ViewChild('modal') modal: ModalComponent;
	users: IUser[];
	user: IUser;
	isFormShow: boolean = false;
	userForm: FormGroup;
	indLoading: boolean = false;
	msg: string;
	dbops: DbOperation;
	modalTitle: string;
	modalBtnTitle: string;

	/**
	 * .ctor
	 * @param fb
	 * @param userService
	 */
	constructor(private fb: FormBuilder, private userService: UserService) { }

	/**
	 * показать форму добавления
	 */
	showForm() {
		this.isFormShow = true;
	}

	ngOnInit(): void {
		this.userForm = this.fb.group({
			Id: [''],
			Name: ['', Validators.required],
			City: [''],
			Email: [''],
			Age: ['']
		});

		this.loadusers();
	}

	/**
	 * Загрузить пользователей
	 */
	loadusers(): void {
		this.indLoading = true;
		this.userService.get()
			.subscribe(users => { this.users = users; this.indLoading = false; },
			error => this.msg = <any>error);
	}

	/**
	 * обновить грид
	 * @param refresh
	 */
	onRefresh(refresh: boolean): void {
		if (refresh) {
			this.loadusers();
			this.msg = "Данные успешно добавлены!";
			this.isFormShow = false;
		}
	};

	/**
	 * Редактировать пользователя
	 * @param id
	 */
	editUser(id: number) {
		this.dbops = DbOperation.Update;
		this.setControlsState(true);
		this.modalTitle = "Редактировать товар";
		this.modalBtnTitle = "Редактировать";
		this.user = this.users.filter(x => x.Id == id)[0];
		this.userForm.setValue(this.user);
		this.modal.open();
	}

	/**
	 * Удалить пользователя
	 * @param id
	 */
	deleteUser(id: number) {
		this.dbops = DbOperation.Delete;
		this.setControlsState(false);
		this.modalTitle = "Вы действительно хотите удалить?";
		this.modalBtnTitle = "Удалить";
		this.user = this.users.filter(x => x.Id == id)[0];
		this.userForm.setValue(this.user);
		this.modal.open();
	}

	/**
	 * Устапновить сосотояние формы (lock полей)
	 * @param isEnable
	 */
	setControlsState(isEnable: boolean) {
		isEnable
			? this.userForm.enable()
			: this.userForm.disable();
	}

	/**
	 * Отправить запрос с формы
	 * @param formData данные формы
	 */
	onSubmit(formData: any) {
		this.msg = "";

		switch (this.dbops) {
			case DbOperation.Update:
				this.userService.put(formData._value.Id, formData._value).subscribe(
					data => {
						if (data == 1) //Success
						{
							this.msg = "Данные успешно обновлены.";
							this.loadusers();
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
				this.userService.delete(formData._value.Id).subscribe(
					data => {
						if (data == 1) //Success
						{
							this.msg = "Данные успешно удалены.";
							this.loadusers();
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