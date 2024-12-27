import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
    {path:'productList',component: ProductListComponent},
    {path:'cart',component: CartComponent},

    {
        path: '**',
        component: ProductListComponent,
      },
];
