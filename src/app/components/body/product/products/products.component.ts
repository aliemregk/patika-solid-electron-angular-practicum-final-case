import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { Product } from './../../../../shared/models/product.model';
import { ProductService } from './../../../../shared/services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  public products!: Product[];
  private subscription!: Subscription;

  constructor(
    private readonly productService: ProductService,
    private readonly toastr: HotToastService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.subscription = this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.log("err");
        this.toastr.error("Can not get data!");
      }
    });
  }
  
  //Called once, before the instance is destroyed.
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
