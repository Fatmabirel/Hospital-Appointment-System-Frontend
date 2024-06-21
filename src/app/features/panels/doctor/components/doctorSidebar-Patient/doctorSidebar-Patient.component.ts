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
  paitents: Patient[] = [];
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
                  let patients: Patient = {
                    address: patientResponse.address,
                    id: patientResponse.id,
                    age: patientResponse.age,
                    dateOfBirth: patientResponse.dateOfBirth,
                    firstName: patientResponse.firstName,
                    lastName: patientResponse.lastName,
                    nationalIdentity: patientResponse.nationalIdentity,
                    phone: patientResponse.phone,
                    height:patientResponse.height,
                    weight:patientResponse.weight,
                    bloodGroup:patientResponse.bloodGroup,
                    email: patientResponse.email,
                    password:patientResponse.password,
                    appointmentDate: patientResponse.appointmentDate,
                    appointmentId: patientResponse.appointmentId,
                    appointmentRapor: patientResponse.appointmentRapor,
                    appointmentTime: patientResponse.appointmentTime,
                    

                  };
                  
                  // appointments.patientnationalIdentity = patientResponse.nationalIdentity;
                  // appointments.patientPhone = patientResponse.phone;
                  // appointments.patientdateOfBirth = patientResponse.dateOfBirth;
                  // appointments.patientFirstName = patientResponse.firstName;
                  // appointments.patientLastName = patientResponse.lastName;
                  // appointments.patientPhone = patientResponse.phone;
                  // appointments.patientAge=patientResponse.age;
                  this.paitents.push(patients);
                })
            }

            //this.appointments = response.items;
            //console.log('Randevular:', this.appointments);
          },
          (error) => {
            console.error('doktor bilgisi alınamadı:', error);
          }
        );
      },
      (error) => {
        console.error('hasta  bilgileri alınamadı:', error);
      }
    );
  }
 
}