import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PatientSidebarComponent } from '../sidebar/psidebar.component';
import { Appointment } from '../../../../appointments/models/appointmentModel';
import { PatientService } from '../../../../Patients/patient.service';
import { AppointmentService } from '../../../../appointments/services/appointment.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ResponseModel } from '../../../../models/responseModel';

@Component({
  selector: 'app-patient-list-upcoming-appointment',
  standalone: true,
  imports: [CommonModule,PatientSidebarComponent],
  templateUrl: './patient-list-upcoming-appointment.component.html',
  styleUrl: './patient-list-upcoming-appointment.component.scss'
})
export class PatientListUpcomingAppointmentComponent {
  appointments: Appointment[] = [];
  pageIndex: number = 0;
  pageSize: number = 12;
  todayDate: Date = new Date(); // Bugünkü tarihi al

  constructor(
    private patientService: PatientService,
    private appointmentService: AppointmentService,
    private toastrService: ToastrService,
    private router: Router
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
  viewReport() : void{
    this.toastrService.error("Bu randevu henüz gerçekleşmedi.Rapor bulunmamaktadır", "Rapor bulunamadı")
  }
}
