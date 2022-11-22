import { ActivatedRoute } from '@angular/router';
import { filter, map, Observable, Subscription } from 'rxjs';
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

  constructor(
    private readonly productService: ProductService,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getUrlParams();
  }

  getUrlParams() {
    this.subscription = this.activatedRoute.params.subscribe({
      next: (params) => {
        this.categoryId = params["categoryid"];
        this.getProducts();
      }
    });
  }

  getProducts() {
    if (this.categoryId) {
      this.products$ = this.productService.getAllProducts()
        .pipe(map(data => data.filter(product => product.categoryId == this.categoryId)));

    } else {
      this.products$ = this.productService.getAllProducts();
    }
  }

  //Called once, before the instance is destroyed.
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
