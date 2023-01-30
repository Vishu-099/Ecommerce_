import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-seller-add-products',
  templateUrl: './seller-add-products.component.html',
  styleUrls: ['./seller-add-products.component.css']
})
export class SellerAddProductsComponent implements OnInit {
  constructor(private productService: ProductService,private router:Router) { }
  successText:string|undefined

  ngOnInit(): void {

  }


  addProd(data:object){
    this.productService.addProducts(data).subscribe((res)=>{
      if(res){
        this.successText = "Product has been added Successfully"
      }
      setTimeout(() => {
        this.successText = undefined
        this.router.navigate(['seller-home'])
      }, 3000);

      
    })
    
}
}
