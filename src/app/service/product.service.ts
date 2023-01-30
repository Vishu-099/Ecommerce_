import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  data: any;

  constructor(private http: HttpClient) { }
  cartItemsCount = new BehaviorSubject<any[]>([])
  //we use cartItemsCount in header ts for getting data 

  addProducts(data:any){
    return this.http.post('http://localhost:3000/products',data)
  }


  getProducts(){
    return this.http.get('http://localhost:3000/products')
  }

  deleteProduct(id:number){
   return this.http.delete(`http://localhost:3000/products/${id}`)
  }

  getProductById(id:number){
    return this.http.get(`http://localhost:3000/products/${id}`)
  }
  updateProductData(data:any){
    return this.http.put(`http://localhost:3000/products/${data.id}`,data)
  }
  productsView(data:any){
    return this.http.get<Number>(`http://localhost:3000/products?_limit=${data}`)
  }
  searchProducts(query:string){
    return this.http.get(`http://localhost:3000/products?q=${query}`)
  }
 
  addtoCart(x:any){
    return this.http.post('http://localhost:3000/cart',x)
  }

  getCartList(y:any){
    return this.http.get(`http://localhost:3000/cart?user_id=${y}`)
  }

  removetoCart(id:any){
    return this.http.delete(`http://localhost:3000/cart/${id}`)
  }

  currentCart(){
    let userStore = localStorage.getItem('login')
    let userData = userStore && JSON.parse(userStore)
   
    
    return this.http.get(`http://localhost:3000/cart?user_id=${userData[0].id}`)
  }

}
