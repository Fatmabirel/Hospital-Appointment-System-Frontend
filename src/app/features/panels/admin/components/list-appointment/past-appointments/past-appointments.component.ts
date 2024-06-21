import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../../../../appointments/services/appointment.service';
import { DoctorService } from '../../../../../doctors/services/doctor.service';
import { Appointment } from '../../../../../appointments/models/appointmentModel';
import { Doctor } from '../../../../../doctors/models/doctor';
import { ResponseModel } from '../../../../../models/responseModel';
import { AdminSidebarComponent } from '../../sidebar/adminSidebar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-past-appointments',
  standalone: true,
  imports: [CommonModule, AdminSidebarComponent, RouterModule],
  templateUrl: './past-appointments.component.html',
  styleUrls: ['./past-appointments.component.scss']
})
export class PastAppointmentsComponent implements OnInit {
  pastAppointments: Appointment[] = [];
  /* doctors: { [key: string]: Doctor } = {}; */
  todayDate: Date = new Date();
  errorMessage: string;

  constructor(private appointmentService: AppointmentService, private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.loadPastAppointments();
  }

  loadPastAppointments(): void {
    this.appointmentService.getAllAppointments(0, 100).subscribe(
      (response: ResponseModel<Appointment>) => {
        this.pastAppointments = response.items.filter(appointment => {
          const appointmentDate = new Date(appointment.date);
          return appointmentDate < this.todayDate ||
            (appointmentDate.getTime() === this.todayDate.getTime() && appointment.time < this.todayDate.toTimeString().slice(0, 5));
        });
        /* this.loadDoctorNames(this.pastAppointments); */
      },
      (error) => {
        console.error('Randevular alınamadı:', error);
        this.errorMessage = error.message;
      }
    );
  }

  /* loadDoctorNames(appointments: Appointment[]): void {
    appointments.forEach((appointment) => {
      if (!this.doctors[appointment.doctorId]) {
        this.doctorService.getDoctorById(appointment.doctorId).subscribe(
          (doctor) => {
            this.doctors[appointment.doctorId] = doctor;
          },
          (error) => {
            console.error('Doktor bilgisi alınamadı:', error);
            this.errorMessage = error.message;
          }
        );
      }
    }); */
  }

