import { Component, HostListener, Input, OnDestroy, computed, effect, signal } from '@angular/core';
import { GalleryTile } from '../../core/models';
import { GALLERY_TILES } from '../../core/fallback-data';

@Component({
  selector: 'app-gallery',
  imports: [],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery implements OnDestroy {
  private readonly tiles$ = signal<GalleryTile[]>(GALLERY_TILES);

  @Input() set tiles(value: GalleryTile[]) { this.tiles$.set(value); }
  get tiles(): GalleryTile[] { return this.tiles$(); }

  /** Only tiles with an image take part in the viewer. */
  readonly viewable = computed(() => this.tiles$().filter(t => !!t.imgUrl));
  readonly activeIndex = signal<number | null>(null);
  readonly current = computed(() => {
    const i = this.activeIndex();
    return i === null ? null : this.viewable()[i] ?? null;
  });

  private touchStartX = 0;

  constructor() {
    effect(() => {
      document.body.style.overflow = this.activeIndex() !== null ? 'hidden' : '';
    });
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  open(tile: GalleryTile): void {
    const i = this.viewable().findIndex(t => t.id === tile.id);
    if (i >= 0) this.activeIndex.set(i);
  }

  close(): void { this.activeIndex.set(null); }

  next(): void { this.step(1); }
  prev(): void { this.step(-1); }
  goTo(i: number): void { this.activeIndex.set(i); }

  private step(delta: number): void {
    const i = this.activeIndex();
    const n = this.viewable().length;
    if (i === null || !n) return;
    this.activeIndex.set((i + delta + n) % n);
  }

  onTouchStart(e: TouchEvent): void { this.touchStartX = e.changedTouches[0].clientX; }

  onTouchEnd(e: TouchEvent): void {
    const dx = e.changedTouches[0].clientX - this.touchStartX;
    if (Math.abs(dx) > 50) dx < 0 ? this.next() : this.prev();
  }

  @HostListener('document:keydown', ['$event'])
  onKey(e: KeyboardEvent): void {
    if (this.activeIndex() === null) return;
    if (e.key === 'Escape') this.close();
    else if (e.key === 'ArrowRight') this.next();
    else if (e.key === 'ArrowLeft') this.prev();
  }
}
