import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DoctorService } from '../../../../features/doctors/services/doctor.service';

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
  doctorName: string = '';
  doctorId: string = '';

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.doctorService.getDoctorProfile().subscribe(
      (doctor) => {
        this.doctorName = `${doctor.firstName} ${doctor.lastName}`;
        console.log(this.doctorName);
      },
      (error) => {
        console.error('Hata:', error);
      }
    );
  }

}
