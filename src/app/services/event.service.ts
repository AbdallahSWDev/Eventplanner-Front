import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private API = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /** Generate authorization headers */
  private getAuthHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token || ''}`,
        'Content-Type': 'application/json'
      })
    };
  }

  /** Create Event */
  createEvent(data: Event) {
    return this.http.post<Event>(
      `${this.API}/events`,
      data,
      this.getAuthHeaders()
    );
  }

  /** Get events user organized */
  getOrganizedEvents() {
    return this.http.get<Event[]>(
      `${this.API}/events/organized`,
      this.getAuthHeaders()
    );
  }

  /** Get events user was invited to */
  getInvitedEvents() {
    return this.http.get<Event[]>(
      `${this.API}/events/invited`,
      this.getAuthHeaders()
    );
  }

  /** DELETE event */
  deleteEvent(id: number) {
    return this.http.delete(
      `${this.API}/events/${id}`,
      this.getAuthHeaders()
    );
  }

  /** Invite user (FIXED) */
  inviteUser(eventId: number, body: any) {
    return this.http.post(
      `${this.API}/events/${eventId}/invite`,
      {
        user_id: body.user_id,
        role: body.role.toLowerCase()
      },
      this.getAuthHeaders()
    );
  }

  /** Set attendance */
  setAttendance(eventId: number, body: any) {
    return this.http.post(
      `${this.API}/events/${eventId}/respond`,
      body,
      this.getAuthHeaders()
    );
  }

  /** Get attendees */
  getAttendees(eventId: number) {
    return this.http.get<any[]>(
      `${this.API}/events/${eventId}/attendees`,
      this.getAuthHeaders()
    );
  }

  /** Get event by ID */
  getEventById(id: number) {
    return this.http.get(`${this.API}/events/${id}`, this.getAuthHeaders());
  }

  /** Create task */
  createTask(eventId: number, body: any) {
    return this.http.post(
      `${this.API}/events/${eventId}/tasks`,
      body,
      this.getAuthHeaders()
    );
  }

  /** Get tasks */
  getTasksByEvent(eventId: number) {
    return this.http.get<any[]>(
      `${this.API}/events/${eventId}/tasks`,
      this.getAuthHeaders()
    );
  }

  /** FIXED SEARCH */
  search(params: any) {
    let httpParams = new HttpParams();

    Object.keys(params || {}).forEach(key => {
      if (params[key]) {
        httpParams = httpParams.set(key, params[key]);
      }
    });

    return this.http.get<Event[]>(
      `${this.API}/events/search`,
      {
        params: httpParams,
        ...this.getAuthHeaders()
      }
    );
  }
}
