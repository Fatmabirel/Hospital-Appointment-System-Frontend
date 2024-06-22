import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DoctorService } from '../../../../doctors/services/doctor.service';
import { Doctor } from '../../../../doctors/models/doctor';
import { AuthService } from '../../../../../core/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-doctor-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './doctorSidebar.component.html',
  styleUrl: './doctorSidebar.component.scss',
})
export class DoctorSidebarComponent implements OnInit {
  doctor: Doctor;
  doctorName: string = '';
  doctorTitle: string = '';
  doctorBranch:string='';

  errorMessage: string;

  constructor(
    private doctorService: DoctorService,
    private authService: AuthService,
    private toastrService:ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.doctorService.getDoctorProfile().subscribe(
      (doctor) => {
        this.doctor = doctor;
        this.doctorTitle = doctor.title;
        this.doctorName = doctor.firstName + ' ' + doctor.lastName;
        this.doctorBranch=doctor.branchName;
      },

      (error) => {
        this.errorMessage = error.message; // Hata mesajını al ve errorMessage değişkenine ata
        console.error('Hata:', error); // Hata durumunda konsola yazdır
      }
    );
  }
  logout(): void {
    this.authService.logout();
    this.toastrService.success('Başarıyla çıkış yaptınız. Giriş sayfasına yönlendiriliyorsunuz', 'Başarılı');
    this.router.navigate(['/']); // Giriş sayfasına yönlendir
  }
}
