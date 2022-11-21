import { CartComponent } from './components/body/cart/cart.component';
import { ProductDetailsComponent } from './components/body/product/product-details/product-details.component';
import { ProductsComponent } from './components/body/product/products/products.component';
import { DetailLayoutComponent } from './components/layouts/detail-layout/detail-layout.component';
import { SiteLayoutComponent } from './components/layouts/site-layout/site-layout.component';
import { RegisterComponent } from './components/main-page/register/register.component';
import { LoginComponent } from './components/main-page/login/login.component';
import { MainPageComponent } from './components/main-page/main-page/main-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './components/body/payment/payment.component';

const routes: Routes = [
  { path: "", pathMatch: 'full', component: MainPageComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "", component: SiteLayoutComponent,
    children: [
      { path: "products", component: ProductsComponent }
    ]
  },
  {
    path: "", component: DetailLayoutComponent, children: [
      { path: "productdetails", component: ProductDetailsComponent }, // path: "productdetails/:productid"
      { path: "cart", component: CartComponent },
      { path: "cart/payment", component: PaymentComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
