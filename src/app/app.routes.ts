import { Routes } from '@angular/router';

import { HomePageComponent } from './routes/home-page/home-page.component';
import { BranchListComponent } from './features/branches/components/branch-list/branch-list.component';
import { DoctorListComponent } from './features/doctors/components/doctor-list/doctor-list.component';
import { ContactComponent } from './features/contact/contact.component';

export const routes: Routes =
 [
    {
        path: '', // Route belirtilen path ile eşleştiğinde
        component: HomePageComponent, // İlgili componenti AppComponent'ten başlayarak
        // ilk karşılaştığı <router-outlet></router-outlet> etiketine yerleştirir.
      },

      {
        path: 'branches', // Route belirtilen path ile eşleştiğinde
        component: BranchListComponent, // İlgili componenti AppComponent'ten başlayarak
        // ilk karşılaştığı <router-outlet></router-outlet> etiketine yerleştirir.
      },
      {
        path: 'doctors', 
        component: DoctorListComponent, 
      },
      {
        path: 'contact', 
        component: ContactComponent, 
      },
];


