import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-detail-slider',
  templateUrl: './product-detail-slider.component.html',
  styleUrls: ['./product-detail-slider.component.css']
})
export class ProductDetailSliderComponent implements OnInit {

  @Input() productId!: number;

  constructor() { }

  ngOnInit(): void {

  }

}
