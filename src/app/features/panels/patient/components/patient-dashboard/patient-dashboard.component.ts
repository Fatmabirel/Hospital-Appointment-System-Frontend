import { Component } from '@angular/core';
import { PatientSidebarComponent } from '../sidebar/psidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [PatientSidebarComponent,FormsModule,CommonModule],
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.scss'
})
export class PatientDashboardComponent {
  activeTab: string = 'gecmis-randevularim'; // Başlangıçta geçmiş randevularım sekmesi aktif

  showTab(tabId: string) {
    this.activeTab = tabId;
  }
}
