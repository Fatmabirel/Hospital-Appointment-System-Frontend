import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-basic-layout',
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    NavbarComponent,
  ],
  templateUrl: './basic-layout.component.html',
  styleUrl: './basic-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicLayoutComponent { }
