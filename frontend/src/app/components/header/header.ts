import { Component } from '@angular/core';
import { NAV_LINKS } from '../../core/fallback-data';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly navLinks = NAV_LINKS;
}
