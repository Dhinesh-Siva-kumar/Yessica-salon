import { Component, Input } from '@angular/core';
import { ServiceItem } from '../../core/models';
import { SERVICES } from '../../core/fallback-data';

@Component({
  selector: 'app-services',
  imports: [],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {
  @Input() services: ServiceItem[] = SERVICES;
}
