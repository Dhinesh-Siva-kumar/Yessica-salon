export interface NavLink {
  label: string;
  href: string;
}

export interface SiteStats {
  rating: string;
  reviewCount: number;
  yearsExperience: string;
  happyClients: string;
  googleRating: string;
  expertStylists: string;
}

export interface Brand {
  id: number;
  name: string;
  logoUrl: string;
  heightPx: number;
}

export interface ServiceItem {
  id: number;
  n: string;
  title: string;
  text: string;
  imgUrl?: string;
}

export interface WhyItem {
  id: number;
  iconPath: string;
  title: string;
  text: string;
}

export interface ReelItem {
  id: number;
  widthEm: number;
  z: number;
  opacity: number;
  url?: string;
  thumbUrl?: string;
}

export interface Transformation {
  id: number;
  beforeUrl?: string;
  afterUrl?: string;
  title: string;
}

export interface Stylist {
  id: number;
  name: string;
  role: string;
  text: string;
  imgUrl?: string;
  initials: string;
}

export interface Offer {
  id: number;
  n: string;
  title: string;
  price: string;
}

export interface GalleryTile {
  id: number;
  colSpan: number;
  rowSpan: number;
  label: string;
  imgUrl?: string;
}

export interface Review {
  id: number;
  text: string;
  name: string;
}

export interface Post {
  id: number;
  label: string;
  imgUrl?: string;
  postUrl?: string;
}

export interface SiteContact {
  address: string;
  phone: string;
  hours: string;
  mapsUrl: string;
  instagramUrl: string;
  instagramHandle: string;
}

export interface BookingRequest {
  name: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
}
