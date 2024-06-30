import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../../../../core/auth/services/token.service';
import { AppointmentService } from '../../../../../appointments/services/appointment.service';
import { Appointment } from '../../../../../appointments/models/appointmentModel';
import { DoctorSidebarComponent } from "../../sidebar/doctorSidebar.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-today-appointment',
    standalone: true,
    templateUrl: './today-appointment.component.html',
    styleUrls: ['./today-appointment.component.scss'],
    imports: [DoctorSidebarComponent, CommonModule]
})
export class TodayAppointmentComponent implements OnInit {
    pageIndex: number = 0;
    pageSize: number = 100; // Eğer randevu sayısı çok fazla değilse yüksek bir değer kullanabilirsiniz.
    appointments: Appointment[] = [];
    todayDate: Date = new Date();

    constructor(private tokenService: TokenService,
                private appointmentService: AppointmentService) {}

    ngOnInit(): void {
        this.loadTodayAppointments();
    }

    loadTodayAppointments(): void {
        const doctorId: string = this.tokenService.getUserId();
        const todayStr = this.todayDate.toISOString().split('T')[0]; // Bugünkü tarihi alır ve formatlar

        this.appointmentService.getDoctorAppointments(doctorId, this.pageIndex, this.pageSize).subscribe(response => {
            // Filtreleme işlemi
            this.appointments = response.items.filter((appointment) => {
                const appointmentDate = new Date(appointment.date);
                const appointmentDateStr = appointmentDate.toISOString().split('T')[0];
                // Tarih kontrolü
                return appointmentDateStr === todayStr;
            });
        }, responseError => {
            console.log(responseError.error.detail);
        });
    }
}
