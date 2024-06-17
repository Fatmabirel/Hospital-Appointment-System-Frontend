import { Routes } from '@angular/router';
import { HomePageComponent } from './routes/home-page/home-page.component';
import { BranchListComponent } from './features/branches/components/branch-list/branch-list.component';
import { DoctorListComponent } from './features/doctors/components/doctor-list/doctor-list.component';
import { ContactComponent } from './features/contact/contact.component';
import { AboutComponent } from './features/about/about.component';
import { LoginComponent } from './routes/auth/login/login.component';
import { RegisterComponent } from './routes/auth/register/register.component';
import { DoctorSidebarComponent } from './features/panels/doctor/components/sidebar/doctorSidebar.component';
import { PatientSidebarComponent } from './features/panels/patient/components/sidebar/psidebar.component';
import { AdminSidebarComponent } from './features/panels/admin/components/sidebar/adminSidebar.component';
import { AppointmentHistoryComponent } from './features/panels/doctor/components/appointment-history/appointment-history.component';
import { PendingAppointmentComponent } from './features/panels/doctor/components/pending-appointment/pending-appointment.component';
import { DoctorProfileComponent } from './features/panels/doctor/components/doctor-profile/doctor-profile.component';
import { CreateDoctorScheduleComponent } from './features/panels/doctor/components/create-doctor-schedule/create-doctor-schedule.component';

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
        component:DoctorSidebarComponent
      },
      {
        path:'doctor-profile',
        component:DoctorProfileComponent
      },
      {
        path:'appointment-history',
        component:AppointmentHistoryComponent
      },
      {
        path:'pending-appointments',
        component:PendingAppointmentComponent
      },

      {
        path:'admin-sidebar',
        component:AdminSidebarComponent
      },

      {
        path:'patient-sidebar',
        component:PatientSidebarComponent
      },
      {
        path: 'drschedule', // Route belirtilen path ile eşleştiğinde
        component: CreateDoctorScheduleComponent, // İlgili componenti AppComponent'ten başlayarak
        // ilk karşılaştığı <router-outlet></router-outlet> etiketine yerleştirir.
     },

];


