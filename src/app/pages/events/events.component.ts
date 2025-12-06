// src/app/pages/events/events.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  organized: any[] = [];
  invited: any[] = [];

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.eventService.getOrganizedEvents().subscribe({
      next: (res: any) => this.organized = res || [],
      error: () => this.organized = []
    });

    this.eventService.getInvitedEvents().subscribe({
      next: (res: any) => this.invited = res || [],
      error: () => this.invited = []
    });
  }

  delete(id: number) {
    if (!confirm('Delete this event?')) return;
    this.eventService.deleteEvent(id).subscribe({
      next: () => this.load(),
      error: (err) => console.error('Delete failed', err)
    });
  }

  goToDetails(id: number) {
    this.router.navigate(['/event', id]);
  }
    logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
}
