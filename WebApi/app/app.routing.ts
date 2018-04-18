import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { GoodsComponent } from './components/goods.component';
import { AboutComponent } from './components/about.component';
import { UserComponent } from './components/user.component';
import { UserProductsComponent } from './components/userproducts.component';

const appRoutes: Routes = [    
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', component: UserProductsComponent },
	{ path: 'goods', component: GoodsComponent },
	{ path: 'users', component: UserComponent },
	{ path: 'about', component: AboutComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);