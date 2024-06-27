import { Component } from '@angular/core';
import { ResponseReport } from '../../../../reports/models/responseReport';
import { ReportService } from '../../../../reports/services/report.service';
import { TokenService } from '../../../../../core/auth/services/token.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PatientSidebarComponent } from '../sidebar/psidebar.component';

@Component({
  selector: 'app-patient-list-report',
  standalone: true,
  imports: [CommonModule,PatientSidebarComponent,RouterModule],
  templateUrl: './patient-list-report.component.html',
  styleUrl: './patient-list-report.component.scss'
})
export class PatientListReportComponent {
  reports: ResponseReport[]=[]
  pageIndex: number = 0;
  pageSize: number = 10;

  constructor(private reportService:ReportService,
    private tokenService:TokenService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getPatientReports();
  }
  
  getPatientReports()
  {
    const patientId = this.tokenService.getUserId().toString();
    this.reportService.getPatientReports(this.pageIndex,this.pageSize,patientId).subscribe(response=>{
    this.reports=response.items;
  }
   )}
}
