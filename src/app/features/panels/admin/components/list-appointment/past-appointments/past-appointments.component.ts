import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../../../../appointments/services/appointment.service';
import { DoctorService } from '../../../../../doctors/services/doctor.service';
import { Appointment } from '../../../../../appointments/models/appointmentModel';
import { Doctor } from '../../../../../doctors/models/doctor';
import { ResponseModel } from '../../../../../models/responseModel';
import { AdminSidebarComponent } from '../../sidebar/adminSidebar.component';
import { Router, RouterModule } from '@angular/router';
import { ReportService } from '../../../../../reports/services/report.service';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';

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
  pageIndex: number = 0;
  pageSize: number = 100;
  hasReportMap: { [key: number]: boolean } = {}; // hasReport bilgisini tutmak için nesne

  constructor(private appointmentService: AppointmentService, private doctorService: DoctorService,
    private reportService:ReportService,
    private router: Router,
     private toastrService :ToastrService) {}

  ngOnInit(): void {
    this.loadPastAppointments();
  }

  loadPastAppointments(): void {
    this.appointmentService.getAllAppointments(this.pageIndex, this.pageSize).subscribe(
      (response: ResponseModel<Appointment>) => {
        this.pastAppointments = response.items.filter(appointment => {
          const appointmentDate = new Date(appointment.date);
          return appointmentDate < this.todayDate ||
            (appointmentDate.getTime() === this.todayDate.getTime() && appointment.time < this.todayDate.toTimeString().slice(0, 5));
        });
           // hasReport bilgisini her randevu için kontrol et ve ata
           const appointmentObservables = this.pastAppointments.map(appointment => {
            return this.reportService.getByAppointmentId(appointment.id).toPromise().then(
              response => {
                this.hasReportMap[appointment.id] = true;
              },
              error => {
                this.hasReportMap[appointment.id] = false;
              }
            );
          });

          // Tüm observables tamamlandığında appointments listesini güncelle
          Promise.all(appointmentObservables).then(() => {
            this.pastAppointments = this.pastAppointments;
          });
      },
      (error) => {
        console.error('Randevular alınamadı:', error);
        this.errorMessage = error.message;
      }
    );
  }

  confirmDelete(appointmentId: number): void {
    if (confirm('Randevuyu silmek istediğinize emin misiniz?')) {
      this.deleteAppointment(appointmentId);
    }
  }

  deleteAppointment(appointmentId: number): void {
    this.appointmentService.deleteAppointment(appointmentId).subscribe(
      () => {
        this.pastAppointments = this.pastAppointments.filter(appointment => appointment.id !== appointmentId);
      },
      (error) => {
        console.error('Randevu silinemedi:', error);
        this.errorMessage = error.message;
      }
    );
  }


//randevuya ait raporu görüntüle
  // public viewReport(appointmentId: number) {

  //     this.reportService.getByAppointmentId(appointmentId).subscribe(response=>{
  //       let reportId=response.id;

  //     },responseError=>{
  //       this.toastrService.error("Randevuya ait bir rapor bulunmamaktadır");
  //       console.log(responseError.error)
  //     });

  //   }



    public viewReport(appointmentId: number) {
      if (this.hasReportMap[appointmentId]) {
        this.reportService.getByAppointmentId(appointmentId).subscribe(response=>{
          let reportId=response.id;
          this.router.navigate(['admin-report-detail', reportId]);
        })

      } else {
        this.toastrService.warning("Rapor bulunmamaktadır.");
      }
    }

    public addReport(appointmentId: number) {
      if (this.hasReportMap[appointmentId]) {
        this.toastrService.warning("Zaten bir raporunuz var");
      } else {
        this.router.navigate(['/admin-add-report', appointmentId]);
      }
    }
}


