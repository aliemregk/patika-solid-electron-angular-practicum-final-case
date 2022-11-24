import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  protected searchText: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Define an event to catch changes in searchbox input.
   */
  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  /**
   * When a change occurs in searchbox emit an event with given value.
   */
  protected onSearchTextChanged(): void {
    this.searchTextChanged.emit(this.searchText);
  }

}
