import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PatientSidebarComponent } from '../sidebar/psidebar.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Patient } from '../../../../Patients/patientModel';
import { PatientService } from '../../../../Patients/patient.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TokenComponent } from '../../../../../shared/components/token/token.component';

@Component({
  selector: 'app-patient-profile',
  standalone: true,
  imports: [
    CommonModule,
    PatientSidebarComponent,
    ReactiveFormsModule,
    TokenComponent,
  ],
  templateUrl: './Patient-profile.component.html',
  styleUrl: './Patient-profile.component.scss',
})
export class PatientProfileComponent implements OnInit {
  PatientForm: FormGroup;
  patient: Patient;

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getPatientProfile();
  }

  initForm() {
    this.PatientForm = this.formBuilder.group({
      id: [''], 
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      age: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      nationalIdentity: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  getPatientProfile() {
    this.patientService.getPatientProfile().subscribe(
      (data) => {
        this.patient = data;
        this.PatientForm.patchValue(data);
      },
      (error) => {
        this.toastrService.error('Hasta profili alınamadı:', error);
      }
    );
  }
  updatePatient() {
    if (this.PatientForm.valid) {
      const updatedPatient: Patient = this.PatientForm.value; 
      updatedPatient.id = this.patient.id;
      console.log(updatedPatient);
      this.patientService.updatePatient(updatedPatient).subscribe(
        (response) => {
          console.log('Hasta güncellendi:', response);
          this.toastrService.success('Bilgileriniz başarıyla güncellendi');
          this.router.navigate(['patient-sidebar']);
        },
        (error) => {
          console.error('Hasta güncellenemedi:', error);
        }
      );
    } else {
      this.toastrService.error('Lütfen eksik alanları doldurun');
    }
  }
}
