import { PhotoService } from './../../../../shared/services/photo.service';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { Photo } from 'src/app/shared/models/photo.model';

@Component({
  selector: 'app-product-detail-slider',
  templateUrl: './product-detail-slider.component.html',
  styleUrls: ['./product-detail-slider.component.css']
})
export class ProductDetailSliderComponent implements OnInit {

  @Input() productId!: number;
  protected photos$!: Observable<Photo[]>

  /**
   * @param  {PhotoService} photoService
   * Service injection.
   */
  constructor(private readonly photoService: PhotoService) { }

  /**
   * @returns void
   * Called once, when the instance is created.
   * Call getPhotos() function.
   */
  ngOnInit(): void {
    this.getPhotos();
  }

  /**
   * @returns void
   * Get product photos with using photo service.
   * Assign data to an observable for further use.
   */
  private getPhotos(): void {
    this.photos$ = this.photoService.getPhotosByProductId(this.productId);
  }
}
