import { Component } from '@angular/core';
import { NAV_LINKS } from '../../core/fallback-data';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  readonly navLinks = NAV_LINKS;
  readonly year = new Date().getFullYear();
}
