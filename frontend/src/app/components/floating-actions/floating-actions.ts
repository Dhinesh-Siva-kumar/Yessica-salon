import { Component, HostListener, Input, signal } from '@angular/core';
import { SiteContact } from '../../core/models';
import { CONTACT } from '../../core/fallback-data';

@Component({
  selector: 'app-floating-actions',
  imports: [],
  templateUrl: './floating-actions.html',
  styleUrl: './floating-actions.scss',
})
export class FloatingActions {
  @Input() contact: SiteContact = CONTACT;

  readonly showScrollTop = signal(false);

  get telHref(): string {
    return 'tel:' + this.contact.phone.replace(/\s+/g, '');
  }

  get whatsappUrl(): string {
    return `https://wa.me/${this.contact.phone.replace(/\D/g, '')}`;
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.showScrollTop.set(window.scrollY > 420);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
