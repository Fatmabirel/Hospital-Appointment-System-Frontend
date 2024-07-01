import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PatientSidebarComponent } from '../sidebar/psidebar.component';
import { Appointment } from '../../../../appointments/models/appointmentModel';
import { AppointmentService } from '../../../../appointments/services/appointment.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PatientService } from '../../../../Patients/patient.service';
import { ResponseModel } from '../../../../models/responseModel';
import { ReportService } from '../../../../reports/services/report.service';

@Component({
  selector: 'app-patient-list-past-appointment',
  standalone: true,
  imports: [CommonModule, PatientSidebarComponent],
  templateUrl: './patient-list-past-appointment.component.html',
  styleUrl: './patient-list-past-appointment.component.scss',
})
export class PatientListPastAppointmentComponent {
  appointments: Appointment[] = [];
  hasReportMap: { [key: number]: boolean } = {}; // hasReport bilgisini tutmak için nesne
  pageIndex: number = 0;
  pageSize: number = 100;
  todayDate: Date = new Date(); // Bugünkü tarihi al

  constructor(
    private patientService: PatientService,
    private appointmentService: AppointmentService,
    private reportService:ReportService,
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
        console.log(patientId);
        this.appointmentService
          .getPatientAppointments(patientId, this.pageIndex, this.pageSize)
          .subscribe(
            (response: ResponseModel<Appointment>) => {
              this.appointments = response.items.filter((appointment) => {
                const appointmentDate = new Date(appointment.date);
                return (
                  appointmentDate < this.todayDate ||
                  (appointmentDate.getTime() === this.todayDate.getTime() &&
                    appointment.time <=
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

  public viewReport(appointmentId: number) {
    console.log(appointmentId);
      this.reportService.getByAppointmentId(appointmentId).subscribe(response=>{
        let reportId=response.id;
        console.log(reportId);
        this.router.navigate(['patient-report-detail', reportId]);
      })
  }
}
