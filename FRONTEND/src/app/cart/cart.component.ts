import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../shared/model/product';
import { Store } from '@ngxs/store';
import { ProductState } from '../shared/state/products-state';
import { DelProduct } from '../shared/action/app.action';
import { ListBrowserComponent } from '../list-browser/list-browser.component';
import { CartProduct } from '../shared/model/cart-product';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  productList: Observable<CartProduct[]>;
  constructor( private store:Store) {
    this.productList = new Observable<CartProduct[]>();
  }
  ngOnInit() {
     this.productList = this.store.select(ProductState.getListeProducts);
  }
  deleteFromCart(product:CartProduct){
      this.store.dispatch(new DelProduct(product)) 
 
  }

}
