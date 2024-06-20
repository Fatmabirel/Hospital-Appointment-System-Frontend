import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonEngine } from '@angular/ssr';
import { AdminSidebarComponent } from '../panels/admin/components/sidebar/adminSidebar.component';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports:[CommonModule,AdminSidebarComponent],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  userCount: number;
  activeUsers: number;
  pageViews: number;

  constructor() {
    // Örnek veriler
    this.userCount = 1000;
    this.activeUsers = 150;
    this.pageViews = 5000;
  }

  ngOnInit(): void {
    // İstatistikleri almak için API çağrıları burada yapılabilir
  }
}
