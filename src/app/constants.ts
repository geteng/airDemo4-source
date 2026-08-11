// 全局共享常量、主题色与 Mock 数据
import type {
  CouponData,
  FavoriteData,
  Look,
  NoteData,
  OrderData,
  ProductDetail,
  RecordData,
  TabItem,
  VipBenefit,
  WardrobeItem,
} from "./types";

// ─── 主题色 ──────────────────────────────────────────────────────────────────
export const ACCENT = "#d4a56a";
export const ACCENT_LIGHT = "#2a2118";
export const BG = "#18160F";
export const CARD = "#1e1b17";
export const TEXT = "#f3ece2";
export const MUTED = "#a89c8c";
// 导航栏（米黄色底，其上元素用深色保证可读）
export const NAV_BG = "#EDC297";
export const NAV_ACTIVE = "#322302";
export const NAV_INACTIVE = "#8a6f4a";

// ─── 字体 ─────────────────────────────────────────────────────────────────
export const font = "'Noto Sans SC', 'DM Sans', sans-serif";

// ─── 穿搭师名称（全局可改） ─────────────────────────────────────────────────
export const STYLIST_NAME = "席霖";

// ─── 图片资源 ────────────────────────────────────────────────────────────────
export const IMG = {
  hero: "https://images.unsplash.com/photo-1674457343601-85eacbf0f4b4?w=800&h=900&fit=crop&auto=format",
  look1: "https://images.unsplash.com/photo-1664076458686-3449062080ac?w=400&h=560&fit=crop&auto=format",
  look2: "https://images.unsplash.com/photo-1629511565591-a1d494ad6c58?w=400&h=560&fit=crop&auto=format",
  look3: "https://images.unsplash.com/photo-1627130697816-4d71dbfe6a5b?w=400&h=560&fit=crop&auto=format",
  wardrobe1: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=300&h=360&fit=crop&auto=format",
  wardrobe2: "https://images.unsplash.com/photo-1603400521630-9f2de124b33b?w=300&h=360&fit=crop&auto=format",
  wardrobe3: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&h=360&fit=crop&auto=format",
  wardrobe4: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=300&h=360&fit=crop&auto=format",
  wardrobe5: "https://images.unsplash.com/photo-1517502166878-35c93a0072f0?w=300&h=360&fit=crop&auto=format",
  wardrobe6: "https://images.unsplash.com/photo-1621773881532-fe65715b5137?w=300&h=360&fit=crop&auto=format",
  product: "https://images.unsplash.com/photo-1664076458686-3449062080ac?w=800&h=900&fit=crop&auto=format",
};

// ─── 衣橱分类 ──────────────────────────────────────────────────────────────
export const wardrobeCategories = [
  { label: "上衣", count: 12 },
  { label: "裤子", count: 8 },
  { label: "裙子", count: 15 },
  { label: "鞋包", count: 6 },
];

// ─── 底部 Tab ──────────────────────────────────────────────────────────────
export const tabs: TabItem[] = [
  { key: "home", label: "首页", icon: "home" },
  { key: "recommend", label: "推荐", icon: "sparkles" },
  { key: "mine", label: "我的", icon: "user" },
];

// ─── Mock 数据 ──────────────────────────────────────────────────────────────
export const wardrobeItems: WardrobeItem[] = [
  { id: 1, img: IMG.wardrobe1, name: "白色薄棉衬衫", date: "2026.3", times: 8 },
  { id: 2, img: IMG.wardrobe2, name: "驼色羊绒大衣", date: "2025.11", times: 14 },
  { id: 3, img: IMG.wardrobe3, name: "米色高腰阔腿裤", date: "2026.4", times: 6 },
  { id: 4, img: IMG.wardrobe4, name: "黑色西装外套", date: "2026.2", times: 11 },
  { id: 5, img: IMG.wardrobe5, name: "浅蓝牛仔外套", date: "2025.9", times: 5 },
  { id: 6, img: IMG.wardrobe6, name: "白色Polo领针织", date: "2026.5", times: 3 },
];

export const notesData: NoteData[] = [
  {
    img: import.meta.env.BASE_URL + "assets/notes/note1.jpg",
    title: "我保证我是天使 只是偶尔有点坏",
    likes: "6138",
    author: "弹性十足",
    body: "我保证我是天使 只是偶尔有点坏\n\n#韩系 #自拍姿势 #红与黑的碰撞 #cleanfit简单出门 #ootd每日穿搭 #小黑裙 #黑色系穿搭",
    images: [import.meta.env.BASE_URL + "assets/notes/note1.jpg"],
    tags: ["韩系", "自拍姿势", "红与黑的碰撞", "cleanfit简单出门", "ootd每日穿搭", "小黑裙", "黑色系穿搭"],
    link: "http://xhslink.cn/o/5MeQMyKGXrk",
    imageCount: "7",
  },
  {
    img: import.meta.env.BASE_URL + "assets/notes/note2.jpg",
    title: "淡人韩系穿搭",
    likes: "4182",
    author: "弹性十足",
    body: "淡人韩系穿搭\n\n#韩系 #自拍姿势 #cleanfit简单出门 #对镜拍 #喜欢一些对镜拍 #镜子里啥样我啥样 #对镜子拍照 #今天穿什么 #对着镜子自拍 #镜子里的自己",
    images: [import.meta.env.BASE_URL + "assets/notes/note2.jpg"],
    tags: ["韩系", "自拍姿势", "cleanfit简单出门", "对镜拍", "喜欢一些对镜拍", "镜子里啥样我啥样", "对镜子拍照", "今天穿什么", "对着镜子自拍", "镜子里的自己"],
    link: "http://xhslink.cn/o/6wyUJBW2D6K",
    imageCount: "7",
  },
  {
    img: import.meta.env.BASE_URL + "assets/notes/note3.jpg",
    title: "一周穿搭（double版）",
    likes: "2.4万",
    author: "不是山",
    body: "一周穿搭（double版）\n\n14张穿搭图，日常通勤与周末休闲全覆盖，照着穿不出错。",
    images: [import.meta.env.BASE_URL + "assets/notes/note3.jpg"],
    tags: ["一周穿搭", "日常穿搭", "通勤穿搭", "休闲风"],
    link: "http://xhslink.cn/o/Iz4QUZH3Dv",
    imageCount: "14",
  },
];

export const ordersData: OrderData[] = [
  { id: "DD20260806001", status: "pending_pay", statusLabel: "待付款", img: IMG.look1, name: "银色抹胸缎面礼服造型套装", price: 899, date: "2026-08-06", items: "抹胸长款缎面礼服裙+ 渐变黑长款手套" },
  { id: "DD20260805002", status: "pending_pay", statusLabel: "待付款", img: IMG.look2, name: "宝蓝廓形西装套装造型", price: 1260, date: "2026-08-05", items: "阔肩宝蓝色西装 + 同面料阔腿西裤" },
  { id: "DD20260804003", status: "pending_pay", statusLabel: "待付款", img: IMG.wardrobe3, name: "蕾丝 V 领白上衣", price: 329, date: "2026-08-04", items: "蕾丝 V 领白上衣、小波点衬衫、碎花印花衬衣" },
  { id: "DD20260803004", status: "pending_ship", statusLabel: "待发货", img: IMG.look3, name: "浅燕麦短款西装两件套休闲通勤", price: 680, date: "2026-08-03", items: "短款翻领小西装 + 白色短款抹胸内搭 + 同面料高腰阔腿西裤" },
  { id: "DD20260730005", status: "pending_review", statusLabel: "待评价", img: IMG.wardrobe1, name: "温柔肌理感针织衣", price: 199, date: "2026-07-30", items: "蛇纹印花吊带、浅棕坑条针织" },
  { id: "DD20260728006", status: "pending_review", statusLabel: "待评价", img: IMG.wardrobe4, name: "中性简约穿搭", price: 599, date: "2026-07-28", items: "深灰工装衬衫、焦糖长款风衣、白打底、浅蓝水洗牛仔外套" },
  { id: "DD20260720007", status: "refund", statusLabel: "退换货", img: IMG.wardrobe5, name: "纯白塑料衣架单品", price: 359, date: "2026-07-20", items: "哑光白色宽肩", refundStatus: "退款处理中" },
  { id: "DD20260715008", status: "refund", statusLabel: "退换货", img: IMG.wardrobe6, name: "基础款白短袖衬衫", price: 259, date: "2026-07-15", items: "基础款翻领短袖白衬衫，宽松微落肩版型", refundStatus: "已退款" },
  { id: "DD20260710009", status: "done", statusLabel: "已完成", img: IMG.wardrobe2, name: "暖色系日常", price: 1299, date: "2026-07-10", items: "米白棉麻衬衫、焦糖橘红针织上衣、米杏休闲阔腿裤" },
  { id: "DD20260705100", status: "done", statusLabel: "已完成", img: IMG.look3, name: "浅燕麦短款西装两件套休闲通勤", price: 680, date: "2026-07-05", items: "短款翻领小西装 + 白色短款抹胸内搭 + 同面料高腰阔腿西裤" },
];

export const favoritesData: FavoriteData[] = [
  { id: 1, img: IMG.look1, name: "银色抹胸缎面礼服造型套装", price: 899, type: "搭配" },
  { id: 2, img: IMG.look2, name: "宝蓝廓形西装套装造型", price: 1260, type: "搭配" },
  { id: 3, img: IMG.wardrobe1, name: "温柔肌理感针织衣", price: 199, type: "单品" },
  { id: 4, img: IMG.wardrobe2, name: "暖色系日常", price: 1299, type: "单品" },
  { id: 5, img: IMG.look3, name: "浅燕麦短款西装两件套休闲通勤", price: 680, type: "搭配" },
  { id: 6, img: IMG.wardrobe4, name: "中性简约穿搭", price: 599, type: "单品" },
];

export const couponsData: CouponData[] = [
  { id: 1, amount: 100, threshold: 500, name: "新人专享券", expire: "2026-08-31", status: "available" },
  { id: 2, amount: 50, threshold: 300, name: "满减优惠券", expire: "2026-08-20", status: "available" },
  { id: 3, amount: 200, threshold: 1000, name: "VIP 专享券", expire: "2026-09-15", status: "available" },
  { id: 4, amount: 30, threshold: 200, name: "夏日清凉券", expire: "2026-07-31", status: "expired" },
  { id: 5, amount: 80, threshold: 400, name: "会员日券", expire: "2026-06-30", status: "expired" },
];

export const recordsData: RecordData[] = [
  { id: 1, date: "2026-08-06", img: IMG.look1, title: "银色抹胸缎面礼服造型套装", scene: "约会", weather: "晴 28°C", note: "今天穿了白衬衫搭配阔腿裤，干练又不失优雅" },
  { id: 2, date: "2026-08-05", img: IMG.look2, title: "宝蓝廓形西装套装造型", scene: "约会", weather: "多云 26°C", note: "黑色西装搭配丝绒裙，晚上约会很合适" },
  { id: 3, date: "2026-08-03", img: IMG.look3, title: "浅燕麦短款西装两件套休闲通勤", scene: "旅行", weather: "晴 32°C", note: "周末去海边，穿了轻盈的度假风搭配" },
  { id: 4, date: "2026-08-01", img: IMG.wardrobe4, title: "中性简约穿搭", scene: "通勤", weather: "阴 25°C", note: "黑色西装外套搭配白T，简约利落" },
  { id: 5, date: "2026-07-28", img: IMG.wardrobe2, title: "暖色系日常", scene: "日常", weather: "雨 20°C", note: "下雨天穿了驼色大衣，温暖又有型" },
];

export const vipBenefits: VipBenefit[] = [
  { icon: "💬", title: "专属搭配问答", desc: "1对1穿搭顾问，随时解答搭配疑问" },
  { icon: "👗", title: "每周专属穿搭建议", desc: "专业穿搭师每周为你定制 3 套搭配方案" },
  { icon: "🛍️", title: "新品优先体验", desc: "每季新品提前 7 天优先选购" },
  { icon: "🎁", title: "消费积分", desc: "订单转积分双倍累计" },
  { icon: "🚚", title: "全年免邮", desc: "所有订单全年免运费" },
];

export const looks: Look[] = [
  {
    id: 1,
    img: import.meta.env.BASE_URL + "assets/looks/41.png",
    scene: "约会",
    title: "高级感白领风",
    items: "红色连衣皮裙+ 红色高跟鞋",
    price: 899,
    liked: false,
    video: "https://admins3.tos-cn-shanghai.volces.com/Ai-Video/1.mp4",
  },
  {
    id: 2,
    img: import.meta.env.BASE_URL + "assets/looks/51.png",
    scene: "通勤",
    title: "都市柔美格调",
    items: "红色西装 + 丝绒裙 + 高跟鞋",
    price: 1260,
    liked: false,
    video: "https://admins3.tos-cn-shanghai.volces.com/Ai-Video/3.mp4",
  },
  {
    id: 3,
    img: import.meta.env.BASE_URL + "assets/looks/61.jpg",
    scene: "旅行",
    title: "轻盈度假系",
    items: "皮裙套装 + 白色衬衣 + 高跟鞋",
    price: 680,
    liked: false,
    video: "https://admins3.tos-cn-shanghai.volces.com/Ai-Video/5.mp4",
  },
];

export const productDetails: Record<number, ProductDetail> = {
  // 穿搭定制页：通勤 / 约会 / 旅行
  1: {
    flatImgs: [import.meta.env.BASE_URL + "assets/looks/42.png"],
    reasons: ["修饰肩型，西装垫肩显宽肩高挑", "高腰阔腿裤拉长轴线，强调腰线比例", "白衬衫挺括不透，通勤百搭不出错"],
    lengthLabel: "裤长",
    sizeChart: [
      { size: "S", shoulder: "38", bust: "92", waist: "72", length: "98" },
      { size: "M", shoulder: "39", bust: "96", waist: "76", length: "100" },
      { size: "L", shoulder: "40", bust: "100", waist: "80", length: "102" },
      { size: "XL", shoulder: "41", bust: "104", waist: "84", length: "104" },
    ],
    reviews: [
      { user: "Mia", initial: "M", rating: 5, size: "M", content: "面料很有质感，白衬衫不透，阔腿裤垂感好，通勤穿特别有气场。身高165体重50，M码刚刚好。", date: "2026.07.22", likes: 36 },
      { user: "安然", initial: "安", rating: 4, size: "L", content: "整体版型很正，西装裤偏长我162需要裁两厘米，但上身效果值得。", date: "2026.07.18", likes: 21 },
      { user: "Lily妈", initial: "L", rating: 5, size: "S", content: `回购第二套送闺蜜，包装精致，${STYLIST_NAME}推荐果然靠谱，同事都问链接。`, date: "2026.07.15", likes: 18 },
    ],
  },
  2: {
    flatImgs: [import.meta.env.BASE_URL + "assets/looks/52.png"],
    reasons: ["丝绒光泽感强，灯光下更显白显瘦", "收腰 A 字裙摆遮胯，约会穿很上镜", "西装短外套中和柔美，气场与温柔兼得"],
    lengthLabel: "裙长",
    sizeChart: [
      { size: "S", shoulder: "37", bust: "88", waist: "68", length: "92" },
      { size: "M", shoulder: "38", bust: "92", waist: "72", length: "94" },
      { size: "L", shoulder: "39", bust: "96", waist: "76", length: "96" },
      { size: "XL", shoulder: "40", bust: "100", waist: "80", length: "98" },
    ],
    reviews: [
      { user: "糖糖", initial: "糖", rating: 5, size: "S", content: "丝绒裙太美了，灯光下很有光泽，约会穿被夸了一晚上，显瘦显白。", date: "2026.07.24", likes: 42 },
      { user: "Vivian", initial: "V", rating: 5, size: "M", content: "西装挺括不显壮，小个子也能撑起来，袖长刚好，做工细节很到位。", date: "2026.07.20", likes: 27 },
      { user: "阿May", initial: "M", rating: 4, size: "M", content: "皮包颜值在线，就是容量偏小放不下手机，介意的慎拍。", date: "2026.07.12", likes: 15 },
    ],
  },
  3: {
    flatImgs: [import.meta.env.BASE_URL + "assets/looks/62.png"],
    reasons: ["针织轻薄透气，海边度假整天不闷热", "草编帽提升拍照出片率，遮阳又减龄", "白色长裤清爽凉快，洗涤不易变形"],
    lengthLabel: "裤长",
    sizeChart: [
      { size: "S", shoulder: "36", bust: "86", waist: "66", length: "96" },
      { size: "M", shoulder: "37", bust: "90", waist: "70", length: "98" },
      { size: "L", shoulder: "38", bust: "94", waist: "74", length: "100" },
      { size: "XL", shoulder: "39", bust: "98", waist: "78", length: "102" },
    ],
    reviews: [
      { user: "旅行的鱼", initial: "鱼", rating: 5, size: "M", content: "度假穿太合适了，针织轻薄透气，草编帽拍照神器，旅拍出片率超高。", date: "2026.07.23", likes: 33 },
      { user: "Coco", initial: "C", rating: 5, size: "L", content: "白色长裤凉快，海边走一天也不闷，洗了没透没变形，质量在线。", date: "2026.07.19", likes: 24 },
      { user: "夏天", initial: "夏", rating: 4, size: "M", content: "针织衫稍微起球，其他都好，整体性价比高，会再买别的色。", date: "2026.07.10", likes: 12 },
    ],
  },
  // 首页轮播：第 1/2/3 屏（与穿搭定制页使用不同封面与平铺图）
  11: {
    flatImgs: [import.meta.env.BASE_URL + "assets/looks/12.png"],
    reasons: ["廓形西装修饰肩背，通勤利落有精神", "直筒西裤显腿直，小个子也能穿出气场", "垂感面料抗皱好打理，久坐不出褶"],
    lengthLabel: "裤长",
    sizeChart: [
      { size: "S", shoulder: "38", bust: "92", waist: "72", length: "98" },
      { size: "M", shoulder: "39", bust: "96", waist: "76", length: "100" },
      { size: "L", shoulder: "40", bust: "100", waist: "80", length: "102" },
      { size: "XL", shoulder: "41", bust: "104", waist: "84", length: "104" },
    ],
    reviews: [
      { user: "Mia", initial: "M", rating: 5, size: "M", content: "面料很有质感，白衬衫不透，阔腿裤垂感好，通勤穿特别有气场。身高165体重50，M码刚刚好。", date: "2026.07.22", likes: 36 },
      { user: "安然", initial: "安", rating: 4, size: "L", content: "整体版型很正，西装裤偏长我162需要裁两厘米，但上身效果值得。", date: "2026.07.18", likes: 21 },
      { user: "Lily妈", initial: "L", rating: 5, size: "S", content: `回购第二套送闺蜜，包装精致，${STYLIST_NAME}推荐果然靠谱，同事都问链接。`, date: "2026.07.15", likes: 18 },
    ],
  },
  12: {
    flatImgs: [import.meta.env.BASE_URL + "assets/looks/22.png"],
    reasons: ["吊带裙叠穿西装，层次丰富不单调", "高腰线设计拉高视觉重心，显比例", "金属配饰点缀，约会氛围感拉满"],
    lengthLabel: "裙长",
    sizeChart: [
      { size: "S", shoulder: "37", bust: "88", waist: "68", length: "92" },
      { size: "M", shoulder: "38", bust: "92", waist: "72", length: "94" },
      { size: "L", shoulder: "39", bust: "96", waist: "76", length: "96" },
      { size: "XL", shoulder: "40", bust: "100", waist: "80", length: "98" },
    ],
    reviews: [
      { user: "糖糖", initial: "糖", rating: 5, size: "S", content: "丝绒裙太美了，灯光下很有光泽，约会穿被夸了一晚上，显瘦显白。", date: "2026.07.24", likes: 42 },
      { user: "Vivian", initial: "V", rating: 5, size: "M", content: "西装挺括不显壮，小个子也能撑起来，袖长刚好，做工细节很到位。", date: "2026.07.20", likes: 27 },
      { user: "阿May", initial: "M", rating: 4, size: "M", content: "皮包颜值在线，就是容量偏小放不下手机，介意的慎拍。", date: "2026.07.12", likes: 15 },
    ],
  },
  13: {
    flatImgs: [import.meta.env.BASE_URL + "assets/looks/32.png"],
    reasons: ["亚麻混纺透气，夏天穿不贴身不闷汗", "阔腿短裤清爽显腿长，度假松弛感拉满", "草编托特容量大，出海带娃一包搞定"],
    lengthLabel: "裤长",
    sizeChart: [
      { size: "S", shoulder: "36", bust: "86", waist: "66", length: "96" },
      { size: "M", shoulder: "37", bust: "90", waist: "70", length: "98" },
      { size: "L", shoulder: "38", bust: "94", waist: "74", length: "100" },
      { size: "XL", shoulder: "39", bust: "98", waist: "78", length: "102" },
    ],
    reviews: [
      { user: "旅行的鱼", initial: "鱼", rating: 5, size: "M", content: "度假穿太合适了，针织轻薄透气，草编帽拍照神器，旅拍出片率超高。", date: "2026.07.23", likes: 33 },
      { user: "Coco", initial: "C", rating: 5, size: "L", content: "白色长裤凉快，海边走一天也不闷，洗了没透没变形，质量在线。", date: "2026.07.19", likes: 24 },
      { user: "夏天", initial: "夏", rating: 4, size: "M", content: "针织衫稍微起球，其他都好，整体性价比高，会再买别的色。", date: "2026.07.10", likes: 12 },
    ],
  },
};
