import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { sign_up } from '../data-type';
import { SellerAuthService } from '../service/seller-auth.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  errorText: any;

  constructor(private seller:SellerAuthService) { }
  active = true

  ngOnInit(): void {
    this.seller.reload()
  }


  signUp(data:sign_up){
       if(data.name ===''||data.password==='' ||data.email==='' || data.name===undefined|| data.password===undefined||data.email===undefined){
        return alert("Please fill field correctly")
        
       }else{
        this.seller.userSignUp(data)

       }
      
  }

  login(data:any){
   
    this.seller.userLogin(data)
    this.seller.eventEmitter.subscribe((result)=>{
      if(result){
        this.errorText = "Sorry wrong credentials"
        
      }
      
    })

  }

  showLogin(){
    this.active = false

  }

  showSignUp(){
    this.active = true

  }


}
