import { Component, OnInit } from '@angular/core';
import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import {FormBuilder, FormGroup, FormControl,Validators } from '@angular/forms';
import { DoctorSidebarComponent } from "../sidebar/doctorSidebar.component";
import { ReportService } from '../../services/report.service';

import { ResponseReport } from '../../models/responseReport';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-edit-report',
    standalone: true,
    templateUrl: './edit-report.component.html',
    styleUrl: './edit-report.component.scss',
    imports: [FormsModule, ReactiveFormsModule, DoctorSidebarComponent]
})
export class EditReportComponent implements OnInit{

  reportForm:FormGroup;
  report:ResponseReport;
   constructor(private formsBuilder:FormBuilder,private reportService:ReportService,private activatedRoute:ActivatedRoute){

  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["id"])
        {
          this.getReport(params["id"])
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
        this.report=response;
        console.log(response);
        this.reportForm.patchValue({
          name: response.patientFirstName+" "+response.patientLastName,
          tcNo: response.patientIdentity,
          reportText: response.text
      });

     });

  }
}
