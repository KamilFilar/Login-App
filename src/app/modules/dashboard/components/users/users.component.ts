import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {
  faArrowRightFromBracket,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  
  faArrowRightFromBracket: IconDefinition = faArrowRightFromBracket;
  
  tableHeaders: string[] = ['ID', 'Username', 'Email', 'Role'];
  userData!: User;
  userID!: number;
  errorType!: number;
  
  displayValue: string = 'none';
  
  searchControl!: FormControl;
  searchText: string = '';
  
  private debounce: number = 400;

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.getListOfUsers();
    this.getValueOfSearchInput();
  }

  getValueOfSearchInput(): void {
    this.searchControl = new FormControl('');
    this.searchControl.valueChanges
      .pipe(debounceTime(this.debounce), distinctUntilChanged())
      .subscribe(query => {
        this.searchText = query;
      });
  }

  openModal(id: number): void {
    this.displayValue = 'block';
    this.userID = id;
  }

  checkIsModalClose(state: boolean): string {
    return state === true ? this.displayValue = 'none' : this.displayValue = 'block';
  }

  logOutUser(): void {
    this.authService.logOut();
  }

  private shouldDisplayUsersList(errorCode: number): number {    
    // 1 - no permision
    // 0 - no records
    return errorCode == 403 ? this.errorType = 1 : this.errorType = 0;
  }

  private getListOfUsers(): void {
    this.usersService.getAllUsers().subscribe({
      next: (res) => {
        this.errorType = 2;
        this.userData = res;
      },
      error: (err) => {
        this.shouldDisplayUsersList(err.status);
      },
    });
  }
}
