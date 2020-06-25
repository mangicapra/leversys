import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../../models/book';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  @Input() selectedBook: Book;

  @Output() rentBook = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}

  public rent(): void {
    this.rentBook.emit(true);
  }
}
