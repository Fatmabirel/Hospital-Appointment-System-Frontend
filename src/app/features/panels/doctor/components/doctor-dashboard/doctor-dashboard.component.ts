import { Component, ElementRef, ViewChild } from '@angular/core';
import { DoctorSidebarComponent } from '../sidebar/doctorSidebar.component';
import { DoctorService } from '../../../../doctors/services/doctor.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [DoctorSidebarComponent],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.scss'
})
export class DoctorDashboardComponent {
  doctorName: string;
  totalAppointments: number;
  @ViewChild('myChart') private chartRef: ElementRef;
  private chart: any;

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    // Örneğin, doktorun adını ve toplam randevu sayısını bir servisten alalım
    //this.totalAppointments = this.doctorService.getTotalAppointments(); // Servisten toplam randevu sayısını alın
    this.createChart();
  }

  createChart(): void {
    const chartRef = this.chartRef.nativeElement.getContext('2d');
    this.chart = new Chart(chartRef, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Monthly Appointments',
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
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
