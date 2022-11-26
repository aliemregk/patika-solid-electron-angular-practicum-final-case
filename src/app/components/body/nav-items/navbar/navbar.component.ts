import { Category } from './../../../../shared/models/category.model';
import { CategoryService } from './../../../../shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  protected categories$ = new Observable<Category[]>();
  /**
   * @param  {CategoryService} categoryService
   * Service injection.
   */
  constructor(private readonly categoryService: CategoryService) { }

  /**
   * @returns void
   * Called once, when the instance is created.
   * Get categories from category service.
   * Assign data to an observable for further use.
   */
  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
  }
}
