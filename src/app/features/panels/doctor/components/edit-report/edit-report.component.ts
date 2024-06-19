import { Component, OnInit } from '@angular/core';
import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import {FormBuilder, FormGroup, FormControl,Validators } from '@angular/forms';
import { DoctorSidebarComponent } from "../sidebar/doctorSidebar.component";
import { ReportService } from '../../services/report.service';

import { ResponseReport } from '../../models/responseReport';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UpdateRequestReport } from '../../models/update-request-report';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-edit-report',
    standalone: true,
    templateUrl: './edit-report.component.html',
    styleUrl: './edit-report.component.scss',
    imports: [FormsModule, ReactiveFormsModule, DoctorSidebarComponent]
})
export class EditReportComponent implements OnInit{

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
     reportText:[""]

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

  // update()
  // {

  //   this.activatedRoute.params.subscribe(params=>{
  //     const reportId=params["id"];
  //     })

  //   if (this.reportForm.valid) { // Formun geçerli olup olmadığını kontrol ediyoruz
  //     const updatedReport: UpdateRequestReport = this.reportForm.value; // Form verilerini Doctor nesnesine atıyoruz
  //     updateReport.id = this.reportId;
  //     updateReport.text = this.doctor.branchID;
  //     console.log(updateReport);


  // }

  update() {
    if (this.reportForm.valid) {
      const updatedReport: UpdateRequestReport = {
        id: this.reportId,
        text: this.reportForm.value.reportText
        // Diğer güncelleme alanlarını ekleyin
      };

      this.reportService.updateReport(updatedReport).subscribe((response) => {

          this.toastrService.success('Bilgileriniz başarıyla güncellendi');
          this.router.navigate(['doctor-sidebar']);
          console.log('Rapor başarıyla güncellendi',response);
        this.router.navigate(['/reports']); // Güncelleme sonrası yönlendirme
      },  (error) => {
        console.error('Güncelleme sırasında hata oluştu:', error);
      }
    );

    }
    else {
      // Form geçerli değilse hata mesajı gösterilebilir
      this.toastrService.error('Lütfen eksik alanları doldurun');
    }
  }

}

