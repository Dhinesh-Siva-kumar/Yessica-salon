import { Component, Input } from '@angular/core';
import { Brand } from '../../core/models';

@Component({
  selector: 'app-brands-strip',
  imports: [],
  templateUrl: './brands-strip.html',
  styleUrl: './brands-strip.scss',
})
export class BrandsStrip {
  @Input() brands: Brand[] = [
    { id: 1, name: 'Floractive Professional', logoUrl: '/assets/logo-floractive.png', heightPx: 64 },
    { id: 2, name: "L'Oreal Professionnel", logoUrl: '/assets/logo-loreal.png', heightPx: 44 },
    { id: 3, name: 'MK Professional', logoUrl: '/assets/logo-mk.png', heightPx: 68 },
    { id: 4, name: 'Schwarzkopf', logoUrl: '/assets/logo-schwarzkopf.png', heightPx: 64 },
  ];
}
