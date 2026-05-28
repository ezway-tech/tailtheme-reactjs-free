import productSoftMerinoSweaterImage from '@/assets/image/product-soft-merino-sweater.jpg';
import productLeatherLaptopSleeveImage from '@/assets/image/product-leather-laptop-sleeve.jpg';
import productCeramicCoffeeSetImage from '@/assets/image/product-ceramic-coffee-set.jpg';
import productNoiseCancellingHeadphonesImage from '@/assets/image/product-noise-cancelling-headphones.jpg';
import productMinimalToteBagImage from '@/assets/image/product-minimal-tote-bag.jpg';
import productAromaDiffuserImage from '@/assets/image/product-aroma-diffuser.jpg';

export interface SampleProduct {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  inStock: boolean;
  image: string;
  description: string;
}

export const sampleProducts: SampleProduct[] = [
  {
    id: 'p-1',
    slug: 'soft-merino-sweater',
    name: 'Soft merino sweater',
    category: 'Apparel',
    price: 89,
    originalPrice: 120,
    rating: 4.6,
    reviews: 128,
    inStock: true,
    image: productSoftMerinoSweaterImage,
    description: 'Cozy 100% merino wool sweater, perfect for layering through the seasons.',
  },
  {
    id: 'p-2',
    slug: 'leather-laptop-sleeve',
    name: 'Leather laptop sleeve',
    category: 'Accessories',
    price: 64,
    rating: 4.3,
    reviews: 54,
    inStock: true,
    image: productLeatherLaptopSleeveImage,
    description: 'Full-grain leather sleeve with soft felt interior. Fits 14" laptops.',
  },
  {
    id: 'p-3',
    slug: 'ceramic-coffee-set',
    name: 'Ceramic coffee set',
    category: 'Home',
    price: 42,
    rating: 4.8,
    reviews: 302,
    inStock: true,
    image: productCeramicCoffeeSetImage,
    description: 'Handmade ceramic mugs — set of 4 in neutral earth tones.',
  },
  {
    id: 'p-4',
    slug: 'noise-cancelling-headphones',
    name: 'Noise-cancelling headphones',
    category: 'Audio',
    price: 229,
    originalPrice: 279,
    rating: 4.7,
    reviews: 891,
    inStock: false,
    image: productNoiseCancellingHeadphonesImage,
    description: 'Studio-grade active noise cancellation with 30-hour battery.',
  },
  {
    id: 'p-5',
    slug: 'minimal-tote-bag',
    name: 'Minimal tote bag',
    category: 'Accessories',
    price: 38,
    rating: 4.2,
    reviews: 41,
    inStock: true,
    image: productMinimalToteBagImage,
    description: 'Organic cotton tote with reinforced stitching.',
  },
  {
    id: 'p-6',
    slug: 'aroma-diffuser',
    name: 'Aroma diffuser',
    category: 'Home',
    price: 55,
    rating: 4.5,
    reviews: 212,
    inStock: true,
    image: productAromaDiffuserImage,
    description: 'Ultra-quiet ultrasonic diffuser with 7 mood lights.',
  },
];

export interface SampleOrder {
  id: string;
  customer: string;
  email: string;
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'refunded';
  placedAt: string;
  items: number;
}

export const sampleOrders: SampleOrder[] = [
  {
    id: 'ORD-1042',
    customer: 'Alex Nguyen',
    email: 'alex@tailtheme.test',
    total: 219,
    status: 'delivered',
    placedAt: '2026-04-10',
    items: 3,
  },
  {
    id: 'ORD-1043',
    customer: 'Maria Garcia',
    email: 'maria@tailtheme.test',
    total: 89,
    status: 'shipped',
    placedAt: '2026-04-14',
    items: 1,
  },
  {
    id: 'ORD-1044',
    customer: 'Hiro Tanaka',
    email: 'hiro@tailtheme.test',
    total: 360,
    status: 'paid',
    placedAt: '2026-04-17',
    items: 4,
  },
  {
    id: 'ORD-1045',
    customer: 'Priya Patel',
    email: 'priya@tailtheme.test',
    total: 42,
    status: 'pending',
    placedAt: '2026-04-19',
    items: 1,
  },
  {
    id: 'ORD-1046',
    customer: 'Liam Johnson',
    email: 'liam@tailtheme.test',
    total: 229,
    status: 'refunded',
    placedAt: '2026-04-02',
    items: 1,
  },
  {
    id: 'ORD-1047',
    customer: 'Aisha Khan',
    email: 'aisha@tailtheme.test',
    total: 138,
    status: 'delivered',
    placedAt: '2026-04-05',
    items: 2,
  },
];
