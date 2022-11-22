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

  constructor(private readonly categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
  }
}
