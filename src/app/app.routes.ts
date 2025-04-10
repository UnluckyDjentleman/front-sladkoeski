import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { DetailsComponent } from './details/details.component';

export const routes: Routes = [
    { 
        path: '', 
        component: ProductComponent,
        title: 'Главная' 
      },
      { 
        path: 'product-details/:productId', 
        component: DetailsComponent,
        title: 'Товар' 
      },
      { 
        path: '**', 
        redirectTo: '' // Редирект для несуществующих путей
      }
];
