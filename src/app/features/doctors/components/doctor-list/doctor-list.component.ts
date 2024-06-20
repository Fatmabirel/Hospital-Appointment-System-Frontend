import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../models/doctor';
import { BasicLayoutComponent } from '../../../../shared/components/basic-layout/basic-layout.component';
@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [CommonModule,BasicLayoutComponent],
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.scss'
})
export class DoctorListComponent implements OnInit {

  doctors: Doctor[] = [];
  pageIndex: number = 0;
  pageSize: number = 10;
  isLoading: boolean = true;

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.getDoctors();
  }

  getDoctors() {
    this.doctorService.getDoctors(this.pageIndex, this.pageSize).subscribe((response) => {
      this.doctors = response.items;
    });
  }
 
}
