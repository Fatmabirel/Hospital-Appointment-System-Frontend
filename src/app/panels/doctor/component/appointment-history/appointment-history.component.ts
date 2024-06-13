import { Component, OnInit } from '@angular/core';
import { DoctorSidebarComponent } from '../sidebar/doctorSidebar.component';
import { CommonModule } from '@angular/common';
import { Appointment } from '../../../../features/appointments/models/appointmentModel';
import { DoctorService } from '../../../../features/doctors/services/doctor.service';
import { ResponseModel } from '../../../../features/models/responseModel';
import { AppointmentService } from '../../../../features/appointments/services/appointment.service';

@Component({
  selector: 'app-appointment-history',
  standalone: true,
  imports: [CommonModule, DoctorSidebarComponent],
  templateUrl: './appointment-history.component.html',
  styleUrl: './appointment-history.component.scss'
})
export class AppointmentHistoryComponent implements OnInit {
  appointments: Appointment[] = [];
  pageIndex: number = 0;
  pageSize: number = 12;

  constructor(private doctorService: DoctorService, private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.loadDoctorAppointments();
  }

  loadDoctorAppointments(): void {
    this.doctorService.getDoctorProfile().subscribe(
      (doctor) => {
        const doctorId = doctor.id.toString(); 
        //console.log('id:', doctorId);
        this.appointmentService.getDoctorAppointments(doctorId, this.pageIndex, this.pageSize).subscribe(
          (response: ResponseModel<Appointment>) => {
            this.appointments = response.items;
            //console.log('Randevular:', this.appointments);
          },
          (error) => {
            console.error('Randevular alınamadı:', error);
          }
        );
      },
      (error) => {
        console.error('Doktor bilgileri alınamadı:', error);
      }
    );
  }
 
}
