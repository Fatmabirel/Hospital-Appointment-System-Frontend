import { Component } from '@angular/core';
import { AdminSidebarComponent } from '../sidebar/adminSidebar.component';
import { CommonModule } from '@angular/common';
import { Feedback } from '../../../../feedbacks/models/feedback';
import { FeedbackService } from '../../../../feedbacks/services/feedback.service';

@Component({
  selector: 'app-list-feedback',
  standalone: true,
  imports: [AdminSidebarComponent, CommonModule],
  templateUrl: './list-feedback.component.html',
  styleUrl: './list-feedback.component.scss',
})
export class ListFeedbackComponent {
  feedbacks: Feedback[] = [];
  pageIndex: number = 0;
  pageSize: number = 12;

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.getFeedbacks();
  }

  getFeedbacks() {
    this.feedbackService
      .getFeedbacks(this.pageIndex, this.pageSize)
      .subscribe((response) => {
        this.feedbacks = response.items;
      });
  }
}
