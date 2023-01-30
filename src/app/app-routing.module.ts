import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SellerAuthGuard } from './gaurds/seller-auth.guard';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchComponent } from './search/search.component';
import { SellerAddProductsComponent } from './seller-add-products/seller-add-products.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { UserAuthComponent } from './user-auth/user-auth.component';

const routes: Routes = [

  {
    path:'',
    component:HomeComponent
  },
  {
    path:'seller-auth',
    component:SellerAuthComponent
  },
  {
    path:'seller-home',
    component:SellerHomeComponent,
    canActivate : [SellerAuthGuard]
  },
  {
    path:'seller-add-product',
    component : SellerAddProductsComponent,
    canActivate :[SellerAuthGuard]
  },
  {
    path:'seller-update-product/:id',
    component : SellerUpdateProductComponent,
    canActivate :[SellerAuthGuard]
  },
  {
    path:'search/:query',
    component : SearchComponent,
  },
  {
    path:'details/:id',
    component : ProductDetailsComponent,
  },
  {
    path:'user-auth',
    component : UserAuthComponent,
  },
  {
    path:'cart-page',
    component : CartPageComponent,
  },
  {
    path:'checkout',
    component : CheckoutComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
