import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { faTrash,faEdit} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  productList: any;
  deleteText: undefined|string;
  faTrash = faTrash
  faEdit = faEdit
  constructor(private products : ProductService) { }

  ngOnInit(): void {
    this.list()
   
  }


  deleteProduct(id:number){
    this.products.deleteProduct(id).subscribe((result)=>{
     
      if(result){
        this.deleteText = "Product deleted Successfully"
        this.list()
      }
    })

    setTimeout(() => {
      this.deleteText = undefined
    }, 2000);
  }


  list(){
    this.products.getProducts().subscribe((res)=>{
      this.productList = res
    })
  }
}
