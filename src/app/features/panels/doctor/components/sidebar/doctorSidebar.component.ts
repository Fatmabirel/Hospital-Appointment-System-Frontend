import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DoctorService } from '../../../../doctors/services/doctor.service';
import { Doctor } from '../../../../doctors/models/doctor';

@Component({
  selector: 'app-doctor-sidebar',
  standalone: true,
  imports: [
    CommonModule,RouterModule
  ],
  templateUrl: './doctorSidebar.component.html',
  styleUrl: './doctorSidebar.component.scss'
})
export class DoctorSidebarComponent implements OnInit {
  doctor: Doctor;
  doctorName:string = '';
  doctorTitle:string = '';
  errorMessage: string;

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.doctorService.getDoctorProfile().subscribe(
      (doctor) => {
        this.doctor = doctor;
        this.doctorTitle = doctor.title;
        this.doctorName = doctor.firstName + ' ' + doctor.lastName;
        //console.log('Doctor:', this.doctor); // Doctor bilgilerini konsola yazdır
      },
      (error) => {
        this.errorMessage = error.message; // Hata mesajını al ve errorMessage değişkenine ata
        console.error('Hata:', error); // Hata durumunda konsola yazdır
      }
    );
  }

}
