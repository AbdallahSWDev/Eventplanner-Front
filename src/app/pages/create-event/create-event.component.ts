import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-create-event',
  standalone: true,
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
  imports: [CommonModule, FormsModule]
})
export class CreateEventComponent {

  title = '';
  description = '';
  location = '';
  date = '';

  constructor(
    private eventService: EventService,
    private router: Router
  ) {}

  createEvent() {
    const eventData = {
      title: this.title,
      description: this.description,
      location: this.location,
      date: this.date
    };

    this.eventService.createEvent(eventData)
      .subscribe({
  next: () => {
    alert('Event created successfully!');
    this.router.navigate(['/events']);
  },
  error: (err: any) => {
    console.error(err);
    alert('Failed to create event.');
  }
});
  }
    logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
}
