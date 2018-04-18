import { Component } from "@angular/core"

/**
 * Компонент для навигации
 */

@Component({
	selector: "user-app",
	template: ` <nav class='navbar navbar-inverse'>
                       <div class='container-fluid'>
                         <ul class='nav navbar-nav'>
                           <li><a [routerLink]="['home']"> Главная </a></li>
	                       <li><a [routerLink]="['goods']"> Товары </a></li>
	                       <li><a [routerLink]="['users']"> Пользователи </a></li>
	                       <li><a [routerLink]="['about']"> О приложении </a></li>
                      </ul>
                      </div>
                 </nav>  
                   
              <div class='container'>
                <router-outlet></router-outlet>
              </div>`
})

export class AppComponent {
 
}