import { Component } from '@angular/core';
import { BasicLayoutComponent } from '../../shared/components/basic-layout/basic-layout.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [BasicLayoutComponent, RouterModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
