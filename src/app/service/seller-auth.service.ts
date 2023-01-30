import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { sign_up ,login} from '../data-type';
import { Router } from '@angular/router';
import { stringify } from '@angular/compiler/src/util';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerAuthService {
  isSellerRight = new BehaviorSubject<boolean>(false)
  eventEmitter = new EventEmitter<boolean>(false)

  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(data: sign_up) {

    this.http.post('http://localhost:3000/seller', data,{observe:'response'}).subscribe((res) => {
      localStorage.setItem('seller', JSON.stringify(res.body))

      this.isSellerRight.next(true)
      this.router.navigate(['seller-home'])


    })
    return false

  }

  reload(){
  if(localStorage.getItem('seller')){
      this.isSellerRight.next(true)
      this.router.navigate(['seller-home'])
    }
  }


  userLogin(data:login){
    
    this.http.get(`http://localhost:3000/seller?email=${data.email}&&password=${data.password}`,
    {observe:'response'}).subscribe((result:any)=>{
      if(result && result.body && result.body.length){
      localStorage.setItem('seller', JSON.stringify(result.body))
      this.isSellerRight.next(true)
      this.router.navigate(['seller-home'])
      }else{
        this.eventEmitter.emit(true)
        
      }
      
    })
  }
}
