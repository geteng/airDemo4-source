// 全局类型定义

export type Tab = "home" | "recommend" | "mine";

export type SubPage =
  | "live"
  | "product"
  | "tryon"
  | "note"
  | "wardrobe"
  | "orders"
  | "favorites"
  | "coupons"
  | "records"
  | "vip"
  | "stylist"
  | null;

export interface Look {
  id: number;
  img: string;
  scene: string;
  title: string;
  items: string;
  price: number;
  liked: boolean;
  video?: string;
}

export interface WardrobeItem {
  id: number;
  img: string;
  video?: string;
  name: string;
  date: string;
  times: number;
}

export interface NoteData {
  img: string;
  title: string;
  likes: string;
  author: string;
  body: string;
  images: string[];
  tags: string[];
  link: string;
  imageCount: string;
}

export interface OrderData {
  id: string;
  status: string;
  statusLabel: string;
  img: string;
  name: string;
  price: number;
  date: string;
  items: string;
  refundStatus?: string;
}

export interface FavoriteData {
  id: number;
  img: string;
  name: string;
  price: number;
  type: string;
}

export interface CouponData {
  id: number;
  amount: number;
  threshold: number;
  name: string;
  expire: string;
  status: string;
}

export interface RecordData {
  id: number;
  date: string;
  img: string;
  title: string;
  scene: string;
  weather: string;
  note: string;
}

export interface VipBenefit {
  icon: string;
  title: string;
  desc: string;
}

export interface ProductDetail {
  flatImgs: string[];
  reasons: string[];
  lengthLabel: string;
  sizeChart: {
    size: string;
    shoulder: string;
    bust: string;
    waist: string;
    length: string;
  }[];
  reviews: {
    user: string;
    initial: string;
    rating: number;
    size: string;
    content: string;
    date: string;
    likes: number;
  }[];
}

export interface TabItem {
  key: Tab;
  label: string;
  icon: "home" | "sparkles" | "user";
}
