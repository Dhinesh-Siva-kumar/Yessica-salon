import { Component, HostListener, Input } from '@angular/core';
import { Offer } from '../../core/models';
import { OFFERS } from '../../core/fallback-data';

@Component({
  selector: 'app-offers-slider',
  imports: [],
  templateUrl: './offers-slider.html',
  styleUrl: './offers-slider.scss',
})
export class OffersSlider {
  @Input() offers: Offer[] = OFFERS;

  activeIndex = 0;

  private touchStartX: number | null = null;

  get total(): number {
    return this.offers.length;
  }

  next(): void {
    this.activeIndex = (this.activeIndex + 1) % this.offers.length;
  }

  prev(): void {
    this.activeIndex = (this.activeIndex - 1 + this.offers.length) % this.offers.length;
  }

  goTo(i: number): void {
    this.activeIndex = i;
  }

  @HostListener('keydown.arrowLeft')
  onArrowLeft(): void {
    this.prev();
  }

  @HostListener('keydown.arrowRight')
  onArrowRight(): void {
    this.next();
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
  }

  onTouchEnd(event: TouchEvent): void {
    if (this.touchStartX === null) return;
    const dx = event.changedTouches[0].clientX - this.touchStartX;
    if (Math.abs(dx) > 40) {
      dx < 0 ? this.next() : this.prev();
    }
    this.touchStartX = null;
  }
}
