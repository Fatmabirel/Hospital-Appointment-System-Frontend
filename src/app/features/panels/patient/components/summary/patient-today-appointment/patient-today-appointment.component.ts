import { Component } from '@angular/core';
import { Appointment } from '../../../../../appointments/models/appointmentModel';
import { ResponseModel } from '../../../../../models/responseModel';
import { PatientService } from '../../../../../Patients/patient.service';
import { AppointmentService } from '../../../../../appointments/services/appointment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-today-appointment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-today-appointment.component.html',
  styleUrl: './patient-today-appointment.component.scss'
})
export class PatientTodayAppointmentComponent {
  appointments: Appointment[] = [];
  pageIndex: number = 0;
  pageSize: number = 100; //12
  todayDate: Date = new Date(); // Bugünkü tarihi al

  constructor(
    private patientService: PatientService,
    private appointmentService: AppointmentService,

  ) {}

  ngOnInit(): void {
    this.getPatientAppointments();
  }

  sortAppointments(): void {
    this.appointments.sort((a, b) => {
      const dateA = new Date(a.date + ' ' + a.time);
      const dateB = new Date(b.date + ' ' + b.time);
      return dateA.getTime() - dateB.getTime(); // Artan sırayla sıralama
    });
  }
  
  getPatientAppointments(): void {
    this.patientService.getPatientProfile().subscribe(
      (patient) => {
        const patientId = patient.id.toString();
        const todayStr = this.todayDate.toISOString().split('T')[0]; // Bugünkü tarihi alır ve formatlar
        this.appointmentService
          .getPatientAppointments(patientId, this.pageIndex, this.pageSize)
          .subscribe(
            (response: ResponseModel<Appointment>) => {
              this.appointments = response.items.filter((appointment) => {
                const appointmentDate = new Date(appointment.date);
                const appointmentDateStr = appointmentDate.toISOString().split('T')[0];
                // Tarih kontrolü
                return appointmentDateStr === todayStr;
            });
            this.sortAppointments();
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

