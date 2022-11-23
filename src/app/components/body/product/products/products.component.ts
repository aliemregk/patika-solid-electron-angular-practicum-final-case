import { CartService } from 'src/app/shared/services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { Product } from './../../../../shared/models/product.model';
import { ProductService } from './../../../../shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  private categoryId?: number;
  private subscription!: Subscription;
  protected products$ = new Observable<Product[]>();

  /**
   * @param  {ProductService} productService
   * @param  {ActivatedRoute} activatedRoute
   * @param  {CartService} cartService
   * Service injections.
   */
  constructor(
    private readonly productService: ProductService,
    private readonly activatedRoute: ActivatedRoute,
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
   * Use activated route service to get categoryid parameter from URL.
   * Assign the parameter to a variable and call getProducts() function.
   * Use a subscription for unsubscribe operation.
   */
  private getUrlParams(): void {
    this.subscription = this.activatedRoute.params.subscribe({
      next: (params) => {
        this.categoryId = params["categoryid"];
        this.getProducts();
      }
    });
  }

  /**
   * @returns void
   * Get products with using product service.
   * If categoryid parameter exists in URL, get products from that category otherwise, get all products.
   * Assign data to an observable for further use.
   */
  private getProducts(): void {
    if (this.categoryId) {
      this.products$ = this.productService.getAllProducts()
        .pipe(map(data => data.filter(product => product.categoryId == this.categoryId)));

    } else {
      this.products$ = this.productService.getAllProducts();
    }
  }

  /**
   * @param  {Product} product
   * @returns void
   * Add given product to cart.
   */
  protected addToCart(product: Product): void {
    this.cartService.addProductToCart(product);
  }

  /**
   * @returns void
   * Called once, before the instance is destroyed.
   * Unsubscription operation.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
