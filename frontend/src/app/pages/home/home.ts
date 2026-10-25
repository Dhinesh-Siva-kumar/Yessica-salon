import { Component } from '@angular/core';
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
import { FloatingActions } from '../../components/floating-actions/floating-actions';

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
    FloatingActions,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
