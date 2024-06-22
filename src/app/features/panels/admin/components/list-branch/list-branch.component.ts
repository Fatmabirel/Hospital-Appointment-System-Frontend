import { CommonModule } from '@angular/common';
import {Component, OnInit } from '@angular/core';
import { Branch } from '../../../../branches/models/branch';
import { BranchService } from '../../../../branches/services/branch.service';
import { AdminSidebarComponent } from '../sidebar/adminSidebar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-branch',
  standalone: true,
  imports: [
    CommonModule,
    AdminSidebarComponent,
    RouterModule
  ],
  templateUrl: './list-branch.component.html',
  styleUrl: './list-branch.component.scss',
  
})
export class ListBranchComponent implements OnInit {
  branchs: Branch[] = [];
  pageIndex: number = 0;
  pageSize: number = 10;
  isLoading: boolean = true;

  constructor(private branchService:BranchService) {}

  ngOnInit(): void {
    this.getBranches();
  }

  getBranches() {
    this.branchService.getBranches(this.pageIndex, this.pageSize).subscribe((response) => {
      this.branchs = response.items;
    });   
  }

  deleteBranch(branchId:string) {
    this.branchService.deleteBranch(branchId).subscribe(
      (response) => {
        console.log('Branş başarıyla silindi:', response);
        this.getBranches(); //Branş yeniden yükleyerek güncellemeyi sağlıyoruz
      },
      (error) => {
        console.error('Branş silinemedi:', error);
      }
    );
  }
 }