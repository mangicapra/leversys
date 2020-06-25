import { Component, OnInit, OnDestroy } from '@angular/core';
import { process, State } from '@progress/kendo-data-query';
import { User } from '@models/user';
import {
  DialogService,
  DialogCloseResult,
} from '@progress/kendo-angular-dialog';
import { UserModalComponent } from './components/user-modal/user-modal.component';
import { UserService } from './services/user.service';
import { ConfirmComponent } from '@shared/components/confirm/confirm.component';
import {
  GridDataResult,
  PageChangeEvent,
  DataStateChangeEvent,
} from '@progress/kendo-angular-grid';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, OnDestroy {
  private removeModalSubscription = new Subscription();
  private deleteUserSubscription = new Subscription();
  private addModalSubscription = new Subscription();
  private getUsersSubscription = new Subscription();
  public users: User[];
  public gridView: GridDataResult;
  public state: State = {
    skip: 0,
    take: 10,
    filter: {
      logic: 'and',
      filters: [],
    },
  };

  public mySelection: number[] = [];
  public selectedUser: User;
  public isNew: boolean;
  public pageSize = 10;
  public skip = 0;

  constructor(
    private dialogService: DialogService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  ngOnDestroy() {
    this.removeModalSubscription.unsubscribe();
    this.deleteUserSubscription.unsubscribe();
    this.addModalSubscription.unsubscribe();
    this.getUsersSubscription.unsubscribe();
  }

  public selectedCallback(args): string {
    return args.dataItem;
  }

  public selectionChange(e): void {
    this.selectedUser = e.selectedRows[0].dataItem;
  }

  public addHandler(ev): void {
    this.openModal(true);
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.gridView = process(this.users, this.state);
  }

  public removeHandler(ev): void {
    const dialogRef = this.dialogService.open({
      content: ConfirmComponent,
    });

    this.removeModalSubscription.add(
      dialogRef.result.subscribe((result) => {
        if (!(result instanceof DialogCloseResult)) {
          this.deleteUserSubscription.add(
            this.userService
              .deleteUser(this.selectedUser.id)
              .subscribe(() => this.getUsers())
          );
          this.selectedUser = null;
        }
      })
    );
  }

  public editHandler(ev): void {
    this.openModal(false);
  }

  private openModal(isNew: boolean): void {
    const dialogRef = this.dialogService.open({
      content: UserModalComponent,
    });
    const userInfo = dialogRef.content.instance;
    if (!isNew) {
      userInfo.isNew = isNew;
      userInfo.name = this.selectedUser.name;
      userInfo.lastName = this.selectedUser.lastName;
      userInfo.email = this.selectedUser.email;
      userInfo.password = this.selectedUser.password;
      userInfo.id = this.selectedUser.id;
    }

    this.addModalSubscription.add(
      dialogRef.result.subscribe((result) => {
        if (!(result instanceof DialogCloseResult)) {
          this.getUsers();
          this.selectedUser = null;
        }
      })
    );
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }

  private getUsers(): void {
    this.getUsersSubscription.add(
      this.userService.getUsers().subscribe((users: User[]) => {
        this.users = users;
        this.loadItems();
      })
    );
  }

  private loadItems(): void {
    this.gridView = process(this.users, this.state);
  }
}
