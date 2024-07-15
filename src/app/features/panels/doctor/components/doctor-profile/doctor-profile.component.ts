import { Component, OnInit } from '@angular/core';
import { DoctorSidebarComponent } from '../sidebar/doctorSidebar.component';
import { DoctorService } from '../../../../doctors/services/doctor.service';
import { Doctor } from '../../../../doctors/models/doctor';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TokenComponent } from '../../../../../shared/components/token/token.component';

@Component({
  selector: 'app-doctor-profile',
  standalone: true,
  imports: [
    CommonModule,
    DoctorSidebarComponent,
    FormsModule,
    ReactiveFormsModule,
    TokenComponent
  ],
  templateUrl: './doctor-profile.component.html',
  styleUrl: './doctor-profile.component.scss',
})
export class DoctorProfileComponent implements OnInit {
  doctorForm: FormGroup;
  doctor: Doctor;

  constructor(
    private formBuilder: FormBuilder,
    private doctorService: DoctorService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getDoctorProfile();
  }

  initForm() {
    this.doctorForm = this.formBuilder.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      branchID: ['', Validators.required],
      branchName: [''],
      title: ['', Validators.required],
      schoolName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      nationalIdentity: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
    });
  }

  getDoctorProfile() {
    this.doctorService.getDoctorProfile().subscribe(
      (data) => {
        this.doctor = data;
        this.doctorForm.patchValue(data);
      },
      (error) => {
        console.error('Doktor profili alınamadı:', error);
      }
    );
  }

  updateDoctor() {
    if (this.doctorForm.valid) {
      const updatedDoctor: Doctor = this.doctorForm.value;
      updatedDoctor.id = this.doctor.id;
      updatedDoctor.branchID = this.doctor.branchID;
      console.log(updatedDoctor);
      this.doctorService.updateDoctor(updatedDoctor).subscribe(
        (response) => {
          console.log('Doktor güncellendi:', response);
          this.toastrService.success('Bilgileriniz başarıyla güncellendi');
          this.router.navigate(['doctor-sidebar']);
        },
        (responseError) => {
          this.toastrService.error(responseError.error.Detail, 'Hatalı İşlem');
        }
      );
    } else {
      this.toastrService.error('Lütfen eksik alanları doldurun');
    }
  }
}
