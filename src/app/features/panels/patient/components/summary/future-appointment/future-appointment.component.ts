import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PatientService } from '../../../../../Patients/patient.service';
import { AppointmentService } from '../../../../../appointments/services/appointment.service';
import { Appointment } from '../../../../../appointments/models/appointmentModel';
import { ResponseModel } from '../../../../../models/responseModel';

@Component({
  selector: 'app-future-appointment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './future-appointment.component.html',
  styleUrl: './future-appointment.component.scss'
})
export class FutureAppointmentComponent {
  appointments: Appointment[] = [];
  pageIndex: number = 0;
  pageSize: number = 12;
  todayDate: Date = new Date(); // Bugünkü tarihi al

  constructor(
    private patientService: PatientService,
    private appointmentService: AppointmentService,

  ) {}

  ngOnInit(): void {
    this.getPatientAppointments();
  }

  getPatientAppointments(): void {
    this.patientService.getPatientProfile().subscribe(
      (patient) => {
        const patientId = patient.id.toString();
        this.appointmentService
          .getPatientAppointments(patientId, this.pageIndex, this.pageSize)
          .subscribe(
            (response: ResponseModel<Appointment>) => {
              this.appointments = response.items.filter((appointment) => {
                const appointmentDate = new Date(appointment.date);
                return (
                  appointmentDate > this.todayDate ||
                  (appointmentDate.getTime() === this.todayDate.getTime() &&
                    appointment.time >=
                      this.todayDate.toTimeString().slice(0, 5))
                );
              });
            },
            (error) => {
              console.error('Randevular alınamadı:', error);
            }
          );
      },
      (error) => {
        console.error('Hasta bilgileri alınamadı:', error);
      }
    );
  }





}
