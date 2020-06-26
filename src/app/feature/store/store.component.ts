import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreService } from './services/store.service';
import { Book } from './models/book';
import { Subscription, Observable } from 'rxjs';
import { User, UserBook } from '@models/user';
import { DatePipe } from '@angular/common';
import { UserService } from '../admin/services/user.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
  providers: [DatePipe],
})
export class StoreComponent implements OnInit, OnDestroy {
  private singleBookSubscription = new Subscription();
  private bookSubscription = new Subscription();
  private changeCopiesNumberSubscription = new Subscription();
  private editUserSubscription = new Subscription();

  public loggedUser: User;
  public loginTime: string;
  public books: Book[];
  public selectedBook: Book;
  public time = new Date();
  public selectedBookId: number;
  public bookNumber: number;

  constructor(
    private storeService: StoreService,
    private datePipe: DatePipe,
    private userService: UserService
  ) {}

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
    this.bookNumber = this.calculateBooks;
  }

  ngOnDestroy() {
    this.singleBookSubscription.unsubscribe();
    this.bookSubscription.unsubscribe();
    this.editUserSubscription.unsubscribe();
    this.changeCopiesNumberSubscription.unsubscribe();
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

  private get calculateBooks() {
    return this.loggedUser.books.reduce((a, b) => a + b.ammount, 0);
  }

  handleBookRent(ev: boolean): void {
    if (this.selectedBook.inStock !== 0) {
      const rentBookSelected: UserBook = this.loggedUser.books.filter(
        (book: UserBook) => book.id === this.selectedBook.id
      )[0];
      ++rentBookSelected.ammount;
      this.loggedUser.books[
        this.loggedUser.books.findIndex((el) => el.id === rentBookSelected.id)
      ] = rentBookSelected;
      this.changeCopiesNumberSubscription.add(
        this.storeService
          .changeCopiesNumber(
            this.selectedBook.id,
            this.selectedBook.inStock - 1
          )
          .subscribe((book: Book) => {
            this.books[this.books.findIndex((el) => el.id === book.id)] = book;
            this.selectedBook = book;
            this.editUserSubscription.add(
              this.userService
                .editUser(this.loggedUser.id, { books: this.loggedUser.books })
                .subscribe((user: User) => {
                  localStorage.setItem('user', JSON.stringify(user));
                  this.loggedUser = user;
                  this.bookNumber = this.calculateBooks;
                })
            );
          })
      );
    }
  }
}
