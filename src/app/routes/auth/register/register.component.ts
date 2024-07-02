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

  register() {
  if (this.registerForm.valid) {
    let registerModel = Object.assign({}, this.registerForm.value);
    this.authService.register(registerModel).subscribe(
      (response) => {
        this.toastrService.warning("Mail hesabınızı doğrulamanız gerekmektedir", "Kayıt olundu", {
          progressBar: true
        });
        this.router.navigate(['/']);
      },
      (responseError) => {
        this.toastrService.error(responseError.error.Detail, 'Hata');
      }
    );
  }else {
    this.toastrService.error('Eksik bilgi girdiniz. Lütfen bilgilerinizi kontrol edin.', 'Uyarı');
  }
}

  
}
