import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../../../../core/auth/services/token.service';
import { AppointmentService } from '../../../../../appointments/services/appointment.service';
import { Appointment } from '../../../../../appointments/models/appointmentModel';
import { DoctorSidebarComponent } from "../../sidebar/doctorSidebar.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterAppointmentIdentityPipe } from "../../../../../pipe/filter-appointment-identity.pipe";

@Component({
    selector: 'app-tomorrow-appointment',
    standalone: true,
    templateUrl: './tomorrow-appointment.component.html',
    styleUrls: ['./tomorrow-appointment.component.scss'],
    imports: [CommonModule, DoctorSidebarComponent, FormsModule, FilterAppointmentIdentityPipe]
})
export class TomorrowAppointmentComponent implements OnInit {
  pageIndex: number = 0;
  pageSize: number = 100; // Eğer randevu sayısı çok fazla değilse yüksek bir değer kullanabilirsiniz.
  appointments: Appointment[] = [];
  tomorrowDate: Date = new Date();
  filterText: string = "";

  constructor(private tokenService: TokenService,
              private appointmentService: AppointmentService) {
    this.tomorrowDate.setDate(this.tomorrowDate.getDate() + 1); // Yarınki tarihi hesapla
  }

  ngOnInit(): void {
    this.loadTomorrowAppointments();
  }

  loadTomorrowAppointments(): void {
    const doctorId: string = this.tokenService.getUserId();
    const tomorrowStr = this.tomorrowDate.toISOString().split('T')[0]; // Yarınki tarihi alır ve formatlar

    this.appointmentService.getDoctorAppointments(doctorId, this.pageIndex, this.pageSize).subscribe(response => {
      // Filtreleme işlemi
      this.appointments = response.items.filter((appointment) => {
        const appointmentDate = new Date(appointment.date);
        const appointmentDateStr = appointmentDate.toISOString().split('T')[0];
        // Tarih kontrolü
        return appointmentDateStr === tomorrowStr;
      });
    }, responseError => {
      console.log(responseError.error.detail);
    });
  }
}
