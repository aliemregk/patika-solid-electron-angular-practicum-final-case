import { HotToastService } from '@ngneat/hot-toast';
import { Product } from './../../../../shared/models/product.model';
import { ProductService } from './../../../../shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/shared/services/cart.service';
import { dataError_message } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  protected product!: Product;
  protected dataLoaded: boolean = false;
  private subscriptions: Subscription[] = [];

  /**
   * @param  {ProductService} productService
   * @param  {ActivatedRoute} activatedRoute
   * @param  {HotToastService} toastr
   * @param  {CartService} cartService
   * Service injections.
   */
  constructor(
    private readonly productService: ProductService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly toastr: HotToastService,
    private readonly cartService: CartService
  ) { }

  /**
   * @returns void
   * Called once, when the instance is created.
   * Call getUrlParams() function.
   */
  ngOnInit(): void {
    this.getUrlParams();
  }

  /**
   * @returns void
   * Use activated route service to get productid parameter from URL.
   * And with the parameter call getProducts() function.
   * Push subscription to subscriptions array for unsubscribe operation.
   */
  private getUrlParams(): void {
    let subscription = this.activatedRoute.params.subscribe({
      next: (params) => {
        this.getProductDetails(params["productid"]);
      },
      error: () => {
        this.toastr.error(dataError_message);
      }
    });
    this.subscriptions.push(subscription);
  }

  /**
   * @param  {number} productId
   * @returns void
   * Get product details from product service. Assign data to a local variable.
   * Set dataLoaded as true if data fetched successfully.
   * Push subscription to subscriptions array for unsubscribe operation.
   */
  private getProductDetails(productId: number): void {
    let subscription = this.productService.getProductById(productId).subscribe({
      next: (data) => {
        this.dataLoaded = true;
        this.product = data;
      },
      error: () => {
        this.toastr.error(dataError_message);
      }
    });
    this.subscriptions.push(subscription);
  }

  /**
   * @param  {Product} product
   * @returns void
   * Add given product to cart using cart service.
   */
  protected addToCart(product: Product): void {
    this.cartService.addProductToCart(product);
  }

  /**
   * @returns void
   * Called once, before the instance is destroyed.
   * Unsubscription operations.
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
