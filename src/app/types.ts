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
  | "styleProfile"
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
  purpose?: string;
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
  detailUrl: string;
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

// ProductDetail 作为单一数据源：在 Look 基础上合并封面图、平铺图、详情等全部字段
export interface ProductDetail extends Look {
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
  // 首页轮播专属副文案（穿搭定制页无需）
  carouselTitle?: string;
  tags?: string[];
}

export interface TabItem {
  key: Tab;
  label: string;
  icon: "home" | "sparkles" | "user";
}
