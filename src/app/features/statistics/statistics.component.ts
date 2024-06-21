import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonEngine } from '@angular/ssr';
import { AdminSidebarComponent } from '../panels/admin/components/sidebar/adminSidebar.component';
import { DoctorService } from '../doctors/services/doctor.service';



@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule, AdminSidebarComponent],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  userCount: number;
  activeUsers: number;
  pageViews: number;
  doctorCount: number; // Doktor sayısı için değişken

  constructor(private doctorService: DoctorService) { // DoctorService inject ediliyor
    // Örnek veriler
    this.userCount = 1000;
    this.activeUsers = 150;
    this.pageViews = 5000;
    this.doctorCount = 0; // Başlangıç değeri
  }

  ngOnInit(): void {
    // İstatistikleri almak için API çağrıları burada yapılabilir
    this.getDoctorCount(); // Doktor sayısını almak için metot çağrılıyor
  }

  getDoctorCount(): void {
    this.doctorService.getDoctors(0, 1).subscribe((response) => { // Tüm doktorları getirmek yerine sadece toplam sayıyı almak için sayfalama parametreleri kullanılıyor
      this.doctorCount = response.count; // Toplam doktor sayısını alıyoruz
    });
  }
}
