import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-doctor-sidebar',
  standalone: true,
  imports: [
    CommonModule,RouterModule
  ],
  templateUrl: './doctorSidebar.component.html',
  styleUrl: './doctorSidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoctorSidebarComponent { }
