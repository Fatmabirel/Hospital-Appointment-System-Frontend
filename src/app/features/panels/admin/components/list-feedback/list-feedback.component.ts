import { Component } from '@angular/core';
import { AdminSidebarComponent } from '../sidebar/adminSidebar.component';
import { CommonModule } from '@angular/common';
import { Feedback } from '../../../../feedbacks/models/feedback';
import { FeedbackService } from '../../../../feedbacks/services/feedback.service';
import { ConfirmDialogComponent } from '../../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from '../../../../../core/paging/components/pagination/pagination.component';

@Component({
  selector: 'app-list-feedback',
  standalone: true,
  imports: [AdminSidebarComponent, CommonModule,RouterModule,PaginationComponent],
  templateUrl: './list-feedback.component.html',
  styleUrl: './list-feedback.component.scss',
})
export class ListFeedbackComponent {
  feedbacks: Feedback[] = [];
  pageIndex: number = 0;
  pageSize:number = 5;
  totalPages: number = 0;
  hasNext: boolean = false;

  constructor(private feedbackService: FeedbackService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getFeedbacks();
  }
  onPageChanged(newPageIndex: number) {
    this.pageIndex = newPageIndex;
    console.log(this.pageIndex);
    this.getFeedbacks();
  }

  sortFeedbacksByDateDescending(): void {
    this.feedbacks.sort((a, b) => {
      const dateA = new Date(a.createdDate); // a.date tarih formatında olduğunu varsayıyoruz
      const dateB = new Date(b.createdDate);
      return dateB.getTime() - dateA.getTime(); // Azalan sırayla sıralama
    });
  }
  

  getFeedbacks() {
    this.feedbackService
      .getFeedbacks(this.pageIndex, this.pageSize)
      .subscribe((response) => {
        this.feedbacks = response.items;
        this.sortFeedbacksByDateDescending();
        this.totalPages = response.pages;
        this.hasNext = response.hasNext;
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
        this.getFeedbacks();
      },
      (error) => {
        console.error('Geri bildirim silinemedi:', error);
      }
    );
  }
}
