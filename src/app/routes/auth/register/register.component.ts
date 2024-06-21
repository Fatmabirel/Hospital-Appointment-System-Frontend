import { Component } from '@angular/core';
import { BasicLayoutComponent } from '../../../shared/components/basic-layout/basic-layout.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RegisterModel } from '../../../core/auth/models/registerModel';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [BasicLayoutComponent,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  registersd() {
    if (this.registerForm.valid) {
      const registerModel: RegisterModel = Object.assign({}, this.registerForm.value);
      this.authService.register(registerModel).subscribe(
        (response) => {
          const token = response.token; // Burada response direkt olarak token değerini içeriyor
          localStorage.setItem('token', token);
          this.toastrService.success('Kayıt başarılı!', 'Başarılı');
          this.router.navigate(['/']); // Başarılı kayıttan sonra yönlendirme
        },
        (responseError) => {
          this.toastrService.error('Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.', 'Hata');
        }
      );
    } else {
      this.toastrService.error('Eksik bilgi girdiniz. Lütfen bilgilerinizi kontrol edin.', 'Uyarı');
    }
  }

  register() {
  if (this.registerForm.valid) {
    let registerModel = Object.assign({}, this.registerForm.value);
    this.authService.register(registerModel).subscribe(
      (response) => {
        this.toastrService.success("Giriş sayfasına yönlendiriliyorsunuz...", "Kayıt olundu", {
          progressBar: true
        });
        // Başarılı kayıt sonrasında kullanıcıyı giriş sayfasına yönlendir
        this.router.navigate(['/']);
        // Kayıt başarılı olduğunda token'ı local storage'a kaydet
        localStorage.setItem("token", response.token);
      },
      (responseError) => {
        // Hata durumunda toastr ile hata mesajını göster
        this.toastrService.error('Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.', 'Hata');
      }
    );
  }else {
    this.toastrService.error('Eksik bilgi girdiniz. Lütfen bilgilerinizi kontrol edin.', 'Uyarı');
  }
}

  
}
