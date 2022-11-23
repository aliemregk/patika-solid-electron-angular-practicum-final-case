import { HotToastService } from '@ngneat/hot-toast';
import { Product } from './../../../../shared/models/product.model';
import { ProductService } from './../../../../shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  protected product!: Product;
  protected dataLoaded: boolean = false;
  private subscription!: Subscription;

  constructor(
    private readonly productService: ProductService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly toastr: HotToastService,
    private readonly cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getUrlParams();
  }

  getUrlParams() {
    this.subscription = this.activatedRoute.params.subscribe({
      next: (params) => {
        this.getProductDetails(params["productid"]);
      },
      error: () => {
        this.toastr.error("Can not get data!");
      }
    });
  }

  getProductDetails(productId: number) {
    this.productService.getProductById(productId).subscribe({
      next: (data) => {
        this.dataLoaded = true;
        this.product = data;
      },
      error: () => {
        this.toastr.error("Can not get data!");
      }
    });
  }

  addToCart(product: Product) {
    this.cartService.addProductToCart(product);
  }

  //Called once, before the instance is destroyed.
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
