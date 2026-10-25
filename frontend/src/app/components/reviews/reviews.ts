import { Component, Input } from '@angular/core';
import { Review, SiteStats } from '../../core/models';
import { REVIEWS } from '../../core/fallback-data';

@Component({
  selector: 'app-reviews',
  imports: [],
  templateUrl: './reviews.html',
  styleUrl: './reviews.scss',
})
export class Reviews {
  @Input() reviews: Review[] = REVIEWS;
  @Input() stats: SiteStats | null = null;
  @Input() mapsUrl = 'https://maps.app.goo.gl/ChetkNvDAJj8gWCE7';
}
