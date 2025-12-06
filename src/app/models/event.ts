export interface Event {
  id?: number;
  title: string;
  description: string;
  location: string;
  date: string;
  category?: string;  // now optional
  image_url?: string;
}