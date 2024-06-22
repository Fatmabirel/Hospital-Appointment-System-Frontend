import { Component } from '@angular/core';
import { DoctorSidebarComponent } from '../sidebar/doctorSidebar.component';
import { CommonModule } from '@angular/common';
import { FeedbackService } from '../../../../feedbacks/services/feedback.service';
import { Feedback } from '../../../../feedbacks/models/feedback';
import { MatDialog } from '@angular/material/dialog';
import { DoctorService } from '../../../../doctors/services/doctor.service';
import { Doctor } from '../../../../doctors/models/doctor';
import { RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from '../../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-doctor-list-feedback',
  standalone: true,
  imports: [DoctorSidebarComponent, CommonModule,RouterModule],
  templateUrl: './doctor-list-feedback.component.html',
  styleUrl: './doctor-list-feedback.component.scss',
})
export class DoctorListFeedbackComponent {
  doctor: Doctor;
  userID: string;
  feedbacks: Feedback[];
  pageIndex: number = 0;
  pageSize: number = 12;

  constructor(
    private feedbackService: FeedbackService,
    private doctorService: DoctorService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.doctorService.getDoctorProfile().subscribe((doctor) => {
      this.doctor = doctor;
      this.userID = doctor.id;
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
