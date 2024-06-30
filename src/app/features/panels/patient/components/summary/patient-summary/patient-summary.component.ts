import { Component } from '@angular/core';
import { PatientSidebarComponent } from "../../sidebar/psidebar.component";
import { PatientTodayAppointmentComponent } from "../patient-today-appointment/patient-today-appointment.component";
import { FutureAppointmentComponent } from "../future-appointment/future-appointment.component";
import { PatientReportsComponent } from "../patient-reports/patient-reports.component";
import { FeedbackComponent } from "../feedback/feedback.component";

@Component({
    selector: 'app-patient-summary',
    standalone: true,
    templateUrl: './patient-summary.component.html',
    styleUrl: './patient-summary.component.scss',
    imports: [PatientSidebarComponent, PatientTodayAppointmentComponent, FutureAppointmentComponent, PatientReportsComponent, FeedbackComponent]
})
export class PatientSummaryComponent {

}
