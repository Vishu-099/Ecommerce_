import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice: number | undefined;
  cartData: any| undefined;
  orderMsg: string | undefined;
  constructor(private product: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.product.currentCart().subscribe((result:any) => {

      let price = 0;
      this.cartData = result;
      result.forEach((item:any) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)
        }
      })
      this.totalPrice = price + (price / 10) + 100 - (price / 10);

      console.warn(this.totalPrice);

    })

  }
  orderNow(data: { email: string, address: string, contact: string }) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
   

      // this.cartData?.forEach((item) => {
      //   setTimeout(() => {
      //     item.id && this.product.deleteCartItems(item.id);
      //   }, 700)
      // })

      // this.product.orderNow(orderData).subscribe((result) => {
      //   if (result) {
      //     this.orderMsg = "Order has been placed";
      //     setTimeout(() => {
      //       this.orderMsg = undefined;
      //       this.router.navigate(['/my-orders'])
      //     }, 4000);

      //   }

      // })
    //}

  }

}