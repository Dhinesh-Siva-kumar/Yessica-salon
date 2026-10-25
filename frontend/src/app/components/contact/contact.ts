import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { DataService } from '../../core/data.service';
import { SiteContact } from '../../core/models';
import { CONTACT } from '../../core/fallback-data';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    GoogleMap,
    MapMarker,
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly data = inject(DataService);
  private readonly snackBar = inject(MatSnackBar);

  @Input() contact: SiteContact = CONTACT;

  readonly hasMapsKey = !!environment.googleMapsApiKey;
  readonly center: google.maps.LatLngLiteral = { lat: 10.0159, lng: 76.3419 }; // Kochi approx — update once the real address is known
  readonly zoom = 15;
  readonly submitting = signal(false);

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s]{7,15}$/)]],
    service: ['', Validators.required],
    preferredDate: ['', Validators.required],
    preferredTime: ['', Validators.required],
    notes: [''],
  });

  ngOnInit(): void {
    if (this.hasMapsKey && !(window as any).google?.maps) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}`;
      script.async = true;
      document.head.appendChild(script);
    }
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
        this.form.reset();
        this.snackBar.open('Thanks — we\'ll confirm your appointment shortly.', 'Close', { duration: 5000 });
      },
      error: () => {
        this.submitting.set(false);
        this.snackBar.open('Could not send your booking. Please call us instead.', 'Close', { duration: 5000 });
      },
    });
  }
}
