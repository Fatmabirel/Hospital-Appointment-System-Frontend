import { Component } from '@angular/core';
import { BasicLayoutComponent } from '../../shared/components/basic-layout/basic-layout.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {  faCalendar,faUserDoctor,faHospitalWide,faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import { SliderComponent } from "../../shared/components/slider/slider.component";



@Component({
    selector: 'app-home-page',
    standalone: true,
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
    imports: [BasicLayoutComponent, RouterModule, FontAwesomeModule, SliderComponent]
})
export class HomePageComponent {
icon=faCalendar;
icon2=faUserDoctor;
icon3=faClipboardCheck;
icon4=faHospitalWide;
}
