import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DoctorSidebarComponent } from '../../panels/doctor/components/sidebar/doctorSidebar.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [RouterModule,DoctorSidebarComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {

}
