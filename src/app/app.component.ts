import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { DoctorListComponent } from './features/doctors/components/doctor-list/doctor-list.component';
import { ContactComponent } from './features/contact/contact.component';
import { HpBodyComponent } from './shared/components/hp_body/hp_body.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, FooterComponent, NavbarComponent,DoctorListComponent, ContactComponent, HpBodyComponent],
})
export class AppComponent {
  title = 'hospital';
}
