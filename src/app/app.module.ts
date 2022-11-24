import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiteLayoutComponent } from './components/layouts/site-layout/site-layout.component';
import { MainPageComponent } from './components/main-page/main-page/main-page.component';
import { LogoComponent } from './components/main-page/logo/logo.component';
import { LoginComponent } from './components/main-page/login/login.component';
import { RegisterComponent } from './components/main-page/register/register.component';
import { FooterComponent } from './components/body/footer/footer.component';
import { HeaderComponent } from './components/body/nav-items/header/header.component';
import { NavbarComponent } from './components/body/nav-items/navbar/navbar.component';
import { SearchBarComponent } from './components/body/nav-items/search-bar/search-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './components/body/cart/cart.component';
import { PaymentComponent } from './components/body/payment/payment.component';
import { ProductDetailsComponent } from './components/body/product/product-details/product-details.component';
import { ProductsComponent } from './components/body/product/products/products.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { ProductDetailSliderComponent } from './components/body/product/product-detail-slider/product-detail-slider.component';
import { SpinnerComponent } from './components/body/spinner/spinner.component';
import { ShortenPipe } from './shared/pipes/shorten.pipe';
import { StoreModule } from '@ngrx/store';
import { cartItemReducer } from "./state-management/cart-state/cartItem.reducer";
import { NotFoundComponent } from './components/main-page/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    SiteLayoutComponent,
    MainPageComponent,
    LogoComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    SearchBarComponent,
    ProductsComponent,
    CartComponent,
    PaymentComponent,
    ProductDetailsComponent,
    ProductDetailSliderComponent,
    SpinnerComponent,
    ShortenPipe,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HotToastModule.forRoot({
      position: 'bottom-right',
      style: {
        border: '1px solid #FFF',
        color: 'rgb(0, 104, 189)'
      }
    }),
    StoreModule.forRoot({ cartItems: cartItemReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
