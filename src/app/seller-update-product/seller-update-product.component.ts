import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { ProductService } from '../service/product.service';
@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  id:any
  getProducts: any;
  successText : undefined |string
  constructor(private router:Router, private product:ProductService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.product && this.product.getProductById(this.id).subscribe((res:any)=>{
            
     this.getProducts = res      

    })

  }

  update(data:any){
    if(this.getProducts){
      data.id = this.getProducts.id
    }
    this.product.updateProductData(data).subscribe((result)=>{
      if(result){
        this.successText = "Product has been Updated."
        
      }
    })

    setTimeout(() => {
      this.successText = undefined
      this.router.navigate(['seller-home'])
    }, 2000);
  }
}
