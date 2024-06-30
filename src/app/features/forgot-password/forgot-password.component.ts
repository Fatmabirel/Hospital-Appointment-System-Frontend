import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../users/user-model';
import { UserService } from '../users/user.service';
import { BasicLayoutComponent } from '../../shared/components/basic-layout/basic-layout.component';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
   CommonModule,
   ReactiveFormsModule,
   BasicLayoutComponent
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  
})
export class ForgotPasswordComponent implements OnInit {

  passwordForm:FormGroup;
  user:User;

 
  constructor(
    private FormBuilder:FormBuilder,
    private UserService:UserService,
    private toastrService:ToastrService,
    private route:ActivatedRoute,
    private router:Router,
    
    
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
   
    this.passwordForm = this.FormBuilder.group({
      // id: [''], 
      phone: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
     
    });
  }

  ChangePassword() {
    
    if (this.passwordForm.valid) {
      // Formun geçerli olup olmadığını kontrol ediyoruz
      const ChangePassword:User = this.passwordForm.value; // Form verilerini Doctor nesnesine atıyoruz
     // ChangePassword.email = this.user.email;
      //ChangePassword.phone=this.user.phone;
      
      //console.log(updatedHasta);
      this.UserService.ChangePassword(ChangePassword).subscribe(
        (response) => {
          this.toastrService.success('Şifre başarıyla güncellendi');
          this.router.navigate(['/login']);
        },
        (error) => {
          this.toastrService.error('Şifre güncellenemedi');
          console.error('Hasta güncellenemedi:', error);
        }
      );
    } else {
      // Form geçerli değilse hata mesajı gösterilebilir
      this.toastrService.error('Lütfen eksik alanları doldurun');
    }
  }








  // ForgotPassword() {
  //   // if (this.passwordForm.valid) {
  
  //     // const forgotPassword:User = this.passwordForm.value;
  //     // forgotPassword.email = this.user.email;
  //     // forgotPassword.phone = this.user.phone;
      
    
  //     this.UserService.ChangePassword(this.user).subscribe(
  //       (response) => {
  //         this.toastrService.success('Branş başarıyla güncellendi');
        
  //       },
  //       (error) => {
  //         this.toastrService.error('Aynı branchten var');
          
  //       }
  //     );
  //   } 
  //   // else 
  //   // {
     
  //   //   this.toastrService.error('Lütfen eksik alanları doldurun');
  //   // }
  }





