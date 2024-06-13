import { Routes } from '@angular/router';
import { HomePageComponent } from './routes/home-page/home-page.component';
import { BranchListComponent } from './features/branches/components/branch-list/branch-list.component';
import { DoctorListComponent } from './features/doctors/components/doctor-list/doctor-list.component';
import { ContactComponent } from './features/contact/contact.component';
import { AboutComponent } from './features/about/about.component';
import { LoginComponent } from './routes/auth/login/login.component';
import { RegisterComponent } from './routes/auth/register/register.component';
import { loginGuard } from './core/auth/guards/login.guard';
import { DoctorSidebarComponent } from './features/panels/doctor/components/sidebar/doctorSidebar.component';
import { PatientSidebarComponent } from './features/panels/patient/components/sidebar/psidebar.component';
import { AdminSidebarComponent } from './features/panels/admin/components/sidebar/adminSidebar.component';
import { AppointmentHistoryComponent } from './features/panels/doctor/components/appointment-history/appointment-history.component';

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
        // canActivate:[loginGuard] örnek guard bu şekilde yazılıcak
      },
      {
        path: 'doctors',
        component: DoctorListComponent,

      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path:'about',
        component:AboutComponent
      },
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'register',
        component:RegisterComponent
      },
      {
        path:'doctor-sidebar',
        path:'doctor-sidebar',
        component:DoctorSidebarComponent
      },
      {
        path:'appointment-history',
        component:AppointmentHistoryComponent
      },

      {
        path:'admin-sidebar',
        component:AdminSidebarComponent
      },
      
      {
        path:'patient-sidebar',
        component:PatientSidebarComponent
      }

];


