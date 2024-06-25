import { CommonModule } from '@angular/common';
import {Component, OnInit } from '@angular/core';
import { Branch } from '../../../../branches/models/branch';
import { BranchService } from '../../../../branches/services/branch.service';
import { AdminSidebarComponent } from '../sidebar/adminSidebar.component';
import { RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from '../../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PaginationComponent } from '../../../../../core/paging/components/pagination/pagination.component';

@Component({
  selector: 'app-list-branch',
  standalone: true,
  imports: [
    CommonModule,
    AdminSidebarComponent,
    RouterModule,
    PaginationComponent
  ],
  templateUrl: './list-branch.component.html',
  styleUrl: './list-branch.component.scss',
  
})
export class ListBranchComponent implements OnInit {
  branches: Branch[] = [];
  pageIndex: number = 0;
  pageSize:number = 5;
  totalPages: number = 0;
  hasNext: boolean = false;

  constructor(private branchService: BranchService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getBranches();
  }

  onPageChanged(newPageIndex: number) {
    this.pageIndex = newPageIndex;
    console.log(this.pageIndex);
    this.getBranches();
  }


  getBranches() {
    this.branchService.getBranches(this.pageIndex, this.pageSize).subscribe(
      (response) => {
        this.branches = response.items;
        this.totalPages = response.pages;
        this.hasNext = response.hasNext;
      },
      (error) => {
        console.error('Branşlar getirilirken hata oluştu:', error);
      }
    );
  }

  deleteBranch(branchId: string) {
    this.branchService.deleteBranch(branchId).subscribe(
      (response) => {
        console.log('Branş başarıyla silindi:', response);
        this.getBranches();
      },
      (error) => {
        console.error('Branş silinemedi:', error);
      }
    );
  }

  confirmDelete(branchId: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { title: 'ONAY', message: 'Bu branşı silmek istediğinizden emin misiniz?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteBranch(branchId);
      }
    });
  }
 }
