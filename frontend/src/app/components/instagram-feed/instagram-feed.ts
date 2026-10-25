import { Component, Input } from '@angular/core';
import { Post } from '../../core/models';
import { POSTS } from '../../core/fallback-data';

@Component({
  selector: 'app-instagram-feed',
  imports: [],
  templateUrl: './instagram-feed.html',
  styleUrl: './instagram-feed.scss',
})
export class InstagramFeed {
  @Input() posts: Post[] = POSTS;
  @Input() instagramHandle = 'yessicaunisexsalon_karimugal';
}
