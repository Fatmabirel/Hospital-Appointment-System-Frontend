import { CommonModule } from '@angular/common';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { DoctorService } from '../doctors/services/doctor.service';
import { PatientService } from '../Patients/patient.service';
import { AppointmentService } from '../appointments/services/appointment.service';
import { FeedbackService } from '../feedbacks/services/feedback.service';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { AdminSidebarComponent } from '../panels/admin/components/sidebar/adminSidebar.component';

Chart.register(...registerables);

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule,AdminSidebarComponent  ],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  @ViewChild('barChart') barChart!: ElementRef;

  patientCount: number;
  doctorCount: number;
  appointmentCount: number;
  feedbackCount: number;
  isDataReady: boolean = false;

  constructor(
    private doctorService: DoctorService,
    private patientService: PatientService,
    private appointmentService: AppointmentService,
    private feedbackService: FeedbackService,
  ) {
    this.patientCount = 0;
    this.doctorCount = 0;
    this.appointmentCount = 0;
    this.feedbackCount = 0;
  }

  ngOnInit(): void {
    this.getDoctorCount();
    this.getPatientCount();
    this.getAppointmentCount();
    this.getFeedbackCount();
  }

  getDoctorCount(): void {
    this.doctorService.getDoctors(0, 1).subscribe((response) => {
      this.doctorCount = response.count;
      this.checkDataAndUpdateChart();
    });
  }

  getPatientCount(): void {
    this.patientService.getPatients(0, 1).subscribe((response) => {
      this.patientCount = response.count;
      this.checkDataAndUpdateChart();
    });
  }

  getAppointmentCount(): void {
    this.appointmentService.getAppointmentId(0, 1).subscribe((response) => {
      this.appointmentCount = response.count;
      this.checkDataAndUpdateChart();
    });
  }

  getFeedbackCount(): void {
    this.feedbackService.getFeedbacks(0, 1).subscribe((response) => {
      this.feedbackCount = response.count;
      this.checkDataAndUpdateChart();
    });
  }

  checkDataAndUpdateChart(): void {

    if (this.doctorCount !== 0 && this.patientCount !== 0 && this.appointmentCount !== 0 && this.feedbackCount !== 0) {
      this.updateChart();
      this.isDataReady = true;
    }
  }

  updateChart(): void {
    const data = [this.doctorCount, this.patientCount, this.appointmentCount, this.feedbackCount];
    const labels = ['Doktorlar', 'Hastalar', 'Randevular', 'Geri Bildirimler'];

    if (this.barChart && this.barChart.nativeElement) {
      new Chart(this.barChart.nativeElement, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Sayısı',
            data: data,
            backgroundColor: ['rgba(75, 192, 192, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)'],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
}
