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
  { id: 0, colSpan: 2, rowSpan: 2, label: 'Salon reception', imgUrl: '/assets/gallary/yessica_gallary_1.jpeg' },
  { id: 1, colSpan: 1, rowSpan: 1, label: 'Hair', imgUrl: '/assets/gallary/yessica_gallary_2.jpeg' },
  { id: 2, colSpan: 1, rowSpan: 2, label: 'Bridal', imgUrl: '/assets/gallary/yessica_gallary_3.jpeg' },
  { id: 3, colSpan: 1, rowSpan: 1, label: 'Men', imgUrl: '/assets/gallary/yessica_gallary_4.jpeg' },
  { id: 4, colSpan: 2, rowSpan: 1, label: 'Colour', imgUrl: '/assets/gallary/yessica_gallary_5.jpeg' },
  { id: 5, colSpan: 1, rowSpan: 1, label: 'Skin', imgUrl: '/assets/gallary/yessica_gallary_6.jpeg' },
  { id: 6, colSpan: 1, rowSpan: 1, label: 'Salon interior', imgUrl: '/assets/gallary/yessica_gallary_7.jpeg' },
  { id: 7, colSpan: 2, rowSpan: 2, label: 'Styling', imgUrl: '/assets/gallary/yessica_gallary_8.jpeg' },
  { id: 8, colSpan: 1, rowSpan: 2, label: 'Facial', imgUrl: '/assets/gallary/yessica_gallary_9.jpeg' },
  { id: 9, colSpan: 1, rowSpan: 2, label: 'Grooming', imgUrl: '/assets/gallary/yessica_gallary_10.jpeg' },
];

export const REVIEWS: Review[] = [
  {
    id: 1,
    text: 'Had a great experience at Yessica Saloon! ❤️ The service was excellent, the staff were friendly and professional, and the overall atmosphere was really good. Truly satisfied with the experience. Highly recommended! ✨💯',
    name: 'Georgy Sunil',
  },
  {
    id: 2,
    text: 'Had a great experience at YESSICA UNISEX SALON, Karimugal! The staff are friendly and professional, and the service quality is excellent. The salon has a neat and comfortable atmosphere. Highly recommended for haircuts, hair treatments, skincare, and beauty services. Definitely worth visiting! ❤️',
    name: 'Ijas Noushad',
  },
  {
    id: 3,
    text: 'Yessica Unisex Salon is truly one of the best salons in town, offering excellent service with a strong focus on customer satisfaction. The staff are professional, friendly, and attentive to every detail, ensuring a comfortable and pleasant experience. The quality of service, welcoming atmosphere, and attention to customer needs make this salon stand out. Highly recommended for anyone looking for top-quality grooming and beauty services with a 100% satisfaction experience! 💯✨',
    name: 'Alfas Assis',
  },
];

export const POSTS: Post[] = [
  { id: 1, label: 'Instagram post 1', imgUrl: '/assets/instagram/yessica_instagram_1.jpg', postUrl: 'https://www.instagram.com/p/DeTb2bWGYKe/' },
  { id: 2, label: 'Instagram post 2', imgUrl: '/assets/instagram/yessica_instagram_2.jpg', postUrl: 'https://www.instagram.com/p/DdVHAZYk8jj/' },
  { id: 3, label: 'Instagram post 3', imgUrl: '/assets/instagram/yessica_instagram_3.webp', postUrl: 'https://www.instagram.com/p/DdeVoxsJpW1/' },
  { id: 4, label: 'Instagram post 4', imgUrl: '/assets/instagram/yessica_instagram_4.jpg', postUrl: 'https://www.instagram.com/p/Dc0_9e2Eer4/' },
  { id: 5, label: 'Instagram post 5', imgUrl: '/assets/instagram/yessica_instagram_5.jpg', postUrl: 'https://www.instagram.com/p/Dc5-_xqmW5g/' },
  { id: 6, label: 'Instagram post 6', imgUrl: '/assets/instagram/yessica_instagram_6.jpg', postUrl: 'https://www.instagram.com/p/DdrGVnztzTp/' },
];

export const CONTACT: SiteContact = {
  address: 'YESSICA Unisex Salon, [Full address], Karimugal, Kochi',
  phone: '[Phone number]',
  hours: '[Opening hours]',
  mapsUrl: 'https://maps.app.goo.gl/ChetkNvDAJj8gWCE7',
  instagramUrl: 'https://www.instagram.com/yessicaunisexsalon_karimugal',
  instagramHandle: 'yessicaunisexsalon_karimugal',
};
