import { Component, OnInit } from '@angular/core';
import { DoctorSidebarComponent } from "../sidebar/doctorSidebar.component";
import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import {FormBuilder, FormGroup, FormControl,Validators } from '@angular/forms';
import { AddReport } from '../../../../reports/models/addReport';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from '../../../../reports/services/report.service';

@Component({
    selector: 'app-add-report',
    standalone: true,
    templateUrl: './add-report.component.html',
    styleUrl: './add-report.component.scss',
    imports: [DoctorSidebarComponent,FormsModule,ReactiveFormsModule]
})
export class AddReportComponent implements OnInit{
reportForm: FormGroup;
appointmentId:number;



constructor(private formsBuilder:FormBuilder,
  private toastrService:ToastrService,
  private router: Router,
  private reportService:ReportService,
  private activatedRoute:ActivatedRoute
)
{}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["appointmentId"])
        {
          this.appointmentId = +params['appointmentId'];


        }
        else
        {

        }
    })
    this.createReportForm();
  }

createReportForm(){
  this.reportForm=this.formsBuilder.group({

   reportText:["",Validators.required]

  })
}


add() {
  if (this.reportForm.valid) {
    const addReport: AddReport = {
      appointmentID: this.appointmentId,
      text: this.reportForm.value.reportText
      // Diğer güncelleme alanlarını ekleyin
    };

    this.reportService.addReport(addReport).subscribe((response) => {

        // this.toastrService.success('Bilgileriniz başarıyla eklendi');
        // this.router.navigate(['doctor-sidebar']);
        console.log('Rapor başarıyla eklendi',response);
        this.toastrService.success("Rapor eklendi");
      this.router.navigate(['/doctor-reports']); // Güncelleme sonrası yönlendirme

        },  responseError => {

          console.log(responseError);
          this.toastrService.error(responseError.error.Detail,'Hatalı İşlem');

        }
  );

  }
  else {
    // Form geçerli değilse hata mesajı gösterilebilir
    this.toastrService.error('Lütfen eksik alanları doldurun');
  }
}
}
