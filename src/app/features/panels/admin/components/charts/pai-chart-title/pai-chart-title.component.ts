import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../../../doctors/services/doctor.service';
import { LegendPosition, NgxChartsModule, ColorHelper } from '@swimlane/ngx-charts';
import { AdminSidebarComponent } from "../../sidebar/adminSidebar.component";

@Component({
  selector: 'app-pai-chart-title',
  standalone: true,
  templateUrl: './pai-chart-title.component.html',
  styleUrls: ['./pai-chart-title.component.scss'],
  imports: [NgxChartsModule, AdminSidebarComponent]
})
export class PaiChartTitleComponent implements OnInit {

  single: any[] = []; // ngx-charts için hazırlanmış veri dizisi
  view: [number, number] = [600, 300];
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Right;
  legendTitle:string="Ünvan";
  doughnut:boolean=true;
  constructor(private doctorService: DoctorService) {

  }


  colorScheme: any = {
    domain: this.generateColors()
  };

  generateColors(): string[] {
    // Burada renklerin dinamik olarak üretilmesi sağlanabilir
    return [
      '#1E90FF',
      '#5733FF', // Electric Indigo
      '#FF5733', // Red
      '#57FF33', // Neon Green
      '#FF33F6'  ,// Fuchsia
      '#3357FF', // Blue
      '#FFA500',
      '#FF4500',
      '#AAAAAA',
      '#FF5733', // Vibrant Red-Orange
      '#33FF57', // Bright Green
      '#3357FF', // Vivid Blue
      '#FF33A5', // Bright Pink
      '#33FFF0', // Aqua
      '#FFBD33', // Warm Orange
      '#A533FF', // Purple
      '#FF5733', // Coral
      '#33A1FF', // Light Blue
      '#FF5733', // Tomato Red
      '#A5FF33', // Lime Green
      '#5733FF', // Indigo
      '#FFC733', // Yellow Orange
      '#FF33C7', // Magenta
      '#33FFB5', // Mint Green

    ]
  }


  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.doctorService.getDoctors(0, 1000).subscribe(response => {
      // console.log('Raw Response:', response); // Raw response log

      // Group doctors by branchName
      const grouped: any = {};
      response.items.forEach(doctor => {
        const title = doctor.title;
        if (!grouped[title]) {
          grouped[title] = [];
        }
        grouped[title].push(doctor);
      });

      // console.log('Grouped Data:', grouped); // Grouped data log

      // Prepare data for ngx-charts pie chart
      this.single = Object.keys(grouped).map(titleName => ({
        name: titleName,
        value: grouped[titleName].length
      }));

      // console.log('Single Data:', this.single); // Single data log

      // Assign doctors for other processing if needed

    });
  }


  onSelect(event: any): void {
    console.log('Item clicked', event);
  }

  onActivate(event: any): void {
    console.log('Activate', event);
  }

  onDeactivate(event: any): void {
    console.log('Deactivate', event);
  }
}
