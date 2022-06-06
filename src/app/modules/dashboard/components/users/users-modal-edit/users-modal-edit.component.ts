import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faCircleXmark, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-users-modal-edit',
  templateUrl: './users-modal-edit.component.html',
  styleUrls: ['./users-modal-edit.component.scss']
})
export class UsersModalEditComponent implements OnInit {

  @Input() displayState: string = '';
  @Input() selectedID!: number;
  @Output() hideEditModal = new EventEmitter<boolean>();
  
  public faCircleXmark: IconDefinition = faCircleXmark;
  public rolesArray: string[] = [];
  public userEditForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    role: new FormControl('')
  })

  public get username() {
    return this.userEditForm.get('username');
  }

  public get email() {
    return this.userEditForm.get('email');
  }

  public get role() {
    return this.userEditForm.get('role');
  }

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit(): void {    
    this.getRolesOfUser(); 
  }

  public updateSelectedUser() {
    let userID!: number;
    let userNAME!: string;
    let userEMAIL!: string;
    let userROLE!: string;

    // Get current user by id
    this.usersService.getUserByID(this.selectedID).subscribe({
      next: (res) => {
        // Set current user data
        userID = res.id;
        userNAME = res.username;
        userEMAIL = res.email;
        userROLE = res.username;
      },
      error: (err) => {
        alert("ERROR: " + err.error);
      },
      complete: () => {
        // Check inputs and change user data
        if(this.userEditForm.value.username !== '') {
          userNAME = this.userEditForm.value.username!;
        }
        if(this.userEditForm.value.email !== '') {
          userEMAIL = this.userEditForm.value.email!;
        }
        if(this.userEditForm.value.role !== '') {
          userROLE = this.userEditForm.value.role!;
        }
        // Try to update user
        // ERROR 500 from backend and 403 from CORS policy (localhost)
        // Issue to fix!
        this.usersService.updateUser(userID, userNAME, userEMAIL, userROLE).subscribe({
          next: () => {
            alert('Zaktualizowano pomyślnie użytkownika ' + userID + '!');
          },
          error: (err) => {
            alert("ERROR: " + err.error);
          },
          complete: () => {
            this.closeModal();
          }
        })
      }
    });
  }

  public closeModal(): string {
    this.hideEditModal.emit(true);
    return this.displayState = "none";
  }

  private getRolesOfUser(): void {
    this.usersService.getUserRoles().subscribe({
      next: (res) => {
        this.rolesArray = res;
      },
      error: (err) => {
        alert("ERROR: " + err.error);
      }
    })
  }
}
