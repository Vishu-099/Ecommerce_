import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = '';
  userName: string = '';
  loginUserName: string = ''
  searchElements: any
  cartItems = 0

  constructor(private router: Router, private product: ProductService) { }

  ngOnInit(): void {

    this.router.events.subscribe((val: any) => {
      if (val.url) {
        let item = localStorage.getItem('seller')
        if (item && val.url.includes('seller')) {
          this.menuType = 'seller'
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller')
            let sellerData = sellerStore && JSON.parse(sellerStore)[0]
            this.sellerName = sellerData.name
          }
        }
        if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user')
          let userData = userStore && JSON.parse(userStore)
          this.userName = userData.name
          this.menuType = 'user'

        }
        if (localStorage.getItem('login')) {
          let loginStore = localStorage.getItem('login')
          let loginData = loginStore && JSON.parse(loginStore)
          this.loginUserName = loginData[0].name
          this.menuType = 'login'

        }
        // if (!(localStorage.getItem('seller') && localStorage.getItem('user'))) {
        //   this.menuType = 'default'
        // }
      }


    })

    let cartData = localStorage.getItem('localdata')



    this.cartItems = cartData && JSON.parse(cartData).length


    this.product && this.product.cartItemsCount.subscribe((res) => {

      if (res && res.length > 0) {


        this.cartItems = res.length
      }


    })



    // console.log(this.product.cartItemsCount.alue);
    // this.cartItems = this.product.cartItemsCount.value.length


  }

  logout() {
    localStorage.removeItem('seller');
    this.router.navigate(['/'])
  }


  userLogout() {
    let keysToRemove = ["user", "login"];
    keysToRemove.forEach(k =>
      localStorage.removeItem(k))

    this.menuType = 'default'
    this.router.navigate(['user-auth'])
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProducts(element.value).subscribe((result: any) => {
        if (result.length > 5) {
          result.length = 5

        }
        this.searchElements = result

      })
    }


  }

  hideElements() {
    this.searchElements = undefined
  }


  submitSearch(data: string) {
    this.router.navigate([`search/${data}`])

  }

  redirectProdDetails(id: number) {
    this.router.navigate(['details/' + id])
  }


}
