import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { FormComponent } from './form/form.component';
import { UpdateUserFormComponent } from './update-user-form/update-user-form.component';

export const routes: Routes = [
    {path:'productList',component: ProductListComponent},
    {path:'cart',component: CartComponent},
    {path:'connexion',component: ConnexionComponent},
    {path:'add',component: FormComponent},
    {path:'update',component: UpdateUserFormComponent},

    {
        path: '**',
        component: ConnexionComponent,
      },
];
