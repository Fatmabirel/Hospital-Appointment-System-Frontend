import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../../../../appointments/services/appointment.service';
import { DoctorService } from '../../../../doctors/services/doctor.service';
import { PatientService } from '../../../../Patients/patient.service';
import { BranchService } from '../../../../branches/services/branch.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from '../../../admin/components/sidebar/adminSidebar.component';
import { Appointment } from '../../../../appointments/models/appointmentModel';
import { Branch } from '../../../../branches/models/branch';
import { Doctor } from '../../../../doctors/models/doctor';
import { Patient } from '../../../../Patients/patientModel';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss'],
  standalone: true,
  imports: [
    AdminSidebarComponent,
    ReactiveFormsModule,
    CommonModule,
    FormsModule]
})
export class AddAppointmentComponent implements OnInit {
  branches: Branch[] = [];
  doctors: Doctor[] = [];
  patients: Patient[] = [];
  appointmentForm: FormGroup;
  appointment: Appointment;
  /*   pageIndex: number = 0;
    pageSize: number = 50;
    selectedBranchId: string = '';
    selectedDoctorId: string = ''; */

  constructor(
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private branchService: BranchService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.appointmentForm = this.formBuilder.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      patientId: ['', Validators.required],
      /*       patientFirstName: ['', Validators.required],
            patientLastName: ['', Validators.required], */
      branchId: ['', Validators.required],
      doctorId: ['', Validators.required],
      command: [''],
      status: [true, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getBranches();
    this.getPatients();
    this.setMinDateAndTime();
    /* this.getDoctors(); */
  }

  getBranches(): void {
    this.branchService.getBranches(0, 100).subscribe(
      (response) => {
        this.branches = response.items;

      },
      (error) => {
        console.error('Error fetching branches:', error);
      }
    );
  }

  getPatients() {
    this.patientService.getPatients(0, 100).subscribe(
      response => {
        this.patients = response.items;
      },
      (error) => {
        console.error('Hastalar Alınamadı:', error);
      }
    );
  }

  onBranchChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const branchId = selectElement.value;
    this.appointmentForm.patchValue({ branchId });
    this.doctorService.getDoctors(0, 100).subscribe(
      (response) => {
        this.doctors = response.items.filter(doctor => doctor.branchID === Number(branchId));
      },
      (error) => {
        console.error('Doktorlar yüklenemedi:', error);
      }
    );
  }

  /*   getDoctors() {
      this.doctorService.getDoctors(0, 100).subscribe(
        (response) => {
          this.doctors = response.items;
        },
        (error) => {
          console.error('Doktorlar yüklenemedi:', error);
        }
      );
    } */

  /* addAppointment(): void {
    if (this.appointmentForm.valid) {
      const selectedDoctorId = this.appointmentForm.get('doctorId')?.value;
      const appointmentData = this.appointmentForm.value;
      appointmentData.doctorId = selectedDoctorId;

      this.appointmentService.addAppointment(this.appointmentForm.value).subscribe(
        (response) => {
          this.toastrService.success('Randevu başarıyla oluşturuldu');
          this.router.navigate(['/admin-list-appointments']);
        },
        (error) => {
          console.error('Error adding appointment:', error);
          this.toastrService.error('Randevu oluşturulamadı');
        }
      );
    } else {
      console.error('Error adding appointment:', this.appointmentForm.value);
      this.toastrService.error('Eksik alanları doldurunuz.');
    }
  } */

  private formatTime(time: string): string {
    const date = new Date(`1970-01-01T${time}Z`);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  setMinDateAndTime(): void {
    const today = new Date();
    const minDate = today.toISOString().split('T')[0];
    const hours = today.getHours().toString().padStart(2, '0');
    const minutes = today.getMinutes().toString().padStart(2, '0');
    const minTime = `${hours}:${minutes}`;

    (document.getElementById('date') as HTMLInputElement).setAttribute('min', minDate);
    (document.getElementById('time') as HTMLInputElement).setAttribute('min', minTime);
  }



  addAppointment(): void {
    if (this.appointmentForm.valid) {
      const appointmentData = this.appointmentForm.value;
      const isValid = this.validateDateTime(appointmentData.date, appointmentData.time);

      if (!isValid) {
        this.toastrService.error('Geçmiş tarih veya saate randevu oluşturulamaz.');
        return;
      }

      appointmentData.time = this.formatTime(appointmentData.time);
      this.appointmentService.addAppointment(appointmentData).subscribe(
        (response) => {
          this.toastrService.success('Randevu başarıyla oluşturuldu');
          this.router.navigate(['/upcoming-appointments']);
        },
        (error) => {
          console.error('Error adding appointment:', error);
          if (error.status === 400) {
            const validationErrors = error.error.errors;
            for (const field in validationErrors) {
              if (validationErrors.hasOwnProperty(field)) {
                this.toastrService.error(`${field}: ${validationErrors[field]}`);
              }
            }
          } else {
            this.toastrService.error('Randevu oluşturulamadı');
          }
        }
      );
    } else {
      console.error('Error adding appointment:', this.appointmentForm.value);
      this.toastrService.error('Eksik alanları doldurunuz.');
    }
  }

  validateDateTime(date: string, time: string): boolean {
    const selectedDate = new Date(`${date}T${time}`);
    const currentDate = new Date();
    return selectedDate >= currentDate;
  }


}
