import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BasicLayoutComponent } from '../../shared/components/basic-layout/basic-layout.component';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    //CommonModule,
   BasicLayoutComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent { }
