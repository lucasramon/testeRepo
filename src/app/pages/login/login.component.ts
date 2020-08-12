import { UiService } from './../../services/ui.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  redirectUrl = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private uiService: UiService,
  ) {
    route.paramMap.subscribe(p => (this.redirectUrl = p.get('redirectUrl')));
  }

  ngOnInit(): void {
    this.buildForm();
  }

  validForm(): boolean {
    return (this.loginForm.valid) ? true : false;
  }

  buildForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  async submit(): Promise<void> {

    if (this.validForm()) {
      this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value).subscribe(
        (authStatus) => {
          if (authStatus.isAuthenticated) {
            this.router.navigate([this.redirectUrl || '/']);
            this.uiService.showSucess('Welcome ' + authStatus.userRole);
          } else {
            this.uiService.showError('Failed to Login');
          }
          this.loginForm.reset()
        },
        (error) => {
          this.uiService.showError('Failed to Login');
        }
      );
    }
  }

}
