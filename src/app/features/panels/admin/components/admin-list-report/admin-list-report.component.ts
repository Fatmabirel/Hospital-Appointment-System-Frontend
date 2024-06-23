import { Component } from '@angular/core';
import { ResponseReport } from '../../../../reports/models/responseReport';
import { ReportService } from '../../../../reports/services/report.service';
import { Router } from '@angular/router';
import { AdminSidebarComponent } from "../sidebar/adminSidebar.component";
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-admin-list-report',
    standalone: true,
    templateUrl: './admin-list-report.component.html',
    styleUrl: './admin-list-report.component.scss',
    imports: [AdminSidebarComponent,CommonModule]
})
export class AdminListReportComponent {

  reports: ResponseReport[]=[]
  pageIndex: number = 0;
  pageSize: number = 100;

  constructor(private reportService:ReportService,
    private router: Router,private toastrService:ToastrService
  ){ }


  ngOnInit(): void {
   this.getListReports();
  }

  getListReports()
  {
     this.reportService.getList(this.pageIndex,this.pageSize).subscribe(response=>{
      this.reports=response.items;
      console.log(response);

    })
  }

  goToReport(reportId: number) { // reportId'nin tipi number olmalı
    this.router.navigate(['admin-report-detail',reportId]); // yönlendirme işlemi

  }

  delete(reportId:number)
  {
      this.reportService.deleteReport(reportId).subscribe(response=>{
        this.toastrService.success("Rapor silindi.");
        this.getListReports();
        this.router.navigate(['admin-reports']);

      },error=>
      {
        this.toastrService.error("Rapor silinirkekn bir hata oluştu");
        console.log(error);
      })
  }

}
