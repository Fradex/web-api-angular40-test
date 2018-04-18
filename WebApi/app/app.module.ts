import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataTableModule } from "angular2-datatable";

import { routing } from './app.routing';
import { HomeComponent } from './components/home.component';
import { CreateGoodsComponent } from './components/creategoods.component';
import { CreateUserComponent } from './components/createuser.component';
import { CreateUserProductsComponent } from './components/createuserproducts.component';
import { AboutComponent } from './components/about.component';
import { GoodsComponent } from './components/goods.component';
import { UserComponent } from './components/user.component';
import { UserProductsComponent } from './components/userproducts.component';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { BaseService } from './service/base.service';
import { UserService } from './service/user.service';
import { GoodsService } from './service/goods.service';
import { UserProductsService } from './service/userproducts.service';

import Appcomponent = require("./components/app.component");
import AppComponent = Appcomponent.AppComponent;

@NgModule
({
	imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpModule, Ng2Bs3ModalModule, routing, DataTableModule ],
	declarations: [AppComponent, CreateGoodsComponent, CreateUserComponent, HomeComponent, AboutComponent, GoodsComponent, UserComponent, CreateUserProductsComponent, UserProductsComponent],
	providers: [{ provide: APP_BASE_HREF, useValue: '/' }, BaseService, UserService, GoodsService, UserProductsService],
	bootstrap: [AppComponent]
})

export class AppModule { }