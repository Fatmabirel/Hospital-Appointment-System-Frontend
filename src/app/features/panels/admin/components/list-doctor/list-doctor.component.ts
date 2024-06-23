import { Component, OnInit } from '@angular/core';
import { AdminSidebarComponent } from '../sidebar/adminSidebar.component';
import { CommonModule } from '@angular/common';
import { DoctorService } from '../../../../doctors/services/doctor.service';
import { Doctor } from '../../../../doctors/models/doctor';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialogComponent } from '../../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { CapitalizeFirstPipe } from '../../../../pipe/capitalize-first.pipe';
import { FormsModule } from '@angular/forms';
import { FilterDoctorNamePipe } from '../../../../pipe/filter-doctor-name.pipe';
import { FilterDoctorBranchPipe } from '../../../../pipe/filter-doctor-branch.pipe';
import { BranchService } from '../../../../branches/services/branch.service';
import { Branch } from '../../../../branches/models/branch';

@Component({
  selector: 'app-list-doctor',
  standalone: true,
  imports: [
    AdminSidebarComponent,
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    CapitalizeFirstPipe,
    FilterDoctorNamePipe,
    FilterDoctorBranchPipe,
  ],

  templateUrl: './list-doctor.component.html',
  styleUrl: './list-doctor.component.scss',
})
export class ListDoctorComponent implements OnInit {
  doctors: Doctor[] = [];
  branches: Branch[] = [];
  pageIndex: number = 0;
  pageSize: number = 12;
  filterText: string = '';
  selectedBranch: any | null = null;

  constructor(
    private doctorService: DoctorService,
    private branchService:BranchService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getDoctors();
    this.getBranches();
  }

  getDoctors() {
    this.doctorService
      .getDoctors(this.pageIndex, this.pageSize)
      .subscribe((response) => {
        this.doctors = response.items;
      });
  }
  getBranches() {
    this.branchService
      .getBranches(this.pageIndex, this.pageSize)
      .subscribe((response) => {
        this.branches = response.items;
      });
  }

  confirmDelete(doctorId: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'ONAY',
        message: 'Bu doktoru silmek istediğinizden emin misiniz?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteDoctor(doctorId);
      }
    });
  }

  deleteDoctor(doctorId: string) {
    this.doctorService.deleteDoctor(doctorId).subscribe(
      (response) => {
        console.log('Doktor başarıyla silindi:', response);
        this.getDoctors(); // Doktorları yeniden yükleyerek güncellemeyi sağlıyoruz
      },
      (error) => {
        console.error('Doktor silinemedi:', error);
      }
    );
  }

  onBranchFilterChange(event: any) {
    const selectedBranch = event.target.value;
  }

}
