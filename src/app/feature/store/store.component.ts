import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreService } from './services/store.service';
import { Book } from './models/book';
import { Subscription, Observable } from 'rxjs';
import { User } from '@models/user';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
  providers: [DatePipe],
})
export class StoreComponent implements OnInit, OnDestroy {
  private singleBookSubscription = new Subscription();
  private bookSubscription = new Subscription();

  public loggedUser: User;
  public loginTime: string;
  public books: Book[];
  public selectedBook: Book;
  public time = new Date();
  public selectedBookId: number;

  constructor(private storeService: StoreService, private datePipe: DatePipe) {}

  ngOnInit() {
    setInterval(() => {
      this.time = new Date();
    }, 1000);
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    this.loginTime = this.datePipe.transform(
      JSON.parse(localStorage.getItem('loginTime')),
      'H:mm:ss'
    );
    this.getBooks();
  }

  ngOnDestroy() {
    this.singleBookSubscription.unsubscribe();
    this.bookSubscription.unsubscribe();
  }

  private getBooks(): void {
    this.bookSubscription.add(
      this.storeService
        .getBooks()
        .subscribe((books: Book[]) => (this.books = books))
    );
  }

  selectBook(book: Book): void {
    if (book.inStock === 0) return;

    this.selectedBookId = book.id;
    this.singleBookSubscription.add(
      this.storeService.getSingleBook(book.id).subscribe((book: Book) => {
        this.selectedBook = book;
      })
    );
  }

  handleBookRent(ev: boolean): void {
    if (this.selectedBook.inStock !== 0) {
      this.storeService
        .changeCopiesNumber(this.selectedBook.id, this.selectedBook.inStock - 1)
        .subscribe((book: Book) => {
          this.books[this.books.findIndex((el) => el.id === book.id)] = book;
          this.selectedBook = book;
        });
    }
  }
}
