import { Component, Input, signal } from '@angular/core';
import { ReelItem } from '../../core/models';
import { REELS } from '../../core/fallback-data';

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

let scriptLoading: Promise<void> | null = null;

function loadInstagramEmbedScript(): Promise<void> {
  if (window.instgrm) return Promise.resolve();
  if (scriptLoading) return scriptLoading;

  scriptLoading = new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => resolve(); // fail quietly — the fallback link still works
    document.body.appendChild(script);
  });
  return scriptLoading;
}

@Component({
  selector: 'app-reels-carousel',
  imports: [],
  templateUrl: './reels-carousel.html',
  styleUrl: './reels-carousel.scss',
})
export class ReelsCarousel {
  @Input() reels: ReelItem[] = REELS;
  @Input() instagramHandle = 'yessicaunisexsalon_karimugal';

  readonly activeIndex = signal(Math.floor((REELS.length - 1) / 2));
  readonly playingIndex = signal<number | null>(null);

  private cooldown = false;
  private readonly cooldownMs = 600;
  private pointerStartX: number | null = null;
  private pointerId: number | null = null;

  /** Shortest signed distance from the active card, e.g. -2 … 2 for 5 cards. */
  offsetFor(i: number): number {
    const n = this.reels.length;
    if (n === 0) return 0;
    let diff = (i - this.activeIndex()) % n;
    if (diff > n / 2) diff -= n;
    if (diff < -n / 2) diff += n;
    return diff;
  }

  isActive(i: number): boolean {
    return i === this.activeIndex();
  }

  goTo(i: number): void {
    if (this.cooldown || this.reels.length === 0) return;
    const n = this.reels.length;
    this.activeIndex.set(((i % n) + n) % n);
    this.playingIndex.set(null); // stepping away stops any inline playback
    this.lockBriefly();
  }

  next(): void {
    this.goTo(this.activeIndex() + 1);
  }

  prev(): void {
    this.goTo(this.activeIndex() - 1);
  }

  /** A side card brings itself to center; the active card plays inline. */
  onCardActivate(i: number): void {
    if (this.offsetFor(i) !== 0) {
      this.goTo(i);
      return;
    }
    if (this.playingIndex() === i) return;
    this.playingIndex.set(i);
    loadInstagramEmbedScript().then(() => window.instgrm?.Embeds.process());
  }

  private lockBriefly(): void {
    this.cooldown = true;
    setTimeout(() => (this.cooldown = false), this.cooldownMs);
  }

  // Pointer-based swipe (covers touch and mouse drag alike).
  onPointerDown(event: PointerEvent): void {
    this.pointerStartX = event.clientX;
    this.pointerId = event.pointerId;
  }

  onPointerUp(event: PointerEvent): void {
    if (this.pointerStartX === null || event.pointerId !== this.pointerId) return;
    const dx = event.clientX - this.pointerStartX;
    this.pointerStartX = null;
    this.pointerId = null;

    const threshold = 36;
    if (dx > threshold) this.prev();
    else if (dx < -threshold) this.next();
  }

  onPointerCancel(): void {
    this.pointerStartX = null;
    this.pointerId = null;
  }
}
