import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TokenService } from '../../../../../core/auth/services/token.service';
import { AdminService } from '../../../../admins/services/admin.service';
import { Admin } from '../../../../admins/models/admin';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './adminSidebar.component.html',
  styleUrl: './adminSidebar.component.scss',
})
export class AdminSidebarComponent implements OnInit {
  admin: Admin;
  adminName: string = '';

  constructor(private tokenService: TokenService,private adminService:AdminService) {}

  ngOnInit(): void {
   this.getAdminProfile();
  }

  getAdminProfile(){
    this.adminService.getAdminProfile().subscribe((admin) => {
      this.adminName = admin.firstName + ' ' + admin.lastName;
      return this.adminName;
    })
  }

}
