import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { faUser, faLock, faEye, faEyeSlash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{

  faUser: IconDefinition = faUser;
  faLock: IconDefinition = faLock;
  faEye: IconDefinition = faEye;
  faEyeSlash: IconDefinition = faEyeSlash;
  
  isPaswordVisible: boolean = false;
  loginState: boolean = false;
  isErrorOccured: boolean = false;

  loginForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl('')
  });

  get login() {
    return this.loginForm.get('login');
  }

  get password() {
    return this.loginForm.get('password');
  }

  constructor(
    private authService: AuthService,
    private cookiesService: CookieService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  private isUserLogIn(): boolean {
    this.cookiesService.get('access_token')
     ? this.loginState = true
     : this.loginState = false;

    return this.loginState;
  }

  showPassword(): void {
    let input: HTMLInputElement = document.querySelector('.passwordInput')!;
    
    if (input.type === "password") {
      this.isPaswordVisible = true;
      input.type = "text";
    }
    else {
      this.isPaswordVisible = false;
      input.type = "password";
    }
  }

  logIn(): void {
    if(this.loginForm.invalid) return;
    
    this.authService
      .signIn(this.loginForm.value.login!, this.loginForm.value.password!)
      .subscribe({
        next: (res) => {
          const tokenValue: string = res.headers.get('Authorization')!.toString();
          this.cookiesService.set('access_token', tokenValue);
        },
        error: () => {
          this.isErrorOccured = true;
        },
        complete: () => {
          this.router.navigate(['../users'], { relativeTo: this.route })
        }
      });
  }

  ngOnInit(): void {
    this.isUserLogIn();    
  }
}
