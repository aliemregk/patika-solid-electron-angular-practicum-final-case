import { NotFoundComponent } from './components/main-page/not-found/not-found.component';
import { CartComponent } from './components/body/cart/cart.component';
import { ProductDetailsComponent } from './components/body/product/product-details/product-details.component';
import { ProductsComponent } from './components/body/product/products/products.component';
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
      { path: "products", component: ProductsComponent },
      { path: "products/category/:categoryid", component: ProductsComponent },
      { path: "productdetails/:productid", component: ProductDetailsComponent },
      { path: "cart", component: CartComponent },
      { path: "cart/payment", component: PaymentComponent }
    ]
  },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
