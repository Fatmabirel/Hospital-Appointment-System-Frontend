import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from '../../../../reports/services/report.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseReport } from '../../../../reports/models/responseReport';
import { UpdateRequestReport } from '../../../../reports/models/update-request-report';
import { AdminSidebarComponent } from "../sidebar/adminSidebar.component";
import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import { error } from 'console';

@Component({
    selector: 'app-admin-edit-report',
    standalone: true,
    templateUrl: './admin-edit-report.component.html',
    styleUrl: './admin-edit-report.component.scss',
    imports: [AdminSidebarComponent,FormsModule,ReactiveFormsModule]
})
export class AdminEditReportComponent implements OnInit{

  reportForm:FormGroup;
  responseReport:ResponseReport;

  reportId: number;


    constructor(private formsBuilder:FormBuilder,
    private reportService:ReportService,
    private activatedRoute:ActivatedRoute,
    private router: Router,
    private toastrService:ToastrService){

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["id"])
        {
          this.reportId = +params['id'];
          this.getReport(this.reportId);

        }
        else
        {

        }
    })
    this.createReportForm();

  }

  createReportForm(){
    this.reportForm=this.formsBuilder.group({
     name:["",Validators.required],
     tcNo:["",Validators.required],
     reportText:["",Validators.required]

    })
  }

  getReport(id:number)
  {
    this.reportService.getReportDetails(id).subscribe(response=>
      {
        this.responseReport=response;
        console.log(response);
        this.reportForm.patchValue({
          name: response.patientFirstName+" "+response.patientLastName,
          tcNo: response.patientIdentity,
          reportText: response.text
      });

     });

  }


  update() {
    if (this.reportForm.valid) {
      const updatedReport: UpdateRequestReport = {
        id: this.reportId,
        text: this.reportForm.value.reportText
        // Diğer güncelleme alanlarını ekleyin
      };

      this.reportService.updateReport(updatedReport).subscribe((response) => {

          this.toastrService.success('Rapor başarıyla güncellendi');
          this.router.navigate(['admin-sidebar']);
          console.log('Rapor başarıyla güncellendi',response);
        this.router.navigate(['/admin-reports']); // Güncelleme sonrası yönlendirme
      },  (error) => {
        console.error('Güncelleme sırasında hata oluştu:', error);
      }
    );

    }
    else {
      // Form geçerli değilse hata mesajı gösterilebilir
      this.toastrService.error('Lütfen eksik alanları doldurun.');
    }
  }



}


