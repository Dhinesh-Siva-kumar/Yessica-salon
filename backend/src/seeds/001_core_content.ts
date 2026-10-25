import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('services').del();
  await knex('offers').del();
  await knex('stylists').del();
  await knex('gallery_items').del();
  await knex('transformations').del();
  await knex('reviews').del();
  await knex('reels').del();
  await knex('brands').del();
  await knex('posts').del();
  await knex('site_settings').del();

  await knex('services').insert([
    { n: '01', title: 'Haircut & Styling', text: 'Precision cuts and finishing for men, women and kids, tailored to your face and lifestyle.', img_url: '/assets/services/service-01.jpg', sort_order: 1 },
    { n: '02', title: 'Hair Coloring', text: 'From subtle highlights to bold transformations, with colour that lasts and hair that stays healthy.', img_url: '/assets/services/service-02.jpg', sort_order: 2 },
    { n: '03', title: 'Hair Spa & Treatments', text: 'Deep nourishing rituals that restore shine, strength and softness.', img_url: '/assets/services/service-03.jpg', sort_order: 3 },
    { n: '04', title: 'Facial & Skin Care', text: 'Glow-giving facials and skin treatments chosen for your skin type.', img_url: '/assets/services/service-04.jpg', sort_order: 4 },
    { n: '05', title: 'Bridal Makeup', text: 'Complete bridal looks with trials, so your big day feels effortless.', img_url: '/assets/services/service-05.jpg', sort_order: 5 },
    { n: '06', title: 'Grooming for Men', text: 'Beard styling, shaves and grooming that keep you sharp every day.', img_url: '/assets/services/service-06.jpg', sort_order: 6 },
  ]);

  await knex('offers').insert([
    { n: '01', title: 'Gents Haircut + Wash', price: '₹149', sort_order: 1 },
    { n: '02', title: 'Ladies Haircut + Blow Styling', price: '₹499', sort_order: 2 },
    { n: '03', title: 'Layer Cut', price: '₹499 – ₹600', sort_order: 3 },
    { n: '04', title: 'Hair Spa + Haircut', price: '₹599', sort_order: 4 },
    { n: '05', title: 'Dandruff Treatment + Premium Haircut', price: '₹599', sort_order: 5 },
    { n: '06', title: 'Clean Up + De-Tan', price: '₹799', sort_order: 6 },
    { n: '07', title: 'Botox / Nanoplastia / Keratin', price: '₹3,999', sort_order: 7 },
    { n: '08', title: 'Advance Facials', price: '20% off', sort_order: 8 },
  ]);

  await knex('stylists').insert([
    { name: 'Arjun Kumar', role: 'Senior Hair Stylist', text: 'Expert in precision haircuts, modern fades, and personalized styling.', initials: 'AK', img_url: '/assets/stylists/arjun-kumar.jpg', sort_order: 1 },
    { name: 'Priya Nair', role: 'Hair Color & Transformation Expert', text: 'Specializes in balayage, global coloring, highlights, and hair transformations.', initials: 'PN', img_url: '/assets/stylists/priya-nair.jpg', sort_order: 2 },
    { name: 'Meera Lakshmi', role: 'Skin & Beauty Specialist', text: 'Passionate about facials, skincare treatments, and bridal beauty services.', initials: 'ML', img_url: '/assets/stylists/meera-lakshmi.jpg', sort_order: 3 },
    { name: 'Rahul Menon', role: 'Barber & Grooming Specialist', text: 'Sharp cuts, beard styling, and grooming for the modern gentleman.', initials: 'RM', img_url: null, sort_order: 4 },
    { name: 'Anjali Das', role: 'Bridal & Makeup Artist', text: 'Creates polished bridal looks, party makeup, and hair styling for special days.', initials: 'AD', img_url: null, sort_order: 5 },
  ]);

  await knex('gallery_items').insert([
    { label: 'Salon reception', img_url: '/assets/gallary/yessica_gallary_1.jpg', col_span: 2, row_span: 2, sort_order: 0 },
    { label: 'Hair', img_url: '/assets/gallary/yessica_gallary_2.jpeg', col_span: 1, row_span: 1, sort_order: 1 },
    { label: 'Bridal', img_url: '/assets/gallary/yessica_gallary_3.jpeg', col_span: 1, row_span: 2, sort_order: 2 },
    { label: 'Men', img_url: '/assets/gallary/yessica_gallary_4.jpeg', col_span: 1, row_span: 1, sort_order: 3 },
    { label: 'Colour', img_url: '/assets/gallary/yessica_gallary_5.jpeg', col_span: 2, row_span: 1, sort_order: 4 },
    { label: 'Skin', img_url: '/assets/gallary/yessica_gallary_6.jpeg', col_span: 1, row_span: 1, sort_order: 5 },
    { label: 'Salon interior', img_url: '/assets/gallary/yessica_gallary_7.jpeg', col_span: 1, row_span: 1, sort_order: 6 },
    { label: 'Styling', img_url: '/assets/gallary/yessica_gallary_8.jpeg', col_span: 2, row_span: 2, sort_order: 7 },
    { label: 'Facial', img_url: '/assets/gallary/yessica_gallary_9.jpeg', col_span: 1, row_span: 2, sort_order: 8 },
    { label: 'Grooming', img_url: '/assets/gallary/yessica_gallary_10.jpeg', col_span: 1, row_span: 2, sort_order: 9 },
  ]);

  await knex('transformations').insert([
    { title: 'Layered cut and styling', before_url: '/assets/before-after/pair1-before.jpg', after_url: '/assets/before-after/pair1-after.jpg', sort_order: 1 },
    { title: "Men's cut and styling", before_url: '/assets/before-after/pair2-before.jpg', after_url: '/assets/before-after/pair2-after.jpg', sort_order: 2 },
    { title: 'Curly hair definition', before_url: '/assets/before-after/model3-before.jpg', after_url: '/assets/before-after/model3-after.jpg', sort_order: 3 },
    { title: 'Blow-dry styling', before_url: '/assets/before-after/model4-before.jpg', after_url: '/assets/before-after/model4-after.jpg', sort_order: 4 },
    { title: 'Fresh cut & style', before_url: '/assets/before-after/model5-before.jpg', after_url: '/assets/before-after/model5-after.jpg', sort_order: 5 },
    { title: 'Fade with color', before_url: '/assets/before-after/model6-before.jpg', after_url: '/assets/before-after/model6-after.jpg', sort_order: 6 },
  ]);

  await knex('reviews').insert([
    {
      text: 'Had a great experience at Yessica Saloon! ❤️ The service was excellent, the staff were friendly and professional, and the overall atmosphere was really good. Truly satisfied with the experience. Highly recommended! ✨💯',
      name: 'Georgy Sunil', rating: 5, sort_order: 1,
    },
    {
      text: 'Had a great experience at YESSICA UNISEX SALON, Karimugal! The staff are friendly and professional, and the service quality is excellent. The salon has a neat and comfortable atmosphere. Highly recommended for haircuts, hair treatments, skincare, and beauty services. Definitely worth visiting! ❤️',
      name: 'Ijas Noushad', rating: 5, sort_order: 2,
    },
    {
      text: 'Yessica Unisex Salon is truly one of the best salons in town, offering excellent service with a strong focus on customer satisfaction. The staff are professional, friendly, and attentive to every detail, ensuring a comfortable and pleasant experience. The quality of service, welcoming atmosphere, and attention to customer needs make this salon stand out. Highly recommended for anyone looking for top-quality grooming and beauty services with a 100% satisfaction experience! 💯✨',
      name: 'Alfas Assis', rating: 5, sort_order: 3,
    },
  ]);

  await knex('reels').insert([
    { video_url: 'https://www.instagram.com/yessicaunisexsalon_karimugal/reel/DeoEU3ZI9Bs/', thumbnail_url: '/assets/reels/reel-1.jpg', width_em: 12, z: 1, opacity: 0.7, sort_order: 1 },
    { video_url: 'https://www.instagram.com/yessicaunisexsalon_karimugal/reel/De1UEcjN83a/', thumbnail_url: '/assets/reels/reel-2.jpg', width_em: 16, z: 2, opacity: 0.9, sort_order: 2 },
    { video_url: 'https://www.instagram.com/yessicaunisexsalon_karimugal/reel/Del4t8at3Cq/', thumbnail_url: '/assets/reels/reel-3.jpg', width_em: 18, z: 3, opacity: 1, sort_order: 3 },
    { video_url: 'https://www.instagram.com/yessicaunisexsalon_karimugal/reel/DeY_PO0BB-F/', thumbnail_url: '/assets/reels/reel-4.jpg', width_em: 16, z: 2, opacity: 0.9, sort_order: 4 },
    { video_url: 'https://www.instagram.com/yessicaunisexsalon_karimugal/reel/DeRvBGOII4y/', thumbnail_url: '/assets/reels/reel-5.jpg', width_em: 12, z: 1, opacity: 0.7, sort_order: 5 },
  ]);

  await knex('brands').insert([
    { name: 'Floractive Professional', logo_url: '/assets/logo-floractive.png', height_px: 64, sort_order: 1 },
    { name: "L'Oreal Professionnel", logo_url: '/assets/logo-loreal.png', height_px: 44, sort_order: 2 },
    { name: 'MK Professional', logo_url: '/assets/logo-mk.png', height_px: 68, sort_order: 3 },
    { name: 'Schwarzkopf', logo_url: '/assets/logo-schwarzkopf.png', height_px: 64, sort_order: 4 },
  ]);

  await knex('posts').insert(
    [
      ['DeTb2bWGYKe', 'jpg'],
      ['DdVHAZYk8jj', 'jpg'],
      ['DdeVoxsJpW1', 'webp'],
      ['Dc0_9e2Eer4', 'jpg'],
      ['Dc5-_xqmW5g', 'jpg'],
      ['DdrGVnztzTp', 'jpg'],
    ].map(([code, ext], i) => ({
      label: `Instagram post ${i + 1}`,
      img_url: `/assets/instagram/yessica_instagram_${i + 1}.${ext}`,
      post_url: `https://www.instagram.com/p/${code}/`,
      sort_order: i + 1,
    }))
  );

  await knex('site_settings').insert([
    {
      key: 'stats',
      value: JSON.stringify({
        rating: '4.5',
        reviewCount: 150,
        yearsExperience: '20+',
        happyClients: '1,000+',
        googleRating: '4.5',
        expertStylists: '5',
      }),
    },
    {
      key: 'contact',
      value: JSON.stringify({
        address: 'YESSICA Unisex Salon, Karimugal, Kochi, Keralam 682303',
        phone: '+91 73062 75778',
        hours: 'Monday – Sunday: 10 AM – 8 PM',
        mapsUrl: 'https://maps.app.goo.gl/ChetkNvDAJj8gWCE7',
        instagramUrl: 'https://www.instagram.com/yessicaunisexsalon_karimugal',
        instagramHandle: 'yessicaunisexsalon_karimugal',
      }),
    },
  ]);
}
