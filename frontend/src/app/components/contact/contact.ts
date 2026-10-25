import { Component, HostListener, Input, inject, signal } from '@angular/core';
import { AbstractControl, ReactiveFormsModule, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SiteContact } from '../../core/models';
import { CONTACT, SERVICES } from '../../core/fallback-data';

@Component({
  selector: 'app-contact',
  imports: [
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly fb = inject(FormBuilder);
  private readonly snackBar = inject(MatSnackBar);
  private readonly sanitizer = inject(DomSanitizer);

  @Input() contact: SiteContact = CONTACT;

  readonly mapUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15908.83608830716!2d76.39667856784311!3d9.995646835520429!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080be49be720d5%3A0x55b470da72f5f1dc!2sYessica%20Unisex%20Salon!5e0!3m2!1sen!2sin!4v1792961629543!5m2!1sen!2sin'
  );
  readonly directionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=9.995646835520429,76.39667856784311';
  readonly submitting = signal(false);
  readonly timeSlots = this.buildTimeSlots();
  readonly serviceOptions = SERVICES.map((s) => s.title);
  readonly minDate = new Date();

  readonly form = this.fb.group({
    name: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]),
    phone: this.fb.nonNullable.control('', [Validators.required, indianMobileValidator()]),
    service: this.fb.nonNullable.control('', Validators.required),
    preferredDate: this.fb.control<Date | null>(null, Validators.required),
    preferredTime: this.fb.nonNullable.control('', Validators.required),
    notes: this.fb.nonNullable.control('', Validators.maxLength(500)),
  });

  readonly openDropdown = signal<'service' | 'time' | null>(null);

  toggleDropdown(name: 'service' | 'time'): void {
    this.openDropdown.update((cur) => (cur === name ? null : name));
  }

  selectService(value: string): void {
    this.form.controls.service.setValue(value);
    this.form.controls.service.markAsDirty();
    this.form.controls.service.markAsTouched();
    this.openDropdown.set(null);
  }

  selectTime(slot: { value: string; label: string }): void {
    this.form.controls.preferredTime.setValue(slot.value);
    this.form.controls.preferredTime.markAsDirty();
    this.form.controls.preferredTime.markAsTouched();
    this.openDropdown.set(null);
  }

  timeLabelFor(value: string): string {
    return this.timeSlots.find((s) => s.value === value)?.label ?? '';
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.openDropdown()) return;
    const target = event.target as HTMLElement;
    if (!target.closest('.y-dropdown')) {
      this.openDropdown.set(null);
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.openDropdown.set(null);
  }

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  errorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (!control || !control.errors) return '';

    if (control.errors['required']) return 'This field is required.';
    if (controlName === 'phone' && control.errors['invalidMobile']) {
      return 'Enter a valid 10-digit mobile number.';
    }
    if (control.errors['minlength']) return `Must be at least ${control.errors['minlength'].requiredLength} characters.`;
    if (control.errors['maxlength']) return `Must be under ${control.errors['maxlength'].requiredLength} characters.`;
    return 'This field is invalid.';
  }

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
    const preferredDate = raw.preferredDate as Date;

    this.openWhatsAppDm({ ...raw, preferredDate });
    this.form.reset();
    this.submitting.set(false);
    this.snackBar.open('WhatsApp opened with your appointment details — just hit send!', 'Close', { duration: 5000 });
  }

  private openWhatsAppDm(raw: {
    name: string;
    phone: string;
    service: string;
    preferredDate: Date;
    preferredTime: string;
    notes: string;
  }): void {
    const dateLabel = raw.preferredDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
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

function indianMobileValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const raw = (control.value ?? '') as string;
    if (!raw) return null;

    let digits = raw.replace(/\D/g, '');
    if (digits.startsWith('91') && digits.length === 12) {
      digits = digits.slice(2);
    } else if (digits.startsWith('0') && digits.length === 11) {
      digits = digits.slice(1);
    }

    const isValid = /^[6-9]\d{9}$/.test(digits);
    return isValid ? null : { invalidMobile: true };
  };
}
