import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartType, registerables } from 'chart.js';
import { forkJoin } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DoctorService } from '../doctors/services/doctor.service';
import { PatientService } from '../Patients/patient.service';
import { AppointmentService } from '../appointments/services/appointment.service';
import { FeedbackService } from '../feedbacks/services/feedback.service';
import { AdminSidebarComponent } from '../panels/admin/components/sidebar/adminSidebar.component';

Chart.register(...registerables);

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule, AdminSidebarComponent],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, AfterViewInit {
  @ViewChild('barChart') barChart!: ElementRef;

  doctorCount: number;
  patientCount: number;
  appointmentCount: number;
  feedbackCount: number;
  isDataReady: boolean = false;

  constructor(
    private doctorService: DoctorService,
    private patientService: PatientService,
    private appointmentService: AppointmentService,
    private feedbackService: FeedbackService
  ) {
    this.doctorCount = 0;
    this.patientCount = 0;
    this.appointmentCount = 0;
    this.feedbackCount = 0;
  }

  ngOnInit(): void {
    this.getDataCounts();
  }

  ngAfterViewInit(): void {
    if (this.isDataReady) {
      this.updateChart();
    }
  }

  getDataCounts(): void {
    forkJoin({
      doctors: this.doctorService.getDoctors(0, 1),
      patients: this.patientService.getPatients(0, 1),
      appointments: this.appointmentService.getAllAppointments(0,1),
      feedbacks: this.feedbackService.getFeedbacks(0, 1)
    }).subscribe({
      next: (response) => {
        this.doctorCount = response.doctors.count;
        this.patientCount = response.patients.count;
        this.appointmentCount = response.appointments.count;
        this.feedbackCount = response.feedbacks.count;
        this.checkDataAndUpdateChart();
      },
      error: (err) => {
        console.error('Error fetching data:', err);

      }
    });
  }

  checkDataAndUpdateChart(): void {
    if (
      this.doctorCount !== null &&
      this.patientCount !== null &&
      this.appointmentCount !== null &&
      this.feedbackCount !== null
    ) {
      this.updateChart();
      this.isDataReady = true;
    }
  }

  updateChart(): void {
    const data = [
      this.doctorCount,
      this.patientCount,
      this.appointmentCount,
      this.feedbackCount
    ];
    const labels = ['Doktorlar', 'Hastalar', 'Randevular', 'Geri Bildirimler'];

    if (this.barChart && this.barChart.nativeElement) {
      new Chart(this.barChart.nativeElement, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Sayı',
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
