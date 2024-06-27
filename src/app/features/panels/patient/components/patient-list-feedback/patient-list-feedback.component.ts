import { Component } from '@angular/core';
import { Patient } from '../../../../Patients/patientModel';
import { Feedback } from '../../../../feedbacks/models/feedback';
import { FeedbackService } from '../../../../feedbacks/services/feedback.service';
import { PatientService } from '../../../../Patients/patient.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { CommonModule } from '@angular/common';
import { PatientSidebarComponent } from '../sidebar/psidebar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-patient-list-feedback',
  standalone: true,
  imports: [CommonModule,PatientSidebarComponent,RouterModule],
  templateUrl: './patient-list-feedback.component.html',
  styleUrl: './patient-list-feedback.component.scss'
})
export class PatientListFeedbackComponent {
  patient: Patient;
  userID: string;
  feedbacks: Feedback[];
  pageIndex: number = 0;
  pageSize: number = 12;

  constructor(
    private feedbackService: FeedbackService,
    private patientService: PatientService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.patientService.getPatientProfile().subscribe((patient) => {
      this.patient = patient;
      this.userID = patient.id;
      this.getFeedbackByUserId(this.userID);
    });
  }

  getFeedbackByUserId(userID: string) {
    this.feedbackService
      .getFeedbackByUserId(this.pageIndex,this.pageSize,userID )
      .subscribe((response) => {
        this.feedbacks = response.items;
      });
  }

  confirmDelete(feedbackId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { title: 'ONAY', message: 'Bu geri bildirimi silmek istediğinizden emin misiniz?' },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteFeedback(feedbackId);
      }
    });
  }

  deleteFeedback(feedbackId: number) {
    this.feedbackService.deleteFeedback(feedbackId).subscribe(
      (response) => {
        console.log('Geri bildirim başarıyla silindi:', response);
        this.getFeedbackByUserId(this.userID);
      },
      (error) => {
        console.error('Geri bildirim silinemedi:', error);
      }
    );
  }
}
