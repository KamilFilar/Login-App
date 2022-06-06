import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersModalEditComponent } from './users-modal-edit.component';

describe('UsersModalEditComponent', () => {
  let component: UsersModalEditComponent;
  let fixture: ComponentFixture<UsersModalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersModalEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersModalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
