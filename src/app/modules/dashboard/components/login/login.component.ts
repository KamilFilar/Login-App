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

  public faUser: IconDefinition = faUser;
  public faLock: IconDefinition = faLock;
  public faEye: IconDefinition = faEye;
  public faEyeSlash: IconDefinition = faEyeSlash;
  public isPaswordVisible: boolean = false;
  public loginState: boolean = false;
  public isErrorOccured: boolean = false;

  public loginForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl('')
  });

  public get login() {
    return this.loginForm.get('login');
  }

  public get password() {
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

  public showPassword(): void {
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

  public logIn(): void {
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
