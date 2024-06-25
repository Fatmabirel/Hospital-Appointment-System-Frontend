import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonEngine } from '@angular/ssr';
import { AdminSidebarComponent } from '../panels/admin/components/sidebar/adminSidebar.component';
import { DoctorService } from '../doctors/services/doctor.service';
import { PatientService } from '../Patients/patient.service';
import { AppointmentService } from '../appointments/services/appointment.service';
import { FeedbackService } from '../feedbacks/services/feedback.service';




@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule, AdminSidebarComponent],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  patientCount: number;
  doctorCount: number; // Doktor sayısı için değişken;
  appointmentCount: number;
  feedbackCount: number;

  constructor(private doctorService: DoctorService, private patientService: PatientService, private appointmentService: AppointmentService, private feedbackService: FeedbackService,) { // DoctorService inject ediliyor
    // Örnek veriler
    this.patientCount = 0;
    this.doctorCount = 0; // Başlangıç değeri
    this.appointmentCount = 0;
    this.feedbackCount = 0;
  }

  ngOnInit(): void {
    // İstatistikleri almak için API çağrıları burada yapılabilir
    this.getDoctorCount(); // Doktor sayısını almak için metot çağrılıyor
    this.getPatientCount();
    this.getAppointmentCount();
    this.getFeedbackCount();
  }

  getDoctorCount(): void {
    this.doctorService.getDoctors(0, 1).subscribe((response) => { // Tüm doktorları getirmek yerine sadece toplam sayıyı almak için sayfalama parametreleri kullanılıyor
      this.doctorCount = response.count; // Toplam doktor sayısını alıyoruz
    });
  }

  getPatientCount(): void {
    this.patientService.getPatients(0, 1).subscribe((response) => { // Tüm doktorları getirmek yerine sadece toplam sayıyı almak için sayfalama parametreleri kullanılıyor
      this.patientCount = response.count; // Toplam doktor sayısını alıyoruz
    });
  }

  getAppointmentCount(): void {
    this.appointmentService.getAppointmentId(0, 1).subscribe((response) => {
      this.appointmentCount = response.count;
    });
  }

  getFeedbackCount(): void {
    this.feedbackService.getFeedbacks(0,1).subscribe((response) => {
      this.feedbackCount = response.count;
    });
  }
}
