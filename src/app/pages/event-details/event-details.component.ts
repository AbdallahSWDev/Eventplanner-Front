import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  eventId!: number;
  event: any = null;
  attendees: any[] = [];

  inviteUserId = '';
  inviteRole = 'attendee'; // only attendee or cohost

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventId = +id;
      this.loadEvent();
      this.loadAttendees();
    }
  }

  loadEvent() {
    this.eventService.getEventById(this.eventId).subscribe((res) => {
      this.event = res;
    });
  }

  loadAttendees() {
    this.eventService.getAttendees(this.eventId).subscribe((res) => {
      this.attendees = res || [];
    });
  }

  invite() {
    if (!this.inviteUserId) return;

    const body = {
      user_id: Number(this.inviteUserId),
      role: this.inviteRole.toLowerCase()
    };

    this.eventService.inviteUser(this.eventId, body).subscribe({
      next: () => {
        this.loadAttendees();
        this.inviteUserId = '';
        this.inviteRole = 'attendee';
      },
      error: (err) => console.error("Invite error:", err)
    });
  }

  setStatus(status: string) {
    this.eventService.setAttendance(this.eventId, { status }).subscribe(() => {
      this.loadAttendees();
    });
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
}
