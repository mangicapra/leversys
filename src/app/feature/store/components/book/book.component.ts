import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  @Input() public book: Book;
  @Input() public selectedBookId: number;

  constructor() {}

  ngOnInit() {}
}
