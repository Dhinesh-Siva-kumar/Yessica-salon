import { Component, Input } from '@angular/core';
import { GalleryTile } from '../../core/models';
import { GALLERY_TILES } from '../../core/fallback-data';

@Component({
  selector: 'app-gallery',
  imports: [],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery {
  @Input() tiles: GalleryTile[] = GALLERY_TILES;
}
