import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { DetailsComponent } from './details/details.component';
import { AuthComponent } from './auth/auth.component';
import { SignupComponent } from './signup/signup.component';
import { AccountComponent } from './account/account.component';

export const routes: Routes = [
    { 
        path: 'main', 
        component: ProductComponent,
        title: 'Главная' 
      },
      { 
        path: 'product-details/:productId', 
        component: DetailsComponent,
        title: 'Товар' 
      },
      {
        path: 'auth',
        component: AuthComponent,
        title: 'Вход'
      },
      {
        path: 'signup',
        component: SignupComponent,
        title: 'Регистрация'
      },
      {
        path: 'profile',
        component:AccountComponent,
        title:'Профиль'
      },
      { 
        path: '**', 
        redirectTo: '/main' // Редирект для несуществующих путей
      }
];
