import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/auth/services/auth.service';
import { Router } from '@angular/router'; // Router modülünü ekliyoruz
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginModel } from '../../../core/auth/models/loginModel';
import { BasicLayoutComponent } from '../../../shared/components/basic-layout/basic-layout.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    BasicLayoutComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      authenticatorCode: [''],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const loginModel: LoginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(
        (response) => {
          const token = response.accessToken.token; // accessToken içinden token özelliğini al
          localStorage.setItem('token', token);
          this.toastrService.success('Giriş başarılı!', 'Başarılı');
          this.router.navigate(['/']);  // Başarılı girişten sonra yönlendirme
        },
        (responseError) => {
          this.toastrService.error('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.', 'Hata');
        }
      );
    } else {
      this.toastrService.error('Form geçerli değil. Lütfen bilgilerinizi kontrol edin.', 'Uyarı');
    }
  }
}
