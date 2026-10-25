import { Component, Input } from '@angular/core';
import { WhyItem } from '../../core/models';
import { WHY_ITEMS } from '../../core/fallback-data';

@Component({
  selector: 'app-why-choose',
  imports: [],
  templateUrl: './why-choose.html',
  styleUrl: './why-choose.scss',
})
export class WhyChoose {
  @Input() items: WhyItem[] = WHY_ITEMS;
}
