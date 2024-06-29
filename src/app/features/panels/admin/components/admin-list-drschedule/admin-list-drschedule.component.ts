import { Component, OnInit } from '@angular/core';
import { AdminSidebarComponent } from "../sidebar/adminSidebar.component";
import { CommonModule } from '@angular/common';
import { DoctorSchedule } from '../../../../doctorschedule/models/doctorschedule';
import { TokenService } from '../../../../../core/auth/services/token.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { DrscheduleService } from '../../../../doctorschedule/services/drschedule.service';

@Component({
    selector: 'app-admin-list-drschedule',
    standalone: true,
    templateUrl: './admin-list-drschedule.component.html',
    styleUrl: './admin-list-drschedule.component.scss',
    imports: [CommonModule, AdminSidebarComponent]
})
export class AdminListDrscheduleComponent implements OnInit {
  schedules: DoctorSchedule[]=[]
  pageIndex: number = 0;
  pageSize: number = 100;
  doctorId:string;

  constructor(private tokenService:TokenService,
    private drScheduleService:DrscheduleService,
    private toastrService:ToastrService,
    private router:Router,
    private route: ActivatedRoute,
  )
  {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['doctorId']) {
        this.doctorId = params['doctorId'];

      } else {
        // this.doctorId = "0";
      }
      this.getDoctorSchedule(params['doctorId']);
    });




  }

  getDoctorSchedule(doctorId:string)
  {

    this.drScheduleService.getDoctorSchedule(this.pageIndex,this.pageSize,doctorId).subscribe(response=>{
      console.log(response);
    this.schedules=response.items;

  })

  }


  deleteDoctorSchedule(id:number)
  {
        this.drScheduleService.deleteDoctorSchedule(id).subscribe(reponse=>{
             this.toastrService.success('Doktorun seçtiğiniz tarihe ait takvim çizelgesi silindi','Başarılı');
             this.getDoctorSchedule(this.doctorId);

        },

        responseError => {

          console.log(responseError);
          this.toastrService.error(responseError.error.Detail,'Hatalı İşlem');

        }
      )

  }


  goToRoute(doctorId:string,scheduleId:number)
  {
    this.router.navigate(['admin-edit-doctor-schedule', doctorId, scheduleId]);
  }



}
