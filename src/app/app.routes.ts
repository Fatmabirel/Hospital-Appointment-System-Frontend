import { Routes } from '@angular/router';
import { HomePageComponent } from './routes/home-page/home-page/home-page.component';
import { AboutComponent } from './features/about/about.component';


export const routes: Routes = [
 {

    path: '', // Route belirtilen path ile eşleştiğinde
    component: HomePageComponent, // İlgili
  },
  {
    path:'about',
    component: AboutComponent
  },



];



