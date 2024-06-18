import { Component, OnInit } from '@angular/core';
import { DoctorSidebarComponent } from "../sidebar/doctorSidebar.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../services/report.service';
import { Report } from '../../models/report';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-update-report',
    standalone: true,
    templateUrl: './update-report.component.html',
    styleUrl: './update-report.component.scss',
    imports: [DoctorSidebarComponent,FormsModule,ReactiveFormsModule]
})
export class UpdateReportComponent implements OnInit {

  reportForm: FormGroup; // FormGroup tanımlıyoruz

  report:Report

  constructor(private reportService:ReportService,
    private formBuilder: FormBuilder, // FormBuilder kullanacağız
    private router: Router,
    private activatedRoute:ActivatedRoute,)
  {

  }
  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params=>{
      if(params["id"])
        {
          this.initForm();
          this.getReportDetail(params["id"])
        }
        else
        {

        }
    })

  }



  initForm() {
    // Formu başlatıyoruz, form alanlarını tanımlıyoruz ve validasyonları ekliyoruz
    this.reportForm = this.formBuilder.group({
      // id: [''], // ID alanı formda saklı olacak, ama HTML'de görünmeyecek
      // firstName: ['', Validators.required],
      // lastName: ['', Validators.required],
      // dateOfBirth: ['', Validators.required],
      // nationalIdentity: ['', Validators.required],
      text: ['', Validators.required],

    });
  }



  getReportDetail(reportId:number) {

    this.reportService.getReportDetails(reportId).subscribe(
      (data) => {
        this.report = data;
        // API'den gelen doktor bilgilerini form alanlarına set ediyoruz
        this.reportForm.patchValue(data);
        console.log(data);
      },
      (error) => {
        console.error('Doktor profili alınamadı:', error);
      }
    );
  }

  updateReport()
  {

  }
}
