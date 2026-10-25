// Single source of truth for the real YESSICA content, used both as each
// component's default @Input value and as Home's "API not reachable" fallback.
import {
  GalleryTile,
  NavLink,
  Offer,
  Post,
  ReelItem,
  Review,
  ServiceItem,
  SiteContact,
  Stylist,
  Transformation,
  WhyItem,
} from './models';

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#top' },
  { label: 'Services', href: '#services' },
  { label: 'Offers', href: '#offers' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const SERVICES: ServiceItem[] = [
  { id: 1, n: '01', title: 'Haircut & Styling', text: 'Precision cuts and finishing for men, women and kids, tailored to your face and lifestyle.', imgUrl: '/assets/services/service-01.jpg' },
  { id: 2, n: '02', title: 'Hair Coloring', text: 'From subtle highlights to bold transformations, with colour that lasts and hair that stays healthy.', imgUrl: '/assets/services/service-02.jpg' },
  { id: 3, n: '03', title: 'Hair Spa & Treatments', text: 'Deep nourishing rituals that restore shine, strength and softness.', imgUrl: '/assets/services/service-03.jpg' },
  { id: 4, n: '04', title: 'Facial & Skin Care', text: 'Glow-giving facials and skin treatments chosen for your skin type.', imgUrl: '/assets/services/service-04.jpg' },
  { id: 5, n: '05', title: 'Bridal Makeup', text: 'Complete bridal looks with trials, so your big day feels effortless.', imgUrl: '/assets/services/service-05.jpg' },
  { id: 6, n: '06', title: 'Grooming for Men', text: 'Beard styling, shaves and grooming that keep you sharp every day.', imgUrl: '/assets/services/service-06.jpg' },
];

export const WHY_ITEMS: WhyItem[] = [
  { id: 1, iconPath: 'M9 3h6v3H9zM8 6h8l1 3v11a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V9zM7 13h10', title: 'Premium products', text: 'Trusted professional brands for every service, chosen for results and care.' },
  { id: 2, iconPath: 'M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8.1 7.9 20 19M8.1 16.1 20 5', title: 'Skilled stylists', text: 'An experienced team that listens first and styles second.' },
  { id: 3, iconPath: 'M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2zM19 3v4M17 5h4', title: 'Hygienic and relaxing', text: 'A clean, calm space where you can unwind from the moment you walk in.' },
  { id: 4, iconPath: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6M16.5 4.4a3.5 3.5 0 0 1 0 6.2M18 14.3c2 .7 3.5 2.6 3.5 5.7', title: 'Unisex and family-friendly', text: 'One welcoming salon for everyone in the family.' },
];

export const REELS: ReelItem[] = [
  { id: 1, widthEm: 12, z: 1, opacity: 0.7, url: 'https://www.instagram.com/yessicaunisexsalon_karimugal/reel/DeoEU3ZI9Bs/', thumbUrl: '/assets/reels/reel-1.jpg' },
  { id: 2, widthEm: 16, z: 2, opacity: 0.9, url: 'https://www.instagram.com/yessicaunisexsalon_karimugal/reel/De1UEcjN83a/', thumbUrl: '/assets/reels/reel-2.jpg' },
  { id: 3, widthEm: 18, z: 3, opacity: 1, url: 'https://www.instagram.com/yessicaunisexsalon_karimugal/reel/Del4t8at3Cq/', thumbUrl: '/assets/reels/reel-3.jpg' },
  { id: 4, widthEm: 16, z: 2, opacity: 0.9, url: 'https://www.instagram.com/yessicaunisexsalon_karimugal/reel/DeY_PO0BB-F/', thumbUrl: '/assets/reels/reel-4.jpg' },
  { id: 5, widthEm: 12, z: 1, opacity: 0.7, url: 'https://www.instagram.com/yessicaunisexsalon_karimugal/reel/DeRvBGOII4y/', thumbUrl: '/assets/reels/reel-5.jpg' },
];

export const TRANSFORMATIONS: Transformation[] = [
  { id: 1, title: 'Layered cut and styling', beforeUrl: '/assets/before-after/pair1-before.jpg', afterUrl: '/assets/before-after/pair1-after.jpg' },
  { id: 2, title: "Men's cut and styling", beforeUrl: '/assets/before-after/pair2-before.jpg', afterUrl: '/assets/before-after/pair2-after.jpg' },
  { id: 3, title: 'Curly hair definition', beforeUrl: '/assets/before-after/model3-before.jpg', afterUrl: '/assets/before-after/model3-after.jpg' },
  { id: 4, title: 'Blow-dry styling', beforeUrl: '/assets/before-after/model4-before.jpg', afterUrl: '/assets/before-after/model4-after.jpg' },
  { id: 5, title: 'Fresh cut & style', beforeUrl: '/assets/before-after/model5-before.jpg', afterUrl: '/assets/before-after/model5-after.jpg' },
  { id: 6, title: 'Fade with color', beforeUrl: '/assets/before-after/model6-before.jpg', afterUrl: '/assets/before-after/model6-after.jpg' },
];

export const STYLISTS: Stylist[] = [
  { id: 1, name: 'Arjun Kumar', role: 'Senior Hair Stylist', text: 'Expert in precision haircuts, modern fades, and personalized styling.', initials: 'AK', imgUrl: '/assets/stylists/arjun-kumar.jpg' },
  { id: 2, name: 'Priya Nair', role: 'Hair Color & Transformation Expert', text: 'Specializes in balayage, global coloring, highlights, and hair transformations.', initials: 'PN', imgUrl: '/assets/stylists/priya-nair.jpg' },
  { id: 3, name: 'Meera Lakshmi', role: 'Skin & Beauty Specialist', text: 'Passionate about facials, skincare treatments, and bridal beauty services.', initials: 'ML', imgUrl: '/assets/stylists/meera-lakshmi.jpg' },
];

export const OFFERS: Offer[] = [
  { id: 1, n: '01', title: 'Gents Haircut + Wash', price: '₹149' },
  { id: 2, n: '02', title: 'Ladies Haircut + Blow Styling', price: '₹499' },
  { id: 3, n: '03', title: 'Layer Cut', price: '₹499 – ₹600' },
  { id: 4, n: '04', title: 'Hair Spa + Haircut', price: '₹599' },
  { id: 5, n: '05', title: 'Dandruff Treatment + Premium Haircut', price: '₹599' },
  { id: 6, n: '06', title: 'Clean Up + De-Tan', price: '₹799' },
  { id: 7, n: '07', title: 'Botox / Nanoplastia / Keratin', price: '₹3,999' },
  { id: 8, n: '08', title: 'Advance Facials', price: '20% off' },
];

export const GALLERY_TILES: GalleryTile[] = [
  { id: 0, colSpan: 2, rowSpan: 2, label: 'Salon reception', imgUrl: '/assets/reception-desk.jpg' },
  { id: 1, colSpan: 1, rowSpan: 1, label: 'Hair' },
  { id: 2, colSpan: 1, rowSpan: 2, label: 'Bridal' },
  { id: 3, colSpan: 1, rowSpan: 1, label: 'Men' },
  { id: 4, colSpan: 2, rowSpan: 1, label: 'Colour' },
  { id: 5, colSpan: 1, rowSpan: 1, label: 'Skin' },
  { id: 6, colSpan: 1, rowSpan: 1, label: 'Salon interior' },
  { id: 7, colSpan: 2, rowSpan: 2, label: 'Styling' },
  { id: 8, colSpan: 1, rowSpan: 2, label: 'Facial' },
  { id: 9, colSpan: 1, rowSpan: 2, label: 'Grooming' },
];

export const REVIEWS: Review[] = [
  { id: 1, text: '[Paste a real Google review here.]', name: '[Reviewer name]' },
  { id: 2, text: '[Paste a real Google review here.]', name: '[Reviewer name]' },
  { id: 3, text: '[Paste a real Google review here.]', name: '[Reviewer name]' },
];

export const POSTS: Post[] = Array.from({ length: 6 }, (_, i) => ({ id: i + 1, label: `Post ${i + 1}` }));

export const CONTACT: SiteContact = {
  address: 'YESSICA Unisex Salon, [Full address], Karimugal, Kochi',
  phone: '[Phone number]',
  hours: '[Opening hours]',
  mapsUrl: 'https://maps.app.goo.gl/ChetkNvDAJj8gWCE7',
  instagramUrl: 'https://www.instagram.com/yessicaunisexsalon_karimugal',
  instagramHandle: 'yessicaunisexsalon_karimugal',
};
