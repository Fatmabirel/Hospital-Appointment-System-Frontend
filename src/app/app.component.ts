import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { DoctorListComponent } from './features/doctors/components/doctor-list/doctor-list.component';
import { ContactComponent } from './features/contact/contact.component';
import { BranchListComponent } from "./features/branches/components/branch-list/branch-list.component"; //silincek
import { SliderComponent } from "./shared/components/slider/slider.component"; //silincek
import { HomePageComponent } from './routes/home-page/home-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, FooterComponent, NavbarComponent, DoctorListComponent, ContactComponent, BranchListComponent,  HomePageComponent]
})
export class AppComponent {
  title = 'hospital';
}
