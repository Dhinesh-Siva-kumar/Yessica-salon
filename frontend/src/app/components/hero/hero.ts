import { Component, Input } from '@angular/core';
import { SiteStats } from '../../core/models';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  @Input() stats: SiteStats | null = null;
}
