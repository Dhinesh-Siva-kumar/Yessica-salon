import { Component, Input } from '@angular/core';
import { Stylist } from '../../core/models';
import { STYLISTS } from '../../core/fallback-data';

@Component({
  selector: 'app-stylists',
  imports: [],
  templateUrl: './stylists.html',
  styleUrl: './stylists.scss',
})
export class Stylists {
  @Input() stylists: Stylist[] = STYLISTS;
}
