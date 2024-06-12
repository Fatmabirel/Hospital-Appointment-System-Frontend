import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/services/auth.service';
import { Router } from '@angular/router';  // Router modülünü ekliyoruz
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginModel } from '../../../core/auth/models/loginModel';
import { BasicLayoutComponent } from '../../../shared/components/basic-layout/basic-layout.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule,BasicLayoutComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router  // Router modülünü ekliyoruz
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      authenticatorCode: ['']
    });
  }

  login() {
    if (this.loginForm.valid) {
      console.log('Form geçerli, login işlemi başlıyor.');
      const loginModel: LoginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(
        (response) => {
          //console.log('Başarılı giriş:',response);
          const token = response.accessToken.token; // accessToken içinden token özelliğini al
          localStorage.setItem('token', token);
          //console.log('Token:', token);
          this.router.navigate(['/']);  // Başarılı girişten sonra yönlendirme
        },
        (responseError) => {
          console.error('Giriş hatası:', responseError);
        }
      );
    } else {
      console.error('Form geçerli değil:', this.loginForm);
    }
  }
}
