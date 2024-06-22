import { Component } from '@angular/core';
import { DoctorSidebarComponent } from '../sidebar/doctorSidebar.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Feedback } from '../../../../feedbacks/models/feedback';
import { FeedbackService } from '../../../../feedbacks/services/feedback.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DoctorService } from '../../../../doctors/services/doctor.service';
import { Doctor } from '../../../../doctors/models/doctor';

@Component({
  selector: 'app-doctor-add-feedback',
  standalone: true,
  imports: [DoctorSidebarComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './doctor-add-feedback.component.html',
  styleUrl: './doctor-add-feedback.component.scss'
})
export class DoctorAddFeedbackComponent {
  doctor: Doctor;
  userID: string;
  feedbacks: Feedback[] = [];
  pageIndex: number = 0;
  pageSize: number = 50;
  feedbackForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private feedbackService: FeedbackService,
    private doctorService: DoctorService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.feedbackForm = this.formBuilder.group({
      userID: ['', Validators.required],
      text: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.doctorService.getDoctorProfile().subscribe((doctor) => {
      this.doctor = doctor;
      this.userID = doctor.id;
      // Assign the userID value to the form control
      this.feedbackForm.patchValue({
        userID: this.userID
      });
      console.log(this.userID);
    });
  }

  addFeedback(): void {
    if (this.feedbackForm.valid) {
      this.feedbackService.addFeedback(this.feedbackForm.value).subscribe(
        (response) => {
          this.toastrService.success('Geri bildirim başarıyla eklendi');
          this.router.navigate(['/doctor-feedbacks']);
        },
        (error) => {
          this.toastrService.error('Doktor eklenemedi');
        }
      );
    } else {
      console.error('Error adding doctor:', this.feedbackForm.value);
      this.toastrService.error('Eksik alanlarını doldurunuz.');
    }
  }
}
