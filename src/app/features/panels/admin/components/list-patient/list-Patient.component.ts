import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AdminSidebarComponent } from '../sidebar/adminSidebar.component';
import { PatientService } from '../../../../Patients/patient.service';
import { Patient } from '../../../../Patients/patientModel';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-patient',
  standalone: true,
  imports: [
    CommonModule,RouterModule,AdminSidebarComponent
  ],
  templateUrl: './List-Patient.component.html',
  styleUrl: './List-Patient.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPatientComponent  {


  patients: Patient[] = [];
  pageIndex: number = 0;
  pageSize: number = 10;
  isLoading: boolean = true;

  constructor(private patientService:PatientService) {}

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients() {
    this.patientService.getPatients(this.pageIndex, this.pageSize).subscribe((response) => {
      this.patients = response.items;
    });   
  }

  deletePatient(patientId:string) {
    this.patientService.deletePatient(patientId).subscribe(
      (response) => {
        console.log('Hasta başarıyla silindi:', response);
        this.getPatients(); // Hastaları yeniden yükleyerek güncellemeyi sağlıyoruz
      },
      (error) => {
        console.error('Hasta silinemedi:', error);
      }
    );
  }
  
 }
