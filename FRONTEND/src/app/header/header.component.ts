import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ProductState } from '../shared/state/products-state';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  nb$: Observable<number>;
  constructor(private store: Store) {
    this.nb$ = this.store.select(ProductState.getNbProducts);
  }}
