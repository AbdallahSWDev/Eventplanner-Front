// src/app/pages/search/search.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrls:['./search.component.css']
})
export class SearchComponent {
  keyword = '';
  start_date = '';
  end_date = '';
  role = '';
  type = 'both';
  results: any[] = [];

  constructor(private eventService: EventService) {}

  onSearch() {
    const params: any = {};
    if (this.keyword) params.keyword = this.keyword;
    if (this.start_date) params.start_date = this.start_date;
    if (this.end_date) params.end_date = this.end_date;
    if (this.role) params.role = this.role;
    if (this.type) params.type = this.type;

    this.eventService.search(params).subscribe({
      next: (res: any) => {
        this.results = res;
      },
      error: (err) => {
        console.error('Search error', err);
        this.results = [];
      }
    });
  }
    logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
}
