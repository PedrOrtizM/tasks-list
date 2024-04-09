import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';
import { EMAIL_REGEX } from '../common/utils/email-regex.const';
import { User } from '../core/models/user/user.interface';
import { ToastService } from '../core/services/toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly toastService: ToastService) { }

  public userLogin(): void {

    this.userService
      .loginUser(this.userForm.value as Partial<User>)
      .subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: () => this.toastService.showError('Error al iniciar sesión')
      })
  }

  public hasError(controlName: 'email' | 'password', type: string) {
    const control = this.userForm.controls[controlName];
    return control?.hasError(type) && control.dirty;
  }

}
