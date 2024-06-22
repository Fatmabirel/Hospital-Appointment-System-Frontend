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
import { DoctorDashboardComponent } from './features/panels/doctor/components/doctor-dashboard/doctor-dashboard.component';


import { ListReportComponent  } from './features/panels/doctor/components/list-report/list-report.component';
import { EditReportComponent } from './features/panels/doctor/components/edit-report/edit-report.component';
import { AddReportComponent } from './features/panels/doctor/components/add-report/add-report.component';
import { ListDoctorComponent } from './features/panels/admin/components/list-doctor/list-doctor.component';
import { UpdateDoctorComponent } from './features/panels/admin/components/update-doctor/update-doctor.component';
import { AddDoctorComponent } from './features/panels/admin/components/add-doctor/add-doctor.component';
import { AdminListReportComponent } from './features/panels/admin/components/admin-list-report/admin-list-report.component';
import { AdminEditReportComponent } from './features/panels/admin/components/admin-edit-report/admin-edit-report.component';
import { StatisticsComponent } from './features/statistics/statistics.component';
import { ListFeedbackComponent } from './features/panels/admin/components/list-feedback/list-feedback.component';

import { DoctorSidebarPatientComponent } from './features/panels/doctor/components/doctorSidebar-Patient/doctorSidebar-Patient.component';
import { ListPatientComponent } from './features/panels/admin/components/list-patient/list-Patient.component';
import { AddPatientComponent } from './features/panels/admin/components/add-Patient/add-Patient.component';
import { UpdatePatientComponent } from './features/panels/admin/components/update-patient/update-patient.component';
import { UpdateFeedbackComponent } from './features/panels/admin/components/update-feedback/update-feedback.component';
import { DoctorListFeedbackComponent } from './features/panels/doctor/components/doctor-list-feedback/doctor-list-feedback.component';
import { DoctorAddFeedbackComponent } from './features/panels/doctor/components/doctor-add-feedback/doctor-add-feedback.component';
import { DoctorUpdateFeedbackComponent } from './features/panels/doctor/components/doctor-update-feedback/doctor-update-feedback.component';
import { ListBranchComponent } from './features/panels/admin/components/list-branch/list-branch.component';
import { AddBranchComponent } from './features/panels/admin/components/add-branch/add-branch.component';
import { UpdateBranchComponent } from './features/panels/admin/components/update-branch/update-branch.component';


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
      path: 'about',
      component: AboutComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'register',
      component: RegisterComponent
    },
    {
      path: 'doctor-sidebar',
      component: DoctorSidebarComponent
    },
    {
      path: 'doctor-dashboard',
      component: DoctorDashboardComponent
    },
    {
      path: 'doctor-profile',
      component: DoctorProfileComponent
    },
    {
      path: 'appointment-history',
      component: AppointmentHistoryComponent
    },
    {
      path: 'pending-appointments',
      component: PendingAppointmentComponent
    },

    {
      path: 'admin-sidebar',
      component: AdminSidebarComponent
    },

    {
      path: 'admin-list-doctor',
      component: ListDoctorComponent
    },

    {
      path: 'admin-update-doctor/:doctorId',
      component: UpdateDoctorComponent
    },
    {
      path: 'admin-add-doctor',
      component: AddDoctorComponent
    },

    {
      path: 'patient-sidebar',
      component: PatientSidebarComponent
    },
    {
      path: 'doctor-schedule', // Route belirtilen path ile eşleştiğinde
      component: CreateDoctorScheduleComponent, // İlgili componenti AppComponent'ten başlayarak
      // ilk karşılaştığı <router-outlet></router-outlet> etiketine yerleştirir.
    },
    {
      path: 'admin-reports',
      component: AdminListReportComponent
    },
    {
      path: 'admin-report-detail/:id',
      component: AdminEditReportComponent
    },//

    {
      path: 'doctor-reports',
      component: ListReportComponent //doktorun  kendine ait raporlar
    },

    {
      path: 'doctor-feedbacks',
      component: DoctorListFeedbackComponent 
    },
    {
      path: 'doctor-add-feedback',
      component: DoctorAddFeedbackComponent 
    },
    {
      path: 'doctor-update-feedback/:id',
      component: DoctorUpdateFeedbackComponent 
    },

    {
      path: 'report-detail/:id',
      component: EditReportComponent
    },// ReportDetailCompo //o an ki reportid ile yönlendirme yapıp detayını görme

    {
      path: 'add-report/:appointmentId',
      component: AddReportComponent
    },
    // ReportDetailCompo   //o anki randevunun id si ile yönlendirme yapıp randevu ekleme

      {
        path: 'admin-list-feedback',
        component: ListFeedbackComponent,
     },
      {
        path: 'admin-update-feedback/:feedbackId',
        component: UpdateFeedbackComponent,
       },
      
       {
           path: 'statistics',
          component: StatisticsComponent,
        },
        {
          path: 'doctor-patient',
         component: DoctorSidebarPatientComponent,
        },

  {
    path: 'admin-patient',
    component: ListPatientComponent,
  },
  {
    path: 'admin-add-patient',
    component: AddPatientComponent,
  },
  {
    path: 'admin-update-patient/:patientId',
    component: UpdatePatientComponent,
  },
  {
    path:'list-branch',
    component:ListBranchComponent
  },
  {
    path:'admin-add-branch',
    component:AddBranchComponent
  },
  {
    path:'admin-update-branch/:branchId',
    component:UpdateBranchComponent
  },

  ];










