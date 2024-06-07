import { Routes } from '@angular/router';
import { HomePageComponent } from './routes/home-page/home-page/home-page.component';

export const routes: Routes = [{
    path: '', // Route belirtilen path ile eşleştiğinde
    component: HomePageComponent, // İlgili componenti AppComponent'ten başlayarak
    // ilk karşılaştığı <router-outlet></router-outlet> etiketine yerleştirir.
  },];
