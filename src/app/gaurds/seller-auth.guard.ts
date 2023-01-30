import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SellerAuthComponent } from '../seller-auth/seller-auth.component';
import { SellerAuthService } from '../service/seller-auth.service';

@Injectable({
  providedIn: 'root'
})
export class SellerAuthGuard implements CanActivate {
  constructor(private sellerService :SellerAuthService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        
      if(localStorage.getItem('seller')){
        return true
      }

      return this.sellerService.isSellerRight
    
  }
  
}
