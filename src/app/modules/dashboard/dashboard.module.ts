import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// Reactiv forms
import { ReactiveFormsModule } from '@angular/forms';
// Components
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { UsersModalEditComponent } from './components/users/users-modal-edit/users-modal-edit.component';
// Pipes
import { FilterUsersPipe } from 'src/app/shared/pipes/filter-users.pipe';


@NgModule({
  declarations: [
    // Components
    LoginComponent,
    UsersComponent,
    UsersModalEditComponent,
    // Pipes
    FilterUsersPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    FontAwesomeModule
  ],
  exports: [
    LoginComponent,
    UsersComponent
  ],
})
export class DashboardModule {}
