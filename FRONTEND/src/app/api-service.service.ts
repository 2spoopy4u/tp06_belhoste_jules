import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from './shared/model/user';
import { Product } from './shared/model/product';
import { environment } from '../environments/environment';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}
   private produitSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
   public allProducts: Observable<Product[]> = this.produitSubject.asObservable();
   
  private refFilter:string='';
  private libelleFilter:string='';
  private priceFilter:string='';
  public loginClient(login: string, password: string): Observable<User> {
    let data: String;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    data = 'login=' + login + '&password=' + password;
    return this.http.post<User>(
      environment.backendLoginClient,
      data,
      httpOptions
    );
  }

  public getCalague(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.backendCatalogue);
  }

  public setFilter(name:string,value:string){
    this[name as 'refFilter'|'libelleFilter'|'priceFilter' ] = value;
  }
  public filter(){
    return this.getCalague().pipe(
      map((products: Product[]) =>{
      return products.filter(product =>{
        let res = true;
        res=res && (product.ref.indexOf(this.refFilter) != -1);
        res=res && product.libelle.indexOf(this.libelleFilter) > -1;
        res=res && product.prix.toString().indexOf(this.priceFilter) > -1;
  
        return res;
    });
    
    }), 
    map((filteredProduits: Product[]) => {
      this.produitSubject.next(filteredProduits);
      return filteredProduits;
    })
    )
  }
}