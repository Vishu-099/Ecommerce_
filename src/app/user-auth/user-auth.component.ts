import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { login, sign_up } from '../data-type';
import { ProductService } from '../service/product.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showLogin = false
  authError:string=''
  constructor(private user: UserService, private router: Router,private product:ProductService) { }
  ngOnInit(): void {

    let signUpcheck = localStorage.getItem('user')
    let loginCheck = localStorage.getItem('login')

    if (signUpcheck || loginCheck) {
      this.router.navigate(['/'])
    }

  }

  signUp(data: sign_up) {
    this.user.userSignup(data).subscribe((result) => {
      if (result) {
        localStorage.setItem('user', JSON.stringify(result))
        this.router.navigate(['/'])
      }

    })
  }

  openSignUp() {
    this.showLogin = false
  }

  openLogin() {
    this.showLogin = true
  }

  login(data: login) {
    this.user && this.user.userLogin(data).subscribe((result) => {
      if (result && result.length && result.length > 0) {

        localStorage.setItem('login', JSON.stringify(result))
        this.localdatatoDB()

        this.router.navigate(['/'])
      }
      else {
        this.authError = "Please enter correct details"
        

      }

      setTimeout(() => {
        this.authError = ''
      }, 2000);
    })

  }


  localdatatoDB(){
    let lc_data = localStorage.getItem('localdata')
    let lc_dt= lc_data && JSON.parse(lc_data)
    let login_data = localStorage.getItem('login')
    let lg_data_id = login_data && JSON.parse(login_data)[0].id
    
    if(lc_data){
    
    lc_dt.forEach((element:any,index:any) => {
      let cartData = {
        ...element,
        user_id:lg_data_id,
        productId:element.id
      }
      delete cartData.id
    setTimeout(() => {
      this.product.addtoCart(cartData).subscribe((x)=>{
        if(x){
          console.log("Items stored in db");
          
        }
        
      })
     if(lc_dt.length === index+1){
      localStorage.removeItem('localdata')
       
     }
      
    }, 1000);
   
      
      
    });
   
    
    }

    setTimeout(() => {
      this.product.getCartList(lg_data_id).subscribe((result:any)=>{
        if(result && result.length>0){
          this.product.cartItemsCount.next(result)
        }
        
      })
    }, 2000);
 
    
    
  }
}
