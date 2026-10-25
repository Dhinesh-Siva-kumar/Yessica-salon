import { Component, OnInit, inject, signal } from '@angular/core';
import { Header } from '../../components/header/header';
import { Hero } from '../../components/hero/hero';
import { About } from '../../components/about/about';
import { Services } from '../../components/services/services';
import { WhyChoose } from '../../components/why-choose/why-choose';
import { ReelsCarousel } from '../../components/reels-carousel/reels-carousel';
import { Transformations } from '../../components/transformations/transformations';
import { Stylists } from '../../components/stylists/stylists';
import { OffersSlider } from '../../components/offers-slider/offers-slider';
import { Gallery } from '../../components/gallery/gallery';
import { Reviews } from '../../components/reviews/reviews';
import { BookingCta } from '../../components/booking-cta/booking-cta';
import { InstagramFeed } from '../../components/instagram-feed/instagram-feed';
import { Contact } from '../../components/contact/contact';
import { Footer } from '../../components/footer/footer';
import { DataService } from '../../core/data.service';
import {
  SERVICES,
  WHY_ITEMS,
  REELS,
  TRANSFORMATIONS,
  STYLISTS,
  OFFERS,
  GALLERY_TILES,
  REVIEWS,
  POSTS,
  CONTACT,
} from '../../core/fallback-data';
import {
  GalleryTile,
  Offer,
  Post,
  ReelItem,
  Review,
  ServiceItem,
  SiteContact,
  SiteStats,
  Stylist,
  Transformation as TransformationModel,
  WhyItem,
} from '../../core/models';

@Component({
  selector: 'app-home',
  imports: [
    Header,
    Hero,
    About,
    Services,
    WhyChoose,
    ReelsCarousel,
    Transformations,
    Stylists,
    OffersSlider,
    Gallery,
    Reviews,
    BookingCta,
    InstagramFeed,
    Contact,
    Footer,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private readonly data = inject(DataService);

  readonly stats = signal<SiteStats | null>(null);
  readonly contact = signal<SiteContact | null>(null);
  readonly services = signal<ServiceItem[] | null>(null);
  readonly whyItems = signal<WhyItem[] | null>(null);
  readonly reels = signal<ReelItem[] | null>(null);
  readonly transformations = signal<TransformationModel[] | null>(null);
  readonly stylists = signal<Stylist[] | null>(null);
  readonly offers = signal<Offer[] | null>(null);
  readonly gallery = signal<GalleryTile[] | null>(null);
  readonly reviews = signal<Review[] | null>(null);
  readonly posts = signal<Post[] | null>(null);

  // Exposed for the template's `?? FALLBACK` bindings.
  readonly fallback = {
    services: SERVICES,
    whyItems: WHY_ITEMS,
    reels: REELS,
    transformations: TRANSFORMATIONS,
    stylists: STYLISTS,
    offers: OFFERS,
    gallery: GALLERY_TILES,
    reviews: REVIEWS,
    posts: POSTS,
    contact: CONTACT,
  };

  ngOnInit(): void {
    // Each call fails independently — if the API isn't up yet, every section
    // keeps rendering its own built-in fallback content instead of breaking.
    const noop = () => {};
    this.data.getStats().subscribe({ next: (v) => this.stats.set(v), error: noop });
    this.data.getContact().subscribe({ next: (v) => this.contact.set(v), error: noop });
    this.data.getServices().subscribe({ next: (v) => this.services.set(v), error: noop });
    this.data.getWhyItems().subscribe({ next: (v) => this.whyItems.set(v), error: noop });
    this.data.getReels().subscribe({ next: (v) => this.reels.set(v), error: noop });
    this.data.getTransformations().subscribe({ next: (v) => this.transformations.set(v), error: noop });
    this.data.getStylists().subscribe({ next: (v) => this.stylists.set(v), error: noop });
    this.data.getOffers().subscribe({ next: (v) => this.offers.set(v), error: noop });
    this.data.getGallery().subscribe({ next: (v) => this.gallery.set(v), error: noop });
    this.data.getReviews().subscribe({ next: (v) => this.reviews.set(v), error: noop });
    this.data.getPosts().subscribe({ next: (v) => this.posts.set(v), error: noop });
  }
}
