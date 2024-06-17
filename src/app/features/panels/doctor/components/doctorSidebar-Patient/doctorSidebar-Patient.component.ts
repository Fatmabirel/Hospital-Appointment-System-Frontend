import { CommonModule} from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Patient } from '../../../../Patients/patientModel';
import { PatientService } from '../../../../Patients/patient.service';
import { RouterModule } from '@angular/router';
import { DoctorSidebarComponent } from '../sidebar/doctorSidebar.component';
import { DoctorService } from '../../../../doctors/services/doctor.service'; 
import { AppointmentService } from '../../../../appointments/services/appointment.service'; 
import { ResponseModel } from '../../../../models/responseModel';
import { Appointment } from '../../../../appointments/models/appointmentModel';


@Component({
  selector: 'app-doctor-sidebar-patient',
  standalone: true,
  imports: [
    CommonModule,RouterModule,DoctorSidebarComponent
  ],
  templateUrl: './doctorSidebar-Patient.component.html',
  styleUrl: './doctorSidebar-Patient.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DoctorSidebarPatientComponent implements OnInit {
  appointments: Appointment[] = [];
  pageIndex: number = 0;
  pageSize: number = 12;

  constructor(private doctorService: DoctorService, private appointmentService: AppointmentService, private patientService: PatientService) {}

  ngOnInit(): void {
    this.loadDoctorPatients();
  }

  loadDoctorPatients(): void {
    this.doctorService.getDoctorProfile().subscribe(
      (doctor) => {
        const doctorId = doctor.id.toString(); 
        //console.log('id:', doctorId);
        this.appointmentService.getDoctorAppointments(doctorId, this.pageIndex, this.pageSize).subscribe(
          (response: ResponseModel<Appointment>) => {

            for (let index = 0; index < response.items.length; index++) {
              const appointment = response.items[index];
              this.patientService.getByPatientId(appointment.patientID,0,1).subscribe(
                (patientResponse: Patient) => {
                  let appointments: Appointment = {
                    patientID: appointment.patientID
                  };
                  
                  appointments.patientnationalIdentity = patientResponse.nationalIdentity;
                  appointments.patientPhone = patientResponse.phone;
                  appointments.patientdateOfBirth = patientResponse.dateOfBirth;
                  appointments.patientFirstName = patientResponse.firstName;
                  appointments.patientLastName = patientResponse.lastName;
                  appointments.patientPhone = patientResponse.phone;
                  appointments.patientAge=patientResponse.age;
                  this.appointments.push(appointments);
                })
            }

            //this.appointments = response.items;
            //console.log('Randevular:', this.appointments);
          },
          (error) => {
            console.error('Randevular alınamadı:', error);
          }
        );
      },
      (error) => {
        console.error('Doktor bilgileri alınamadı:', error);
      }
    );
  }
 
}