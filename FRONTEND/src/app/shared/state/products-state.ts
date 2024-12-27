import { Injectable } from '@angular/core';
import {
  Action,
  Selector,
  State,
  StateContext,
  createSelector,
} from '@ngxs/store';
import { AddProduct, DelProduct } from '../action/app.action';
import { ProducttateModel } from './product-state-model';
import { Product } from '../model/product';
@Injectable()
@State<ProducttateModel>({
  name: 'products',
  defaults: {
    products: [],
  },
})
@Injectable()
export class ProductState {
  @Selector()
  static getNbProducts(state: ProducttateModel) {
    return state.products.length;
  }

  @Selector()
  static getListeProducts(state: ProducttateModel) {
    return state.products;
  }

  @Action(AddProduct)
  add(
    { getState, patchState }: StateContext<ProducttateModel>,
    { payload }: AddProduct
  ) {
    const state = getState();
    patchState({
      products: [...state.products, payload],
    });
  }

  @Action(DelProduct)
  del(
    { getState, patchState }: StateContext<ProducttateModel>,
    { payload }: DelProduct
  ) {
    const state = getState();
    patchState({
      products: state.products.filter(
        (x) => !(payload.id == x.id)
      ),
    });
  }
}
