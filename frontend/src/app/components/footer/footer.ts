import { Component, Input } from '@angular/core';
import { SiteContact } from '../../core/models';
import { CONTACT } from '../../core/fallback-data';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  @Input() contact: SiteContact = CONTACT;

  readonly year = new Date().getFullYear();
  readonly mapShareUrl = 'https://l.instagram.com/?u=https%3A%2F%2Fmaps.app.goo.gl%2FZ4rbNrxrQGyiHVkG6%3Fg_st%3Dic&e=AUBW5R81IEdVv9qjJgY4CyTnDY8iNgYPVGs06a1_of08U6A9KT34DgVSv_MoyGFwoW6Nqj9Q7XIEBIDelXKUChJ99cmiMhhYQ14gpuLV13U5zGnNDo0528JAuKuv6tYJT-nPEaqguYcZ-yLpuLC96OL4N-H7G5Uwn56K1A';

  get hoursLines(): string[] {
    const [day, ...rest] = this.contact.hours.split(':');
    return rest.length ? [day.trim(), rest.join(':').trim()] : [this.contact.hours];
  }

  get telHref(): string {
    return 'tel:' + this.contact.phone.replace(/\s+/g, '');
  }
}
