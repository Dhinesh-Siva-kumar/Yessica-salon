import { Component, Input, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DataService } from '../../core/data.service';
import { SiteContact } from '../../core/models';
import { CONTACT } from '../../core/fallback-data';

@Component({
  selector: 'app-contact',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly fb = inject(FormBuilder);
  private readonly data = inject(DataService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly sanitizer = inject(DomSanitizer);

  @Input() contact: SiteContact = CONTACT;

  readonly mapUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15908.83608830716!2d76.39667856784311!3d9.995646835520429!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080be49be720d5%3A0x55b470da72f5f1dc!2sYessica%20Unisex%20Salon!5e0!3m2!1sen!2sin!4v1792961629543!5m2!1sen!2sin'
  );
  readonly directionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=9.995646835520429,76.39667856784311';
  readonly submitting = signal(false);
  readonly timeSlots = this.buildTimeSlots();

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s]{7,15}$/)]],
    service: ['', Validators.required],
    preferredDate: ['', Validators.required],
    preferredTime: ['', Validators.required],
    notes: [''],
  });

  private buildTimeSlots(): { value: string; label: string }[] {
    const slots: { value: string; label: string }[] = [];
    for (let minutes = 10 * 60; minutes <= 20 * 60; minutes += 30) {
      const hour24 = Math.floor(minutes / 60);
      const minute = minutes % 60;
      const value = `${String(hour24).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      const period = hour24 < 12 ? 'AM' : 'PM';
      const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
      slots.push({ value, label: `${hour12}:${String(minute).padStart(2, '0')} ${period}` });
    }
    return slots;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    const raw = this.form.getRawValue();

    this.data.createBooking({
      name: raw.name,
      phone: raw.phone,
      service: raw.service,
      preferredDate: raw.preferredDate,
      preferredTime: raw.preferredTime,
      notes: raw.notes,
    }).subscribe({
      next: () => {
        this.submitting.set(false);
        this.openWhatsAppDm(raw);
        this.form.reset();
        this.snackBar.open('Thanks — we\'ll confirm your appointment shortly.', 'Close', { duration: 5000 });
      },
      error: () => {
        this.submitting.set(false);
        this.snackBar.open('Could not send your booking. Please call us instead.', 'Close', { duration: 5000 });
      },
    });
  }

  private openWhatsAppDm(raw: {
    name: string;
    phone: string;
    service: string;
    preferredDate: string | Date;
    preferredTime: string;
    notes: string;
  }): void {
    const dateLabel = raw.preferredDate instanceof Date
      ? raw.preferredDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
      : String(raw.preferredDate);
    const timeLabel = this.timeSlots.find(slot => slot.value === raw.preferredTime)?.label ?? raw.preferredTime;
    const requestedOn = new Date().toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true,
    });

    const lines = [
      'New appointment request',
      `Requested on: ${requestedOn}`,
      `Name: ${raw.name}`,
      `Phone: ${raw.phone}`,
      `Service: ${raw.service}`,
      `Preferred date: ${dateLabel}`,
      `Preferred time: ${timeLabel}`,
      raw.notes ? `Notes: ${raw.notes}` : '',
    ].filter(Boolean);

    const salonNumber = this.contact.phone.replace(/\D/g, '');
    const url = `https://wa.me/${salonNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank');
  }
}
