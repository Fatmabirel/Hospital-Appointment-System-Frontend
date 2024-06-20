import { Component, OnInit } from '@angular/core';
import { AdminSidebarComponent } from '../sidebar/adminSidebar.component';
import { CommonModule } from '@angular/common';
import { DoctorService } from '../../../../doctors/services/doctor.service';
import { Doctor } from '../../../../doctors/models/doctor';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-list-doctor',
  standalone: true,
  imports: [AdminSidebarComponent, CommonModule, RouterModule],
  templateUrl: './list-doctor.component.html',
  styleUrl: './list-doctor.component.scss',
})
export class ListDoctorComponent implements OnInit {
  doctors: Doctor[] = [];
  pageIndex: number = 0;
  pageSize: number = 10;

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.getDoctors();
  }

  getDoctors() {
    this.doctorService
      .getDoctors(this.pageIndex, this.pageSize)
      .subscribe((response) => {
        this.doctors = response.items;
      });
  }

  deleteDoctor(doctorId: string) {
      this.doctorService.deleteDoctor(doctorId).subscribe(
        (response) => {
          console.log('Doktor başarıyla silindi:', response);
          this.getDoctors(); // Doktorları yeniden yükleyerek güncellemeyi sağlıyoruz
        },
        (error) => {
          console.error('Doktor silinemedi:', error);
        }
      );
    }
}
