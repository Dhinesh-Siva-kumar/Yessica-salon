import { Component } from '@angular/core';
import { BrandsStrip } from '../brands-strip/brands-strip';

@Component({
  selector: 'app-about',
  imports: [BrandsStrip],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {}
