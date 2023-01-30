import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LOADIPHLPAPI } from 'dns';
import { threadId } from 'worker_threads';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  id: any
  productData: undefined | any;
  constructor(private route: ActivatedRoute, private product: ProductService) { }
  productQuantity: number = 1
  removeItem = false
  cartData : any
  ngOnInit(): void {

    this.route.params.subscribe((parms: any) => {
      if (parms.id) {
        this.id = this.route.snapshot.paramMap.get('id')
        this.product && this.product.getProductById(this.id).subscribe((result) => {
          this.productData = result
        })

        let local_data = localStorage.getItem('localdata')
        let items = local_data && JSON.parse(local_data)
        let items_id = items && items.filter((i:any)=>i.id.toString()===this.id)
        
        
        if(local_data && items_id.length>0){
          this.removeItem = true
        }else{
          this.removeItem = false
        }
        

       
        
        
      }

      let userdata = localStorage.getItem('login')
      if(userdata){
        let user_id = userdata && JSON.parse(userdata)[0].id 
        this.product.getCartList(user_id).subscribe((result:any)=>{
          if(result && result.length>0){
              this.product.cartItemsCount.next(result)
              
          }
        })
        this.product.cartItemsCount.subscribe((result)=>{
          let items = result.filter((i:any)=>this.id.toString()===i.productId.toString())
          if(items.length>0){
            this.cartData = items[0]
            this.removeItem = true
          }else{
            this.removeItem = false
          }
        })
      }
      

    })



  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1
    }
    if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1
    }
  }

  addtoCart(){
    let cartData =[]   
    this.productData.quantity = this.productQuantity
    let localData = localStorage.getItem('localdata')
    let userdata = localStorage.getItem('login')
    if(!userdata){
      if(!localData){
     
        localStorage.setItem('localdata',JSON.stringify([this.productData]))
        this.removeItem = true
  
      }
      else{
        cartData = JSON.parse(localData)
        cartData.push(this.productData)     
        localStorage.setItem('localdata',JSON.stringify(cartData))
        this.removeItem = true
      }
  
      this.product.cartItemsCount.next(cartData)
    }
    else{
      let user_id = userdata && JSON.parse(userdata)[0].id
      
      
      let cart_data:any= {
        ...this.productData,
        user_id,
        productId:this.productData.id
      }

     delete cart_data.id
      
    this.product.addtoCart(cart_data).subscribe((res)=>{
      if(res){
        this.product.getCartList(user_id).subscribe((result:any)=>{
          if(result && result.length>0){
              this.product.cartItemsCount.next(result)
              this.removeItem = true
          }
        })
      }
    })
      
      
      
      
    }
    

    
    
    
    
  }

  removeCart(id:number){

   let itms = localStorage.getItem('localdata')
   let itms_data =itms && JSON.parse(itms)
   if(itms_data){
    let items_data = itms_data.filter((x:any)=>x.id!=id)
    localStorage.setItem('localdata',JSON.stringify(items_data))
    this.product.cartItemsCount.next(items_data)
    this.removeItem = false
   }else{
     let user = localStorage.getItem('login')
     let user_id = user && JSON.parse(user)[0].id
     this.cartData && this.product.removetoCart(this.cartData.id).subscribe((result)=>{
       if(result){
         this.product.getCartList(user_id).subscribe((res:any)=>{
           if(res){
            if(res && res.length>0){
              this.product.cartItemsCount.next(res)
            }
           }
         })
       }
     })
     
   }
  
    
  }



}
