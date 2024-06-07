import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-hp-body',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './hp_body.component.html',
  styleUrl: './hp_body.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HpBodyComponent { }
