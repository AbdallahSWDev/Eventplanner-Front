import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/signup/signup.component').then(m => m.SignupComponent)
  },
  {
    path: 'events',
    loadComponent: () =>
      import('./pages/events/events.component').then(m => m.EventsComponent)
  },
  {
    path: 'event/:id',
    loadComponent: () =>
      import('./pages/event-details/event-details.component').then(m => m.EventDetailsComponent)
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./pages/search/search.component').then(m => m.SearchComponent)
  },
  {
    path: 'create-event',
    loadComponent: () =>
      import('./pages/create-event/create-event.component').then(m => m.CreateEventComponent)
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
