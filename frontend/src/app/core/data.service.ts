import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Brand,
  BookingRequest,
  GalleryTile,
  Offer,
  Post,
  ReelItem,
  Review,
  ServiceItem,
  SiteContact,
  SiteStats,
  Stylist,
  Transformation,
  WhyItem
} from './models';

const API = '/api';

@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly http = inject(HttpClient);

  getStats(): Observable<SiteStats> {
    return this.http.get<SiteStats>(`${API}/site/stats`);
  }

  getContact(): Observable<SiteContact> {
    return this.http.get<SiteContact>(`${API}/site/contact`);
  }

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${API}/brands`);
  }

  getServices(): Observable<ServiceItem[]> {
    return this.http.get<ServiceItem[]>(`${API}/services`);
  }

  getWhyItems(): Observable<WhyItem[]> {
    return this.http.get<WhyItem[]>(`${API}/why-items`);
  }

  getReels(): Observable<ReelItem[]> {
    return this.http.get<ReelItem[]>(`${API}/reels`);
  }

  getTransformations(): Observable<Transformation[]> {
    return this.http.get<Transformation[]>(`${API}/transformations`);
  }

  getStylists(): Observable<Stylist[]> {
    return this.http.get<Stylist[]>(`${API}/stylists`);
  }

  getOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${API}/offers`);
  }

  getGallery(): Observable<GalleryTile[]> {
    return this.http.get<GalleryTile[]>(`${API}/gallery`);
  }

  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${API}/reviews`);
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${API}/posts`);
  }

  createBooking(payload: BookingRequest): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(`${API}/bookings`, payload);
  }
}
