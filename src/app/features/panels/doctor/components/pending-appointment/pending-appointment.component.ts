import { Component } from '@angular/core';
import { Appointment } from '../../../../appointments/models/appointmentModel';
import { DoctorService } from '../../../../doctors/services/doctor.service';
import { AppointmentService } from '../../../../appointments/services/appointment.service';
import { ResponseModel } from '../../../../models/responseModel';
import { DoctorSidebarComponent } from '../sidebar/doctorSidebar.component';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pending-appointment',
  standalone: true,
  imports: [CommonModule, DoctorSidebarComponent],
  templateUrl: './pending-appointment.component.html',
  styleUrl: './pending-appointment.component.scss',
})
export class PendingAppointmentComponent {
  appointments: Appointment[] = [];
  pageIndex: number = 0;
  pageSize: number = 12;
  todayDate: Date = new Date(); // Bugünkü tarihi al

  constructor(
    private doctorService: DoctorService,
    private appointmentService: AppointmentService,
    private toastrService: ToastrService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadDoctorAppointments();
  }

  loadDoctorAppointments(): void {
    this.doctorService.getDoctorProfile().subscribe(
      (doctor) => {
        const doctorId = doctor.id.toString();
        this.appointmentService
          .getDoctorAppointments(doctorId, this.pageIndex, this.pageSize)
          .subscribe(
            (response: ResponseModel<Appointment>) => {
              // Filtreleme işlemi
              this.appointments = response.items.filter((appointment) => {
                const appointmentDate = new Date(appointment.date);
                // Tarih ve saat kontrolü
                return (
                  appointmentDate > this.todayDate ||
                  (appointmentDate.getTime() === this.todayDate.getTime() &&
                    appointment.time >
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
        console.error('Doktor bilgileri alınamadı:', error);
      }
    );
  }

  public viewReport(){
    return this.toastrService.error("Randevu henüz gerçekleşmedi. Rapor bulunmamaktadır.", "Hata");
  }
}
