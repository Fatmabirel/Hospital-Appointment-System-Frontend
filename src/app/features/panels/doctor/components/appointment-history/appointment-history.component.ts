import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Appointment } from '../../../../appointments/models/appointmentModel';
import { DoctorService } from '../../../../doctors/services/doctor.service';
import { ResponseModel } from '../../../../models/responseModel';
import { AppointmentService } from '../../../../appointments/services/appointment.service';
import { DoctorSidebarComponent } from '../sidebar/doctorSidebar.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ReportService } from '../../../../reports/services/report.service';
import { CapitalizeFirstPipe } from '../../../../pipe/capitalize-first.pipe';
import { FormsModule } from '@angular/forms';
import { FilterAppointmentIdentityPipe } from '../../../../pipe/filter-appointment-identity.pipe';

@Component({
  selector: 'app-appointment-history',
  standalone: true,
  imports: [
    CommonModule,
    DoctorSidebarComponent,
    CapitalizeFirstPipe,
    FormsModule,
    FilterAppointmentIdentityPipe,
  ],
  templateUrl: './appointment-history.component.html',
  styleUrls: ['./appointment-history.component.scss'],
})
export class AppointmentHistoryComponent implements OnInit {
  appointments: Appointment[] = [];
  hasReportMap: { [key: number]: boolean } = {}; // hasReport bilgisini tutmak için nesne
  pageIndex: number = 0;
  pageSize: number = 12;
  todayDate: Date = new Date();
  filterText:string = "";

  constructor(
    private doctorService: DoctorService,
    private appointmentService: AppointmentService,
    private reportService: ReportService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDoctorAppointments();
  }

  sortAppointments(): void {
    this.appointments.sort((a, b) => {
      const dateA = new Date(a.date + ' ' + a.time);
      const dateB = new Date(b.date + ' ' + b.time);
      return dateB.getTime() - dateA.getTime(); // Artan sırayla sıralama
    });
  }
  

  loadDoctorAppointments(): void {
    this.doctorService.getDoctorProfile().subscribe(
      (doctor) => {
        const doctorId = doctor.id.toString();

        this.appointmentService
          .getDoctorAppointments(doctorId, this.pageIndex, this.pageSize)
          .subscribe(
            (response: ResponseModel<Appointment>) => {
              console.log(response);
              const filteredAppointments = response.items.filter(
                (appointment) => {
                  const appointmentDate = new Date(appointment.date);
                  return (
                    appointmentDate < this.todayDate ||
                    (appointmentDate.getTime() === this.todayDate.getTime() &&
                      appointment.time <
                        this.todayDate.toTimeString().slice(0, 5))
                  );
                }
              );

              // hasReport bilgisini her randevu için kontrol et ve ata
              const appointmentObservables = filteredAppointments.map(
                (appointment) => {
                  return this.reportService
                    .getByAppointmentId(appointment.id)
                    .toPromise()
                    .then(
                      (response) => {
                        this.hasReportMap[appointment.id] = true;
                      },
                      (error) => {
                        this.hasReportMap[appointment.id] = false;
                      }
                    );
                }
              );

              // Tüm observables tamamlandığında appointments listesini güncelle
              Promise.all(appointmentObservables).then(() => {
                this.appointments = filteredAppointments;
                this.sortAppointments();
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

  public viewReport(appointmentId: number) {
    if (this.hasReportMap[appointmentId]) {
      this.reportService
        .getByAppointmentId(appointmentId)
        .subscribe((response) => {
          let reportId = response.id;
          this.router.navigate(['report-detail', reportId]);
        });
    } else {
      this.toastrService.warning('Rapor bulunmamaktadır.');
    }
  }

  public addReport(appointmentId: number) {
    if (this.hasReportMap[appointmentId]) {
      this.toastrService.warning('Zaten bir raporunuz var');
    } else {
      this.router.navigate(['/add-report', appointmentId]);
    }
  }
}
