import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminSidebarComponent } from '../sidebar/adminSidebar.component';
import { FormBuilder, FormGroup, FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { Patient } from '../../../../Patients/patientModel';
import { PatientService } from '../../../../Patients/patient.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-patient',
  standalone: true,
  imports: [
   CommonModule,
   FormsModule,
   ReactiveFormsModule,
   AdminSidebarComponent

  ],
  templateUrl: './add-Patient.component.html',
  styleUrl: './add-Patient.component.scss',
  
})
export class AddPatientComponent { 
  patient: Patient[] = [];
  patientId: string;
  pageIndex: number = 0;
  pageSize: number = 50;
  PatientForm: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private patientService: PatientService,
    
    private toastrService:ToastrService,
    private router: Router
  ) {
    this.PatientForm = this.formbuilder.group({
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
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients() {
    this.patientService
      .getPatients(this.pageIndex, this.pageSize)
      .subscribe((response) => {
        this.patient = response.items;
        this.patient.forEach((patient) => {
          this.patientId = patient.id;
        });
      });
  }

  addPatient(): void {
    if (this.PatientForm.valid) {
      const selectedBranchId = this.PatientForm.get('patientId')?.value;
      // Form verilerini alarak hasta ekleme servisini çağırıyoruz
    

      this.patientService.addPatient(this.PatientForm.value).subscribe(
        (response) => {
          this.toastrService.success('Hasta başarıyla eklendi');
          this.router.navigate(['/admin-patient']);
        },
        (error) => {
          this.toastrService.error('Hasta eklenemedi');
          //console.error('Error adding doctor:', error);
        }
      );
    } else {
      console.error('Error adding patient:', this.PatientForm.value);
      this.toastrService.error('Eksik alanlarını doldurunuz.');
    }
  }







}
