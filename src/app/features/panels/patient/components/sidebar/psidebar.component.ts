import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-psidebar',
  standalone: true,
  imports: [
    CommonModule,RouterModule
  ],
  templateUrl: './psidebar.component.html',
  styleUrl: './psidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientSidebarComponent { }
