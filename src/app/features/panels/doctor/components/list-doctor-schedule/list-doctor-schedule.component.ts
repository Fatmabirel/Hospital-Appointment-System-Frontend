import { Component, OnInit } from '@angular/core';
import { DoctorSchedule } from '../../../../doctorschedule/models/doctorschedule';
import { TokenService } from '../../../../../core/auth/services/token.service';
import { DrscheduleService } from '../../../../doctorschedule/services/drschedule.service';
import { DoctorSidebarComponent } from "../sidebar/doctorSidebar.component";
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-list-doctor-schedule',
    standalone: true,
    templateUrl: './list-doctor-schedule.component.html',
    styleUrl: './list-doctor-schedule.component.scss',
    imports: [DoctorSidebarComponent,CommonModule,RouterModule]
})
export class ListDoctorScheduleComponent implements OnInit {
  schedules: DoctorSchedule[]=[]
  pageIndex: number = 0;
  pageSize: number = 100;

  constructor(private tokenService:TokenService,
    private drScheduleService:DrscheduleService,
    private toastrService:ToastrService,
    private router:Router
  )
  {}
  ngOnInit(): void {
    this.getDoctorSchedule();
  }

  getDoctorSchedule()
  {
    let  doctorId = this.tokenService.getUserId().toString();
    this.drScheduleService.getDoctorSchedule(this.pageIndex,this.pageSize,doctorId).subscribe(response=>{
    this.schedules=response.items;

  })

  }


  deleteDoctorSchedule(id:number)
  {
        this.drScheduleService.deleteDoctorSchedule(id).subscribe(reponse=>{
             this.toastrService.success('Seçtiğiniz tarihe ait takvim çizelgeniz silindi','Başarılı');
             this.getDoctorSchedule();

        },error=>
        {
          this.toastrService.error(error,'Hata');
        })
  }


  goToRoute(scheduleId:number)
  {
    this.router.navigate(['doctorschedule', scheduleId]);
  }
}
