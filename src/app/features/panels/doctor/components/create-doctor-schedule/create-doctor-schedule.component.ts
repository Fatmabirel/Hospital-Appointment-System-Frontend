import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-doctor-schedule',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-doctor-schedule.component.html',
  styleUrls: ['./create-doctor-schedule.component.scss']
})
export class CreateDoctorScheduleComponent {
  selectedDate: string;
  startTime: string;
  endTime: string;
  minDate: string;
  maxDate: string;
  times: string[] = [];

  constructor() {
    const today = new Date();
    const twoWeeksLater = new Date();
    twoWeeksLater.setDate(today.getDate() + 14);

    this.minDate = this.formatDate(today);
    this.maxDate = this.formatDate(twoWeeksLater);

    this.generateTimes();
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }

  private generateTimes() {
    const startHour = 0;
    const endHour = 23;

    for (let hour = startHour; hour <= endHour; hour++) {
      this.times.push(this.formatTime(hour, 0));
      if (hour !== endHour || hour === 23) {
        this.times.push(this.formatTime(hour, 30));
      }
    }
  }

  private formatTime(hour: number, minute: number): string {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  }

  saveSchedule() {
    if (this.selectedDate && this.startTime && this.endTime) {
      const schedule = {
        date: this.selectedDate,
        startTime: this.startTime,
        endTime: this.endTime
      };
      console.log('Saved Schedule:', schedule);
      // Backend'e kaydetme veya gerekli işlemleri yapma
    } else {
      alert('Lütfen tüm alanları doldurun.');
    }
  }

  getFilteredTimes() {
    if (!this.startTime) {
      return this.times;
    }
    const startIndex = this.times.indexOf(this.startTime);
    return this.times.slice(startIndex + 1).filter(time => this.isValidEndTime(time));
  }

  private isValidEndTime(time: string): boolean {
    const [startHour, startMinute] = this.startTime.split(':').map(Number);
    const [endHour, endMinute] = time.split(':').map(Number);

    if (endHour < startHour || (endHour === startHour && endMinute <= startMinute)) {
      return false;
    }
    return true;
  }
}
