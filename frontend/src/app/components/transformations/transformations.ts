import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Transformation } from '../../core/models';
import { TRANSFORMATIONS } from '../../core/fallback-data';

const AUTOPLAY_MS = 4500;

@Component({
  selector: 'app-transformations',
  imports: [],
  templateUrl: './transformations.html',
  styleUrl: './transformations.scss',
})
export class Transformations implements OnInit, OnDestroy {
  @Input() items: Transformation[] = TRANSFORMATIONS;

  activeIndex = 0;
  visibleCount = 1;

  private touchStartX: number | null = null;
  private timer: ReturnType<typeof setInterval> | null = null;
  private pauseCount = 0;
  private reducedMotion = false;

  get groupCount(): number {
    return Math.ceil(this.items.length / this.visibleCount);
  }

  get dotIndices(): number[] {
    return Array.from({ length: this.groupCount }, (_, i) => i);
  }

  ngOnInit(): void {
    this.reducedMotion =
      typeof window !== 'undefined' &&
      !!window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.updateVisibleCount();
    this.startAutoplay();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateVisibleCount();
  }

  private updateVisibleCount(): void {
    const count = typeof window !== 'undefined' && window.innerWidth > 860 ? 2 : 1;
    if (count !== this.visibleCount) {
      this.visibleCount = count;
      this.activeIndex = 0;
    }
  }

  isGroupActive(groupIndex: number): boolean {
    return Math.floor(this.activeIndex / this.visibleCount) === groupIndex;
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  trackByIndex(i: number): number {
    return i;
  }

  next(): void {
    this.activeIndex = (this.activeIndex + this.visibleCount) % this.items.length;
  }

  prev(): void {
    this.activeIndex = (this.activeIndex - this.visibleCount + this.items.length) % this.items.length;
  }

  goTo(groupIndex: number): void {
    this.activeIndex = groupIndex * this.visibleCount;
    this.restartAutoplay();
  }

  onArrowClick(dir: 'next' | 'prev'): void {
    dir === 'next' ? this.next() : this.prev();
    this.restartAutoplay();
  }

  @HostListener('keydown.arrowLeft')
  onArrowLeft(): void {
    this.prev();
    this.restartAutoplay();
  }

  @HostListener('keydown.arrowRight')
  onArrowRight(): void {
    this.next();
    this.restartAutoplay();
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
    this.pause();
  }

  onTouchEnd(event: TouchEvent): void {
    if (this.touchStartX !== null) {
      const dx = event.changedTouches[0].clientX - this.touchStartX;
      if (Math.abs(dx) > 40) {
        dx < 0 ? this.next() : this.prev();
      }
      this.touchStartX = null;
    }
    this.resume();
  }

  pause(): void {
    this.pauseCount++;
    this.stopAutoplay();
  }

  resume(): void {
    this.pauseCount = Math.max(0, this.pauseCount - 1);
    if (this.pauseCount === 0) {
      this.startAutoplay();
    }
  }

  private startAutoplay(): void {
    if (this.timer || this.reducedMotion || this.items.length <= 1) return;
    this.timer = setInterval(() => this.next(), AUTOPLAY_MS);
  }

  private stopAutoplay(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private restartAutoplay(): void {
    this.stopAutoplay();
    if (this.pauseCount === 0) {
      this.startAutoplay();
    }
  }
}
