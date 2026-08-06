import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Home,
  Sparkles,
  User,
  Plus,
  ChevronRight,
  Heart,
  ShoppingBag,
  Bell,
  Play,
  Award,
  Package,
  Tag,
  Headphones,
  X,
  Check,
  Star,
  Clock,
  Camera,
  Share2,
  Ellipsis,
  MessageCircle,
  Bookmark,
  Phone,
} from "lucide-react";

type Tab = "home" | "recommend" | "mine";
type SubPage = "live" | "product" | "tryon" | "note" | "orders" | "favorites" | "coupons" | "records" | "vip" | null;

const ACCENT = "#b8874a";
const ACCENT_LIGHT = "#f5ede0";
const BG = "#faf8f5";
const CARD = "#ffffff";
const TEXT = "#1c1a17";
const MUTED = "#9a8f82";

const IMG = {
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

const font = "'Noto Sans SC', 'DM Sans', sans-serif";

function Pill({ children, active, onClick }: { children: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? ACCENT : ACCENT_LIGHT,
        color: active ? "#fff" : ACCENT,
        fontFamily: font,
        fontSize: 13,
        fontWeight: 500,
        padding: "5px 16px",
        borderRadius: 20,
        border: "none",
        cursor: "pointer",
        transition: "all 0.2s",
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ onGoProduct, onGoNote }: { onGoProduct: () => void; onGoNote: (note: (typeof notesData)[0]) => void }) {
  return (
    <div style={{ paddingBottom: 80, overflowY: "auto", height: "100%" }}>
      {/* Top bar */}
      <div style={{ padding: "16px 20px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Bell size={20} color={MUTED} />
        <span style={{ fontFamily: font, fontSize: 15, fontWeight: 500, color: TEXT, letterSpacing: 2 }}>董洁</span>
        <ShoppingBag size={20} color={MUTED} />
      </div>

      {/* Profile strip */}
      <div style={{ padding: "0 20px 20px", display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: `2px solid ${ACCENT}` }}>
          <img src={IMG.hero} alt="董洁" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div>
          <div style={{ fontFamily: font, fontSize: 16, fontWeight: 700, color: TEXT }}>董洁</div>
          <div style={{ fontFamily: font, fontSize: 12, color: MUTED, marginTop: 2 }}>生活美学穿搭空间</div>
        </div>
        <div style={{ marginLeft: "auto", textAlign: "center" }}>
          <div style={{ fontFamily: font, fontSize: 17, fontWeight: 700, color: ACCENT }}>128<span style={{ fontSize: 11, fontWeight: 400 }}>万</span></div>
          <div style={{ fontFamily: font, fontSize: 11, color: MUTED }}>粉丝</div>
        </div>
      </div>

      {/* Today's recommendation hero */}
      <div style={{ margin: "0 20px 16px", borderRadius: 20, overflow: "hidden", position: "relative", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
        <img src={IMG.look1} alt="今日推荐" style={{ width: "100%", height: 320, objectFit: "cover", display: "block" }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(28,26,23,0.82) 0%, rgba(28,26,23,0.1) 55%, transparent 100%)",
        }} />
        <div style={{ position: "absolute", top: 14, left: 14 }}>
          <span style={{ background: ACCENT, color: "#fff", fontFamily: font, fontSize: 11, fontWeight: 500, padding: "3px 10px", borderRadius: 10 }}>今日推荐</span>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 18px 18px" }}>
          <div style={{ fontFamily: font, fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 4 }}>今天适合你的 3 套穿搭</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            {["显瘦通勤风", "165cm+", "轻熟风"].map(t => (
              <span key={t} style={{ background: "rgba(255,255,255,0.2)", color: "#fff", fontFamily: font, fontSize: 11, padding: "2px 9px", borderRadius: 8, backdropFilter: "blur(4px)" }}>{t}</span>
            ))}
          </div>
          <button
            onClick={onGoProduct}
            style={{ background: ACCENT, color: "#fff", fontFamily: font, fontSize: 13, fontWeight: 600, padding: "9px 20px", borderRadius: 22, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
          >
            查看今日搭配 <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* 小红书种草文章 */}
      <div style={{ margin: "0 20px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              background: "linear-gradient(135deg, #ff2442, #ff6b6b)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              color: "#fff",
              fontWeight: 700,
              fontFamily: font,
            }}>
             红
            </div>
            <span style={{ fontFamily: font, fontSize: 15, fontWeight: 700, color: TEXT }}>种草笔记</span>
          </div>
          <button style={{
            background: "none",
            border: "none",
            color: ACCENT,
            fontFamily: font,
            fontSize: 12,
            fontWeight: 500,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}>
            更多 <ChevronRight size={14} />
          </button>
        </div>

        <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }}>
          {notesData.map((article, i) => (
            <div
              key={i}
              onClick={() => onGoNote(article)}
              style={{
              flexShrink: 0,
              width: 140,
              background: CARD,
              borderRadius: 14,
              overflow: "hidden",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
              cursor: "pointer",
            }}>
              <div style={{ height: 140, overflow: "hidden", position: "relative" }}>
                <img src={article.img} alt={article.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                {/* image tag */}
                <div style={{
                  position: "absolute",
                  bottom: 6,
                  right: 6,
                  background: "rgba(0,0,0,0.55)",
                  color: "#fff",
                  fontFamily: font,
                  fontSize: 10,
                  padding: "2px 6px",
                  borderRadius: 4,
                }}>
                  9图
                </div>
              </div>
              <div style={{ padding: "8px 10px 10px" }}>
                <div style={{
                  fontFamily: font,
                  fontSize: 12,
                  fontWeight: 600,
                  color: TEXT,
                  lineHeight: 1.4,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  marginBottom: 6,
                  minHeight: 34,
                }}>
                  {article.title}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: font, fontSize: 10, color: "#999" }}>{article.author}</span>
                  <span style={{
                    fontFamily: font,
                    fontSize: 11,
                    color: "#ff2442",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}>
                    ♥ {article.likes}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VIP section */}
      <div style={{
        margin: "0 20px 24px",
        background: `linear-gradient(135deg, #3a2a18 0%, #6b4a28 100%)`,
        borderRadius: 18, padding: "20px 18px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <Award size={16} color={ACCENT} />
          <span style={{ fontFamily: font, fontSize: 14, fontWeight: 700, color: "#f5d9a8" }}>加入 VIP 会员</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
          {["每周专属穿搭建议", "新品优先体验", "专属搭配问答"].map(item => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Check size={12} color={ACCENT} />
              <span style={{ fontFamily: font, fontSize: 13, color: "#d4b483" }}>{item}</span>
            </div>
          ))}
        </div>
        <button style={{
          background: ACCENT, color: "#fff", fontFamily: font, fontSize: 13, fontWeight: 600,
          padding: "9px 20px", borderRadius: 22, border: "none", cursor: "pointer",
        }}>
          成为会员
        </button>
      </div>
    </div>
  );
}

// ─── WARDROBE PAGE ────────────────────────────────────────────────────────────
const wardrobeCategories = [
  { label: "上衣", count: 12 },
  { label: "裤子", count: 8 },
  { label: "裙子", count: 15 },
  { label: "鞋包", count: 6 },
];
const wardrobeItems = [
  { id: 1, img: IMG.wardrobe1, name: "白色薄棉衬衫", date: "2026.3", times: 8 },
  { id: 2, img: IMG.wardrobe2, name: "驼色羊绒大衣", date: "2025.11", times: 14 },
  { id: 3, img: IMG.wardrobe3, name: "米色高腰阔腿裤", date: "2026.4", times: 6 },
  { id: 4, img: IMG.wardrobe4, name: "黑色西装外套", date: "2026.2", times: 11 },
  { id: 5, img: IMG.wardrobe5, name: "浅蓝牛仔外套", date: "2025.9", times: 5 },
  { id: 6, img: IMG.wardrobe6, name: "白色Polo领针织", date: "2026.5", times: 3 },
];

const notesData = [
  {
    img: IMG.look2,
    title: "夏日通勤穿搭｜一周不重样",
    likes: "2.3万",
    author: "穿搭灵感簿",
    body: "分享一周通勤穿搭灵感✨\n\n周一到周五，每天都有不同的搭配思路。这周主打简约通勤风，以基础款为主，通过配饰和色彩点缀提升整体质感。\n\n周一选了白色衬衫搭配高腰西裤，清爽干练；周三换上了柔和的针织开衫，温柔知性；周五则轻松一些，用宽松的亚麻衬衫收尾。\n\n关键单品推荐：\n• 垂感高腰西裤 — 修饰腿型第一名\n• 薄款醋酸衬衫 — 透气不闷热\n• 细带中跟凉鞋 — 舒适又拉长比例\n\n每一套都适合办公室穿着，同时下班后也能轻松过渡到晚间的聚会～",
    images: [IMG.look2, IMG.look1, IMG.look3],
    tags: ["通勤穿搭", "简约风", "一周搭配"],
  },
  {
    img: IMG.look1,
    title: "梨形身材的天菜！这三套绝了",
    likes: "1.8万",
    author: "是小陈呀",
    body: "作为典型的梨形身材，选衣服真的踩了太多雷！😭\n\n经过多年摸索，总结出三个黄金法则：\n\n1️⃣ 上浅下深 — 视觉重心上移\n2️⃣ 高腰线 — 拉长腿部比例\n3️⃣ A字下摆 — 完美遮胯\n\n这三套是我近期最满意的搭配，每一套都扬长避短。尤其是那件米色高腰阔腿裤，版型真的太好了，穿上直接显高5cm！\n\n梨形姐妹们冲就完事了～",
    images: [IMG.look1, IMG.look2, IMG.look3],
    tags: ["梨形穿搭", "显瘦", "版型推荐"],
  },
  {
    img: IMG.look3,
    title: "董洁同款，普通人也能驾驭",
    likes: "5.6万",
    author: "Lily穿搭记",
    body: "一直很喜欢董洁的穿搭风格，优雅又不失松弛感。\n\n这次扒了她的几套日常look，发现她的穿搭秘诀其实很简单：\n\n✨ 基础款为主，不超过三种颜色\n✨ 材质优选天然面料（棉麻、羊毛、真丝）\n✨ 配饰点到为止，不堆砌\n✨ 鞋子决定风格，平底乐福鞋是她的最爱\n\n我按照这个思路复刻了其中三套，惊喜地发现普通人穿也很好看！\n\n高级感不等于贵，选对款比选贵更重要～",
    images: [IMG.look3, IMG.look2, IMG.look1],
    tags: ["明星同款", "高级感", "日常穿搭"],
  },
];

// ─── MOCK DATA: Orders / Favorites / Coupons / Records / VIP ──────────────────
const ordersData: { id: string; status: string; statusLabel: string; img: string; name: string; price: number; date: string; items: string; refundStatus?: string }[] = [
  { id: "DD20260806001", status: "pending_pay", statusLabel: "待付款", img: IMG.look1, name: "高级感白领风套装", price: 899, date: "2026-08-06", items: "白衬衫 + 阔腿裤 + 高跟鞋" },
  { id: "DD20260805002", status: "pending_pay", statusLabel: "待付款", img: IMG.look2, name: "都市柔美格调", price: 1260, date: "2026-08-05", items: "黑色西装 + 丝绒裙 + 小皮包" },
  { id: "DD20260804003", status: "pending_pay", statusLabel: "待付款", img: IMG.wardrobe3, name: "米色高腰阔腿裤", price: 329, date: "2026-08-04", items: "米色阔腿裤" },
  { id: "DD20260803004", status: "pending_ship", statusLabel: "待发货", img: IMG.look3, name: "轻盈度假系套装", price: 680, date: "2026-08-03", items: "白色长裤 + 针织衫 + 草编帽" },
  { id: "DD20260730005", status: "pending_review", statusLabel: "待评价", img: IMG.wardrobe1, name: "白色薄棉衬衫", price: 199, date: "2026-07-30", items: "白色衬衫" },
  { id: "DD20260728006", status: "pending_review", statusLabel: "待评价", img: IMG.wardrobe4, name: "黑色西装外套", price: 599, date: "2026-07-28", items: "黑色西装外套" },
  { id: "DD20260720007", status: "refund", statusLabel: "退换货", img: IMG.wardrobe5, name: "浅蓝牛仔外套", price: 359, date: "2026-07-20", items: "牛仔外套", refundStatus: "退款处理中" },
  { id: "DD20260715008", status: "refund", statusLabel: "退换货", img: IMG.wardrobe6, name: "白色Polo领针织", price: 259, date: "2026-07-15", items: "针织衫", refundStatus: "已退款" },
  { id: "DD20260710009", status: "done", statusLabel: "已完成", img: IMG.wardrobe2, name: "驼色羊绒大衣", price: 1299, date: "2026-07-10", items: "驼色大衣" },
  { id: "DD20260705100", status: "done", statusLabel: "已完成", img: IMG.look3, name: "旅行轻装穿搭", price: 680, date: "2026-07-05", items: "白色长裤 + 针织衫" },
];

const favoritesData = [
  { id: 1, img: IMG.look1, name: "高级感白领风", price: 899, type: "搭配" },
  { id: 2, img: IMG.look2, name: "都市柔美格调", price: 1260, type: "搭配" },
  { id: 3, img: IMG.wardrobe1, name: "白色薄棉衬衫", price: 199, type: "单品" },
  { id: 4, img: IMG.wardrobe2, name: "驼色羊绒大衣", price: 1299, type: "单品" },
  { id: 5, img: IMG.look3, name: "轻盈度假系", price: 680, type: "搭配" },
  { id: 6, img: IMG.wardrobe4, name: "黑色西装外套", price: 599, type: "单品" },
];

const couponsData = [
  { id: 1, amount: 100, threshold: 500, name: "新人专享券", expire: "2026-08-31", status: "available" },
  { id: 2, amount: 50, threshold: 300, name: "满减优惠券", expire: "2026-08-20", status: "available" },
  { id: 3, amount: 200, threshold: 1000, name: "VIP 专享券", expire: "2026-09-15", status: "available" },
  { id: 4, amount: 30, threshold: 200, name: "夏日清凉券", expire: "2026-07-31", status: "expired" },
  { id: 5, amount: 80, threshold: 400, name: "会员日券", expire: "2026-06-30", status: "expired" },
];

const recordsData = [
  { id: 1, date: "2026-08-06", img: IMG.look1, title: "高级感白领风", scene: "通勤", weather: "晴 28°C", note: "今天穿了白衬衫搭配阔腿裤，干练又不失优雅" },
  { id: 2, date: "2026-08-05", img: IMG.look2, title: "都市柔美格调", scene: "约会", weather: "多云 26°C", note: "黑色西装搭配丝绒裙，晚上约会很合适" },
  { id: 3, date: "2026-08-03", img: IMG.look3, title: "轻盈度假系", scene: "旅行", weather: "晴 32°C", note: "周末去海边，穿了轻盈的度假风搭配" },
  { id: 4, date: "2026-08-01", img: IMG.wardrobe4, title: "黑色西装穿搭", scene: "通勤", weather: "阴 25°C", note: "黑色西装外套搭配白T，简约利落" },
  { id: 5, date: "2026-07-28", img: IMG.wardrobe2, title: "驼色大衣造型", scene: "日常", weather: "雨 20°C", note: "下雨天穿了驼色大衣，温暖又有型" },
];

const vipBenefits = [
  { icon: "👗", title: "每周专属穿搭建议", desc: "专业穿搭师每周为你定制 3 套搭配方案" },
  { icon: "🛍️", title: "新品优先体验", desc: "每季新品提前 7 天优先选购" },
  { icon: "💬", title: "专属搭配问答", desc: "1对1穿搭顾问，随时解答搭配疑问" },
  { icon: "🎁", title: "生日双倍积分", desc: "生日月消费积分双倍累计" },
  { icon: "🚚", title: "全年免邮", desc: "所有订单全年免运费" },
  { icon: "↩️", title: "30天无理由退换", desc: "VIP 专享 30 天无理由退换货服务" },
];

function WardrobePage({ onGoTryOn }: { onGoTryOn: (item: (typeof wardrobeItems)[0]) => void }) {
  const [activeCategory, setActiveCategory] = useState("上衣");
  return (
    <div style={{ paddingBottom: 80, overflowY: "auto", height: "100%" }}>
      <div style={{ padding: "16px 20px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: font, fontSize: 20, fontWeight: 700, color: TEXT }}>我的衣橱</span>
        <button style={{ background: ACCENT_LIGHT, border: "none", borderRadius: 20, padding: "7px 14px", display: "flex", alignItems: "center", gap: 5, cursor: "pointer" }}>
          <Plus size={14} color={ACCENT} />
          <span style={{ fontFamily: font, fontSize: 13, color: ACCENT, fontWeight: 500 }}>添加衣服</span>
        </button>
      </div>

      {/* Category tabs */}
      <div style={{ padding: "0 20px 16px", display: "flex", gap: 8, overflowX: "auto" }}>
        {wardrobeCategories.map(c => (
          <button
            key={c.label}
            onClick={() => setActiveCategory(c.label)}
            style={{
              flexShrink: 0,
              background: activeCategory === c.label ? ACCENT : ACCENT_LIGHT,
              color: activeCategory === c.label ? "#fff" : ACCENT,
              fontFamily: font, fontSize: 13, fontWeight: 500,
              padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer",
            }}
          >
            {c.label} <span style={{ opacity: 0.7 }}>{c.count}</span>
          </button>
        ))}
      </div>

      {/* Stats bar */}
      <div style={{ margin: "0 20px 16px", background: ACCENT_LIGHT, borderRadius: 14, padding: "12px 16px", display: "flex", justifyContent: "space-around" }}>
        {[{ label: "单品总数", value: "41" }, { label: "本月穿搭", value: "18次" }, { label: "利用率", value: "76%" }].map(s => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: font, fontSize: 18, fontWeight: 700, color: ACCENT }}>{s.value}</div>
            <div style={{ fontFamily: font, fontSize: 11, color: MUTED }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div style={{ padding: "0 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {wardrobeItems.map(item => (
          <div key={item.id} style={{ background: CARD, borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
            <div style={{ height: 150, background: "#f0ebe3", overflow: "hidden", position: "relative" }}>
              <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              {/* AI 试衣按钮 */}
              <button
                onClick={(e) => { e.stopPropagation(); onGoTryOn(item); }}
                style={{
                  position: "absolute",
                  bottom: 8,
                  right: 8,
                  background: `linear-gradient(135deg, ${ACCENT}, #d4a56a)`,
                  color: "#fff",
                  fontFamily: font,
                  fontSize: 11,
                  fontWeight: 600,
                  padding: "5px 10px",
                  borderRadius: 14,
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  boxShadow: "0 2px 8px rgba(184,135,74,0.4)",
                  zIndex: 5,
                }}
              >
                <Sparkles size={11} /> AI试衣
              </button>
            </div>
            <div style={{ padding: "10px 12px 12px" }}>
              <div style={{ fontFamily: font, fontSize: 13, fontWeight: 500, color: TEXT, marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: font, fontSize: 11, color: MUTED }}>{item.date}</span>
                <span style={{ fontFamily: font, fontSize: 11, color: ACCENT }}>穿 {item.times} 次</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload FAB */}
      <div style={{ margin: "24px 20px 0", background: CARD, borderRadius: 18, padding: "16px 18px", border: `1.5px dashed ${ACCENT}`, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, cursor: "pointer" }}>
        <Camera size={18} color={ACCENT} />
        <span style={{ fontFamily: font, fontSize: 14, color: ACCENT, fontWeight: 500 }}>上传我的衣服</span>
      </div>
    </div>
  );
}

// ─── RECOMMEND PAGE ───────────────────────────────────────────────────────────
const looks = [
  {
    id: 1,
    img: IMG.look1,
    scene: "通勤",
    title: "高级感白领风",
    items: "白衬衫 + 阔腿裤 + 高跟鞋",
    price: 899,
    liked: false,
  },
  {
    id: 2,
    img: IMG.look2,
    scene: "约会",
    title: "都市柔美格调",
    items: "黑色西装 + 丝绒裙 + 小皮包",
    price: 1260,
    liked: false,
  },
  {
    id: 3,
    img: IMG.look3,
    scene: "旅行",
    title: "轻盈度假系",
    items: "白色长裤 + 针织衫 + 草编帽",
    price: 680,
    liked: false,
  },
];

function RecommendPage({ onGoProduct, onGoTryOn }: { onGoProduct: (look: (typeof looks)[0]) => void; onGoTryOn: (look: (typeof looks)[0]) => void }) {
  const [activeScene, setActiveScene] = useState("通勤");
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());
  const scenes = ["通勤", "约会", "旅行"];
  const filtered = looks.filter(l => l.scene === activeScene);

  return (
    <div style={{ paddingBottom: 80, overflowY: "auto", height: "100%" }}>
      <div style={{ padding: "16px 20px 14px" }}>
        <span style={{ fontFamily: font, fontSize: 20, fontWeight: 700, color: TEXT }}>老师穿搭定制</span>
        <div style={{ fontFamily: font, fontSize: 12, color: MUTED, marginTop: 2 }}>为你精选的穿搭方案</div>
      </div>

      {/* Scene filter */}
      <div style={{ padding: "0 20px 20px", display: "flex", gap: 8 }}>
        {scenes.map(s => (
          <Pill key={s} active={activeScene === s} onClick={() => setActiveScene(s)}>{s}</Pill>
        ))}
      </div>

      {/* Look cards */}
      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 16 }}>
        {filtered.map(look => (
          <div key={look.id} style={{ background: CARD, borderRadius: 20, overflow: "hidden", boxShadow: "0 3px 16px rgba(0,0,0,0.07)" }}>
            <div style={{ position: "relative" }}>
              <img src={look.img} alt={look.title} style={{ width: "100%", height: 300, objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(28,26,23,0.65) 0%, transparent 50%)" }} />
              <button
                onClick={() => setLikedItems(prev => { const n = new Set(prev); n.has(look.id) ? n.delete(look.id) : n.add(look.id); return n; })}
                style={{ position: "absolute", top: 14, right: 14, width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.2)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}
              >
                <Heart size={16} color={likedItems.has(look.id) ? "#e53935" : "#fff"} fill={likedItems.has(look.id) ? "#e53935" : "none"} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onGoTryOn(look); }}
                style={{
                  position: "absolute",
                  bottom: 14,
                  right: 14,
                  background: `linear-gradient(135deg, ${ACCENT}, #d4a56a)`,
                  color: "#fff",
                  fontFamily: font,
                  fontSize: 11,
                  fontWeight: 600,
                  padding: "5px 10px",
                  borderRadius: 14,
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  boxShadow: "0 2px 8px rgba(184,135,74,0.4)",
                  zIndex: 5,
                }}
              >
                <Sparkles size={11} /> AI试衣
              </button>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 16px 16px" }}>
                <div style={{ fontFamily: font, fontSize: 17, fontWeight: 700, color: "#fff" }}>{look.title}</div>
                <div style={{ fontFamily: font, fontSize: 12, color: "rgba(255,255,255,0.75)", marginTop: 2 }}>{look.items}</div>
              </div>
            </div>
            <div style={{ padding: "14px 16px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontFamily: font, fontSize: 11, color: MUTED }}>套装参考价</div>
                <div style={{ fontFamily: font, fontSize: 20, fontWeight: 700, color: ACCENT }}>¥{look.price}</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => setLikedItems(prev => { const n = new Set(prev); n.has(look.id) ? n.delete(look.id) : n.add(look.id); return n; })}
                  style={{ padding: "9px 14px", borderRadius: 20, border: `1.5px solid ${ACCENT}`, background: "transparent", fontFamily: font, fontSize: 13, color: ACCENT, fontWeight: 500, cursor: "pointer" }}
                >
                  收藏
                </button>
                <button
                  onClick={() => onGoProduct(look)}
                  style={{ padding: "9px 18px", borderRadius: 20, border: "none", background: ACCENT, fontFamily: font, fontSize: 13, color: "#fff", fontWeight: 600, cursor: "pointer" }}
                >
                  一键购买
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MINE / PROFILE PAGE ──────────────────────────────────────────────────────
function MinePage({ onGoOrders, onGoFavorites, onGoCoupons, onGoRecords, onGoVip, onCallService }: {
  onGoOrders: (tab?: string) => void;
  onGoFavorites: () => void;
  onGoCoupons: () => void;
  onGoRecords: () => void;
  onGoVip: () => void;
  onCallService: () => void;
}) {
  const orderStats = [
    { v: "3", l: "待付款", tab: "pending_pay" },
    { v: "1", l: "待发货", tab: "pending_ship" },
    { v: "2", l: "待评价", tab: "pending_review" },
    { v: "2", l: "退换货", tab: "refund" },
  ];

  const menuItems: { icon: React.FC<{ size: number; color: string }>; label: string; desc: string; action: () => void }[] = [
    { icon: Package, label: "我的订单", desc: "查看所有订单", action: () => onGoOrders("all") },
    { icon: Heart, label: "我的收藏", desc: "收藏的单品与搭配", action: onGoFavorites },
    { icon: Tag, label: "我的优惠券", desc: "3张可用", action: onGoCoupons },
    { icon: Sparkles, label: "我的穿搭记录", desc: "已记录 24 套", action: onGoRecords },
    { icon: Headphones, label: "联系客服", desc: "7×12小时在线", action: onCallService },
  ];

  return (
    <div style={{ paddingBottom: 80, overflowY: "auto", height: "100%" }}>
      {/* Profile header */}
      <div style={{ background: `linear-gradient(160deg, #3a2a18 0%, #6b4a28 100%)`, padding: "28px 20px 32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", overflow: "hidden", border: `2.5px solid ${ACCENT}` }}>
            <img src={IMG.hero} alt="头像" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div>
            <div style={{ fontFamily: font, fontSize: 18, fontWeight: 700, color: "#fff" }}>我的</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
              <Star size={12} color={ACCENT} fill={ACCENT} />
              <span style={{ fontFamily: font, fontSize: 12, color: "#d4b483", fontWeight: 500 }}>VIP 会员</span>
              <span style={{ fontFamily: font, fontSize: 11, color: "rgba(255,255,255,0.4)" }}>· 有效期至 2027.3</span>
            </div>
          </div>
        </div>

        {/* Stats - clickable, navigate to orders with tab */}
        <div style={{ display: "flex", justifyContent: "space-around", marginTop: 24, padding: "16px 0", background: "rgba(255,255,255,0.08)", borderRadius: 14 }}>
          {orderStats.map(s => (
            <div
              key={s.l}
              onClick={() => onGoOrders(s.tab)}
              style={{ textAlign: "center", cursor: "pointer", transition: "opacity 0.2s" }}
            >
              <div style={{ fontFamily: font, fontSize: 20, fontWeight: 700, color: "#f5d9a8" }}>{s.v}</div>
              <div style={{ fontFamily: font, fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* VIP card - clickable */}
      <div
        onClick={onGoVip}
        style={{ margin: "16px 20px", background: CARD, borderRadius: 18, padding: "16px 18px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Award size={22} color={ACCENT} />
          <div>
            <div style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: TEXT }}>VIP 专属权益</div>
            <div style={{ fontFamily: font, fontSize: 12, color: MUTED, marginTop: 1 }}>每周穿搭建议 · 新品优先看</div>
          </div>
        </div>
        <ChevronRight size={16} color={MUTED} />
      </div>

      {/* Menu - clickable items */}
      <div style={{ margin: "0 20px", background: CARD, borderRadius: 18, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        {menuItems.map((item, i) => (
          <div
            key={item.label}
            onClick={item.action}
            style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "15px 18px",
              borderBottom: i < menuItems.length - 1 ? `1px solid rgba(184,135,74,0.1)` : "none",
              cursor: "pointer",
            }}
          >
            <div style={{ width: 36, height: 36, borderRadius: 10, background: ACCENT_LIGHT, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <item.icon size={16} color={ACCENT} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: font, fontSize: 14, fontWeight: 500, color: TEXT }}>{item.label}</div>
              <div style={{ fontFamily: font, fontSize: 12, color: MUTED, marginTop: 1 }}>{item.desc}</div>
            </div>
            <ChevronRight size={16} color={MUTED} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── LIVE PAGE ────────────────────────────────────────────────────────────────
function LivePage({ onBack }: { onBack: () => void }) {
  const [reserved, setReserved] = useState(false);
  const upcoming = [
    { date: "今天", time: "20:00", title: "春季显瘦穿搭全攻略", subs: 3280 },
    { date: "下周三", time: "19:30", title: "夏日轻盈感必备单品", subs: 1840 },
  ];
  const past = [
    { title: "高级感通勤穿搭", date: "2026.7.18", saves: 1280 },
    { title: "约会必备5套look", date: "2026.7.11", saves: 980 },
    { title: "旅行轻装穿搭指南", date: "2026.7.4", saves: 2340 },
  ];

  return (
    <div style={{ paddingBottom: 80, overflowY: "auto", height: "100%" }}>
      <div style={{ padding: "16px 20px 14px", display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
          <X size={22} color={TEXT} />
        </button>
        <span style={{ fontFamily: font, fontSize: 20, fontWeight: 700, color: TEXT }}>直播日历</span>
      </div>

      {/* Upcoming */}
      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
        {upcoming.map((item, i) => (
          <div key={i} style={{ background: i === 0 ? `linear-gradient(135deg, #3a2a18, #6b4a28)` : CARD, borderRadius: 18, padding: "18px 18px", boxShadow: "0 3px 16px rgba(0,0,0,0.08)" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  {i === 0 && <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#e53935" }} />}
                  <span style={{ fontFamily: font, fontSize: 12, color: i === 0 ? "#d4b483" : MUTED }}>
                    {item.date} · {item.time}
                  </span>
                </div>
                <div style={{ fontFamily: font, fontSize: 16, fontWeight: 700, color: i === 0 ? "#fff" : TEXT, marginBottom: 6 }}>{item.title}</div>
                <div style={{ fontFamily: font, fontSize: 12, color: i === 0 ? "#d4b483" : ACCENT }}>已有 {item.subs.toLocaleString()} 人预约</div>
              </div>
              <button
                onClick={() => setReserved(true)}
                style={{
                  background: reserved && i === 0 ? "rgba(255,255,255,0.15)" : (i === 0 ? ACCENT_LIGHT : ACCENT),
                  color: i === 0 ? (reserved ? "#d4b483" : ACCENT) : "#fff",
                  fontFamily: font, fontSize: 12, fontWeight: 600,
                  padding: "8px 14px", borderRadius: 18, border: "none", cursor: "pointer", flexShrink: 0,
                }}
              >
                {reserved && i === 0 ? "✓ 已预约" : "预约直播"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Past streams */}
      <div style={{ padding: "0 20px" }}>
        <div style={{ fontFamily: font, fontSize: 15, fontWeight: 600, color: TEXT, marginBottom: 12 }}>历史直播</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 1, background: CARD, borderRadius: 18, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          {past.map((item, i) => (
            <div key={i} style={{ padding: "15px 18px", borderBottom: i < past.length - 1 ? `1px solid rgba(184,135,74,0.1)` : "none", display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: ACCENT_LIGHT, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Play size={14} color={ACCENT} fill={ACCENT} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: font, fontSize: 14, fontWeight: 500, color: TEXT }}>{item.title}</div>
                <div style={{ display: "flex", gap: 10, marginTop: 2 }}>
                  <span style={{ fontFamily: font, fontSize: 11, color: MUTED }}>
                    <Clock size={10} style={{ display: "inline", verticalAlign: "middle", marginRight: 3 }} />
                    {item.date}
                  </span>
                  <span style={{ fontFamily: font, fontSize: 11, color: MUTED }}>
                    <Heart size={10} style={{ display: "inline", verticalAlign: "middle", marginRight: 3 }} />
                    {item.saves.toLocaleString()} 收藏
                  </span>
                </div>
              </div>
              <span style={{ fontFamily: font, fontSize: 12, color: ACCENT, fontWeight: 500 }}>回放 ›</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── NOTE DETAIL PAGE ──────────────────────────────────────────────────────────
function NoteDetailPage({ note, onBack }: { note: (typeof notesData)[0]; onBack: () => void }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#fff" }}>
      {/* Header */}
      <div style={{
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #f0f0f0",
      }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
          <X size={22} color="#333" />
        </button>
        <div style={{ display: "flex", gap: 16 }}>
          <Share2 size={20} color="#333" />
          <Ellipsis size={20} color="#333" />
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Image carousel */}
        <div style={{ background: "#f8f8f8" }}>
          <img src={note.img} alt={note.title} style={{ width: "100%", maxHeight: 420, objectFit: "cover" }} />
        </div>

        {/* Author & interaction bar */}
        <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: `linear-gradient(135deg, #ff2442, #ff6b6b)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontFamily: font,
              fontSize: 14,
              fontWeight: 700,
            }}>
              {note.author.charAt(0)}
            </div>
            <div>
              <div style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: "#333" }}>{note.author}</div>
              <div style={{ fontFamily: font, fontSize: 11, color: "#999" }}>已关注</div>
            </div>
          </div>
          <button style={{
            background: "#ff2442",
            color: "#fff",
            border: "none",
            borderRadius: 16,
            padding: "7px 18px",
            fontFamily: font,
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}>
            关注
          </button>
        </div>

        {/* Title */}
        <div style={{ padding: "0 16px" }}>
          <div style={{ fontFamily: font, fontSize: 18, fontWeight: 700, color: "#222", lineHeight: 1.4, marginBottom: 10 }}>
            {note.title}
          </div>

          {/* Tags */}
          <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
            {note.tags.map((tag, i) => (
              <span key={i} style={{
                background: "#fff0f3",
                color: "#ff2442",
                fontFamily: font,
                fontSize: 11,
                padding: "4px 10px",
                borderRadius: 10,
                fontWeight: 500,
              }}>
                #{tag}
              </span>
            ))}
          </div>

          {/* Body */}
          <div style={{
            fontFamily: font,
            fontSize: 15,
            color: "#444",
            lineHeight: 1.8,
            whiteSpace: "pre-wrap",
            marginBottom: 20,
          }}>
            {note.body}
          </div>

          {/* More images */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontFamily: font, fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 8 }}>
              更多图片
            </div>
            <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
              {note.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`图${i + 1}`}
                  style={{
                    width: 180,
                    height: 220,
                    objectFit: "cover",
                    borderRadius: 10,
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: "1px solid #f0f0f0",
        padding: "10px 16px",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        gap: 20,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#ff2442" }}>
          <Heart size={22} fill="#ff2442" /> <span style={{ fontFamily: font, fontSize: 13, fontWeight: 600 }}>{note.likes}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#666" }}>
          <MessageCircle size={22} /> <span style={{ fontFamily: font, fontSize: 13 }}>1.2万</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#666" }}>
          <Bookmark size={22} /> <span style={{ fontFamily: font, fontSize: 13 }}>收藏</span>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{
          background: "#ff2442",
          color: "#fff",
          borderRadius: 18,
          padding: "8px 18px",
          fontFamily: font,
          fontSize: 13,
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: 4,
          cursor: "pointer",
        }}>
          <ShoppingBag size={14} /> 去购买
        </div>
      </div>
    </div>
  );
}

// ─── PRODUCT DETAIL PAGE ──────────────────────────────────────────────────────
function ProductPage({ look, onBack }: { look: { img: string; title: string; items: string; price: number } | null; onBack: () => void }) {
  const [added, setAdded] = useState(false);
  const img = look?.img ?? IMG.product;
  const title = look?.title ?? "高级感白领风";
  const price = look?.price ?? 899;

  return (
    <div style={{ paddingBottom: 90, overflowY: "auto", height: "100%" }}>
      {/* Hero image */}
      <div style={{ position: "relative" }}>
        <img src={img} alt={title} style={{ width: "100%", height: 400, objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 40%)" }} />
        <button
          onClick={onBack}
          style={{ position: "absolute", top: 16, left: 16, width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.25)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(6px)" }}
        >
          <X size={16} color="#fff" />
        </button>
        <button style={{ position: "absolute", top: 16, right: 16, width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.25)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(6px)" }}>
          <Heart size={16} color="#fff" />
        </button>
      </div>

      <div style={{ padding: "20px 20px 0" }}>
        {/* Influencer badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", overflow: "hidden", border: `1.5px solid ${ACCENT}` }}>
            <img src={IMG.hero} alt="董洁" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <span style={{ fontFamily: font, fontSize: 13, fontWeight: 600, color: ACCENT }}>董洁推荐</span>
          <Star size={12} color={ACCENT} fill={ACCENT} />
        </div>

        {/* Title & price */}
        <div style={{ fontFamily: font, fontSize: 22, fontWeight: 700, color: TEXT, marginBottom: 6 }}>{title}</div>
        <div style={{ fontFamily: font, fontSize: 13, color: MUTED, marginBottom: 16 }}>
          {look?.items ?? "白衬衫 + 阔腿裤 + 高跟鞋"}
        </div>
        <div style={{ fontFamily: font, fontSize: 28, fontWeight: 700, color: ACCENT, marginBottom: 20 }}>
          ¥{price}
        </div>

        {/* Why this fits */}
        <div style={{ background: ACCENT_LIGHT, borderRadius: 16, padding: "16px 18px", marginBottom: 20 }}>
          <div style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: TEXT, marginBottom: 10 }}>为什么适合你</div>
          {["修饰肩型，显宽肩高挑", "腰部收紧，强调腰线比例", "通勤场合百搭不出错"].map(reason => (
            <div key={reason} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
              <Check size={14} color={ACCENT} style={{ flexShrink: 0, marginTop: 2 }} />
              <span style={{ fontFamily: font, fontSize: 13, color: "#7a5c35" }}>{reason}</span>
            </div>
          ))}
        </div>

        {/* Size guide */}
        <div style={{ background: CARD, borderRadius: 16, padding: "14px 18px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginBottom: 20 }}>
          <div style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: TEXT, marginBottom: 10 }}>适合身型</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["155–170cm", "A字型", "梨形身材", "轻熟风格"].map(t => (
              <span key={t} style={{ background: "#f5f3f0", fontFamily: font, fontSize: 12, color: MUTED, padding: "4px 12px", borderRadius: 10 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed bottom CTA */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, padding: "12px 20px 20px", background: BG, borderTop: `1px solid rgba(184,135,74,0.12)` }}>
        <button
          onClick={() => setAdded(true)}
          style={{
            width: "100%", padding: "14px", borderRadius: 26, border: "none",
            background: added ? "#2e7d32" : ACCENT,
            color: "#fff", fontFamily: font, fontSize: 15, fontWeight: 700,
            cursor: "pointer", transition: "background 0.3s",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}
        >
          {added ? <><Check size={16} /> 已加入购物车</> : <><ShoppingBag size={16} /> 立即购买</>}
        </button>
      </div>
    </div>
  );
}

// ─── AI TRY-ON PAGE ───────────────────────────────────────────────────────────
function TryOnPage({ item, onBack }: { item: { img: string; name: string }; onBack: () => void }) {
  const [stage, setStage] = useState<"analyzing" | "generating" | "result">("analyzing");
  const [progress, setProgress] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  // Simulate AI processing
  useEffect(() => {
    const t1 = setTimeout(() => setStage("generating"), 1500);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (stage !== "generating") return;
    let cancelled = false;
    const interval = setInterval(() => {
      setProgress(p => {
        if (cancelled) return p;
        if (p >= 100) {
          clearInterval(interval);
          if (!cancelled) setStage("result");
          return 100;
        }
        return p + Math.random() * 6;
      });
    }, 120);
    return () => { cancelled = true; clearInterval(interval); };
  }, [stage]);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: BG }}>
      {/* Header */}
      <div style={{ padding: "16px 20px 14px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
          <X size={22} color={TEXT} />
        </button>
        <span style={{ fontFamily: font, fontSize: 18, fontWeight: 700, color: TEXT }}>AI 虚拟试衣</span>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px" }}>
        {/* Two-panel comparison */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
          {/* Original item */}
          <div style={{ background: CARD, borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <div style={{ padding: "8px 10px", fontFamily: font, fontSize: 12, fontWeight: 600, color: MUTED, textAlign: "center" }}>
              原单品
            </div>
            <img src={item.img} alt={item.name} style={{ width: "100%", height: 180, objectFit: "cover" }} />
            <div style={{ padding: "8px 10px", fontFamily: font, fontSize: 11, color: MUTED, textAlign: "center" }}>
              {item.name}
            </div>
          </div>

          {/* AI result */}
          <div style={{
            background: CARD,
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          }}>
            <div style={{
              padding: "8px 10px",
              fontFamily: font,
              fontSize: 12,
              fontWeight: 600,
              color: ACCENT,
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}>
              <Sparkles size={12} /> AI 效果
            </div>
            <div style={{
              height: 180,
              position: "relative",
              overflow: "hidden",
            }}>
              {stage === "result" ? (
                <>
                  <img
                    src="https://test-assets.tos-cn-shanghai.volces.com/videos/20260724_144306_b62fc67f.mp4?x-tos-process=video/snapshot%2Ct_1"
                    alt="AI试衣效果"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div style={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    background: "rgba(46,125,50,0.9)",
                    color: "#fff",
                    fontFamily: font,
                    fontSize: 9,
                    fontWeight: 600,
                    padding: "2px 6px",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}>
                    <Check size={9} /> 完成
                  </div>
                </>
              ) : (
                <div style={{
                  width: "100%", height: "100%",
                  background: `linear-gradient(180deg, ${ACCENT_LIGHT} 0%, rgba(184,135,74,0.05) 100%)`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}>
                  {/* Animated processing dots */}
                  <div style={{ display: "flex", gap: 4 }}>
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: "easeInOut",
                        }}
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: ACCENT,
                        }}
                      />
                    ))}
                  </div>
                  <span style={{
                    fontFamily: font,
                    fontSize: 11,
                    color: ACCENT,
                    fontWeight: 500,
                  }}>
                    {stage === "analyzing" ? "分析款式中..." : "AI 生成中..."}
                  </span>
                  {stage === "generating" && (
                    <div style={{
                      width: "70%",
                      height: 3,
                      background: "rgba(184,135,74,0.15)",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}>
                      <div style={{
                        height: "100%",
                        width: `${Math.min(progress, 100)}%`,
                        background: `linear-gradient(90deg, ${ACCENT}, #d4a56a)`,
                        borderRadius: 2,
                        transition: "width 0.1s ease-out",
                      }} />
                    </div>
                  )}
                </div>
              )}
            </div>
            <div style={{ padding: "8px 10px", fontFamily: font, fontSize: 11, color: ACCENT, textAlign: "center", fontWeight: 500 }}>
              {stage === "result" ? (
                <button
                  onClick={() => setShowVideo(true)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: ACCENT,
                    fontFamily: font,
                    fontSize: 11,
                    fontWeight: 600,
                    padding: 0,
                    textDecoration: "underline",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  上身效果（点击查看）
                </button>
              ) : (
                "等待生成..."
              )}
            </div>
          </div>
        </div>

        {/* AI recommendations */}
        {stage === "result" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}
          >
            {/* Score card */}
            <div style={{
              background: `linear-gradient(135deg, ${ACCENT}, #9c6b34)`,
              borderRadius: 18,
              padding: "18px 18px",
              color: "#fff",
              boxShadow: "0 4px 20px rgba(184,135,74,0.3)",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontFamily: font, fontSize: 14, fontWeight: 600 }}>AI 穿搭评分</span>
                <div style={{
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: 12,
                  padding: "4px 12px",
                  fontFamily: font,
                  fontSize: 20,
                  fontWeight: 700,
                }}>
                  {Math.floor(82 + Math.random() * 15)}分
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {["版型匹配", "颜色协调", "风格统一"].map(tag => (
                  <span key={tag} style={{
                    background: "rgba(255,255,255,0.18)",
                    fontFamily: font,
                    fontSize: 11,
                    padding: "3px 9px",
                    borderRadius: 10,
                  }}>
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share button */}
            <button
              onClick={() => {
                // Simulate share
                const el = document.createElement("div");
                el.style.cssText = "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#333;color:#fff;padding:12px 28px;border-radius:24px;font-size:14px;font-weight:600;z-index:9999;font-family:system-ui;";
                el.textContent = "已复制分享链接 ✅";
                document.body.appendChild(el);
                setTimeout(() => el.remove(), 2000);
              }}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: 14,
                border: `1.5px dashed ${ACCENT}`,
                background: ACCENT_LIGHT,
                color: ACCENT,
                fontFamily: font,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <Share2 size={16} /> 分享给穿搭师点评
            </button>

            {/* Why it works */}
            <div style={{ background: CARD, borderRadius: 16, padding: "16px 18px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: TEXT, marginBottom: 10 }}>
                <Sparkles size={14} color={ACCENT} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />
                为什么适合你
              </div>
              {[
                `${item.name}的版型与你的身型曲线高度契合`,
                "颜色饱和度完美匹配你的肤色基调",
                "剪裁风格符合你的穿搭偏好画像",
                "与衣橱中其它单品可形成多种搭配方案",
              ].map((reason, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                  <div style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: ACCENT_LIGHT,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 1,
                  }}>
                    <span style={{ fontSize: 11, color: ACCENT, fontWeight: 700 }}>{i + 1}</span>
                  </div>
                  <span style={{ fontFamily: font, fontSize: 13, color: "#5a4a3a", lineHeight: 1.4 }}>
                    {reason}
                  </span>
                </div>
              ))}
            </div>

            {/* Recommended pairing */}
            <div style={{ background: CARD, borderRadius: 16, padding: "16px 18px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginBottom: 8 }}>
              <div style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: TEXT, marginBottom: 12 }}>
                推荐搭配
              </div>
              <div style={{ display: "flex", gap: 8, overflowX: "auto" }}>
                {[
                  { label: "高腰阔腿裤", color: "#d4c5b2" },
                  { label: "简约高跟鞋", color: "#c9b896" },
                  { label: "质感手提包", color: "#8c6d4a" },
                ].map(pair => (
                  <div key={pair.label} style={{
                    flexShrink: 0,
                    background: pair.color,
                    borderRadius: 12,
                    padding: "10px 14px",
                    textAlign: "center",
                  }}>
                    <div style={{
                      width: 50,
                      height: 60,
                      background: "rgba(255,255,255,0.3)",
                      borderRadius: 8,
                      marginBottom: 6,
                    }} />
                    <div style={{ fontFamily: font, fontSize: 11, color: "#4a3a2a", fontWeight: 500 }}>
                      {pair.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", gap: 10, paddingBottom: 24 }}>
              <button
                onClick={onBack}
                style={{
                  flex: 1,
                  padding: "14px",
                  borderRadius: 24,
                  border: `1.5px solid ${ACCENT}`,
                  background: "transparent",
                  color: ACCENT,
                  fontFamily: font,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                返回衣橱
              </button>
              <button style={{
                flex: 2,
                padding: "14px",
                borderRadius: 24,
                border: "none",
                background: ACCENT,
                color: "#fff",
                fontFamily: font,
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}>
                <Sparkles size={14} /> 重新试衣
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Full-screen video overlay */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setShowVideo(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1000,
              background: "rgba(0,0,0,0.92)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setShowVideo(false)}
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                background: "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: "50%",
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              <X size={18} color="#fff" />
            </button>

            {/* Video player UI badge */}
            <div style={{
              position: "absolute",
              top: 24,
              left: 24,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#ff3b30",
                boxShadow: "0 0 6px #ff3b30",
              }} />
              <span style={{
                fontFamily: font,
                fontSize: 12,
                color: "rgba(255,255,255,0.7)",
                fontWeight: 500,
              }}>
                REC · 04:00
              </span>
            </div>

            {/* Center video player */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                width: "90%",
                maxWidth: 380,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <video
                src="https://test-assets.tos-cn-shanghai.volces.com/videos/20260724_144306_b62fc67f.mp4"
                autoPlay
                playsInline
                controls
                loop
                style={{
                  width: "100%",
                  borderRadius: 16,
                  boxShadow: "0 10px 50px rgba(184,135,74,0.25)",
                  outline: "none",
                }}
              />

              {/* Product name */}
              <div style={{ marginTop: 16, textAlign: "center" }}>
                <div style={{ fontFamily: font, fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 4 }}>
                  {item.name}
                </div>
                <div style={{ fontFamily: font, fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
                  虚拟试穿 · 上身效果展示
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── ORDERS PAGE ─────────────────────────────────────────────────────────────
function OrdersPage({ onBack, initialTab }: { onBack: () => void; initialTab?: string }) {
  const [activeTab, setActiveTab] = useState(initialTab || "all");
  const orderTabs = [
    { key: "all", label: "全部" },
    { key: "pending_pay", label: "待付款" },
    { key: "pending_ship", label: "待发货" },
    { key: "pending_review", label: "待评价" },
    { key: "refund", label: "退换货" },
  ];
  const filtered = activeTab === "all" ? ordersData : ordersData.filter(o => o.status === activeTab);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: BG }}>
      {/* Header */}
      <div style={{ padding: "16px 20px 12px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
          <X size={22} color={TEXT} />
        </button>
        <span style={{ fontFamily: font, fontSize: 18, fontWeight: 700, color: TEXT }}>我的订单</span>
      </div>

      {/* Tabs */}
      <div style={{ padding: "0 20px 12px", display: "flex", gap: 6, overflowX: "auto", flexShrink: 0 }}>
        {orderTabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            style={{
              flexShrink: 0,
              background: activeTab === t.key ? ACCENT : ACCENT_LIGHT,
              color: activeTab === t.key ? "#fff" : ACCENT,
              fontFamily: font, fontSize: 12, fontWeight: 500,
              padding: "6px 14px", borderRadius: 18, border: "none", cursor: "pointer",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Order list */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 20px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", paddingTop: 80, color: MUTED, fontFamily: font, fontSize: 14 }}>
            暂无相关订单
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {filtered.map(order => (
              <div key={order.id} style={{ background: CARD, borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                {/* Order header */}
                <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${ACCENT_LIGHT}` }}>
                  <span style={{ fontFamily: font, fontSize: 12, color: MUTED }}>订单号: {order.id}</span>
                  <span style={{ fontFamily: font, fontSize: 13, fontWeight: 600, color: order.refundStatus ? "#e53935" : ACCENT }}>
                    {order.refundStatus || order.statusLabel}
                  </span>
                </div>
                {/* Order body */}
                <div style={{ padding: "12px 16px", display: "flex", gap: 12 }}>
                  <img src={order.img} alt={order.name} style={{ width: 80, height: 80, borderRadius: 10, objectFit: "cover", flexShrink: 0 }} />
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: TEXT }}>{order.name}</div>
                      <div style={{ fontFamily: font, fontSize: 12, color: MUTED, marginTop: 2 }}>{order.items}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontFamily: font, fontSize: 12, color: MUTED }}>{order.date}</span>
                      <span style={{ fontFamily: font, fontSize: 16, fontWeight: 700, color: ACCENT }}>¥{order.price}</span>
                    </div>
                  </div>
                </div>
                {/* Order actions */}
                <div style={{ padding: "8px 16px 14px", display: "flex", gap: 8, justifyContent: "flex-end" }}>
                  {order.status === "pending_pay" && (
                    <>
                      <button style={{ padding: "7px 16px", borderRadius: 18, border: `1px solid ${ACCENT}`, background: "transparent", color: ACCENT, fontFamily: font, fontSize: 12, fontWeight: 500, cursor: "pointer" }}>取消订单</button>
                      <button style={{ padding: "7px 16px", borderRadius: 18, border: "none", background: ACCENT, color: "#fff", fontFamily: font, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>去付款</button>
                    </>
                  )}
                  {order.status === "pending_ship" && (
                    <button style={{ padding: "7px 16px", borderRadius: 18, border: `1px solid ${ACCENT}`, background: "transparent", color: ACCENT, fontFamily: font, fontSize: 12, fontWeight: 500, cursor: "pointer" }}>提醒发货</button>
                  )}
                  {order.status === "pending_review" && (
                    <button style={{ padding: "7px 16px", borderRadius: 18, border: "none", background: ACCENT, color: "#fff", fontFamily: font, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>去评价</button>
                  )}
                  {order.status === "refund" && (
                    <button style={{ padding: "7px 16px", borderRadius: 18, border: `1px solid ${ACCENT}`, background: "transparent", color: ACCENT, fontFamily: font, fontSize: 12, fontWeight: 500, cursor: "pointer" }}>查看详情</button>
                  )}
                  {order.status === "done" && (
                    <button style={{ padding: "7px 16px", borderRadius: 18, border: `1px solid ${ACCENT}`, background: "transparent", color: ACCENT, fontFamily: font, fontSize: 12, fontWeight: 500, cursor: "pointer" }}>再次购买</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── FAVORITES PAGE ───────────────────────────────────────────────────────────
function FavoritesPage({ onBack }: { onBack: () => void }) {
  const [filter, setFilter] = useState<"all" | "单品" | "搭配">("all");
  const filtered = filter === "all" ? favoritesData : favoritesData.filter(f => f.type === filter);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: BG }}>
      <div style={{ padding: "16px 20px 12px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
          <X size={22} color={TEXT} />
        </button>
        <span style={{ fontFamily: font, fontSize: 18, fontWeight: 700, color: TEXT }}>我的收藏</span>
      </div>

      <div style={{ padding: "0 20px 12px", display: "flex", gap: 8, flexShrink: 0 }}>
        {[{ k: "all", l: "全部" }, { k: "单品", l: "单品" }, { k: "搭配", l: "搭配" }].map(t => (
          <button
            key={t.k}
            onClick={() => setFilter(t.k as "all" | "单品" | "搭配")}
            style={{
              background: filter === t.k ? ACCENT : ACCENT_LIGHT,
              color: filter === t.k ? "#fff" : ACCENT,
              fontFamily: font, fontSize: 12, fontWeight: 500,
              padding: "6px 14px", borderRadius: 18, border: "none", cursor: "pointer",
            }}
          >
            {t.l}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {filtered.map(item => (
            <div key={item.id} style={{ background: CARD, borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
              <div style={{ height: 160, overflow: "hidden", position: "relative" }}>
                <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <span style={{ position: "absolute", top: 8, left: 8, background: "rgba(0,0,0,0.5)", color: "#fff", fontFamily: font, fontSize: 10, padding: "2px 8px", borderRadius: 8 }}>{item.type}</span>
              </div>
              <div style={{ padding: "10px 12px 12px" }}>
                <div style={{ fontFamily: font, fontSize: 13, fontWeight: 600, color: TEXT, marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: font, fontSize: 15, fontWeight: 700, color: ACCENT }}>¥{item.price}</span>
                  <Heart size={16} color="#e53935" fill="#e53935" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── COUPONS PAGE ─────────────────────────────────────────────────────────────
function CouponsPage({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<"available" | "expired">("available");
  const filtered = couponsData.filter(c => c.status === tab);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: BG }}>
      <div style={{ padding: "16px 20px 12px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
          <X size={22} color={TEXT} />
        </button>
        <span style={{ fontFamily: font, fontSize: 18, fontWeight: 700, color: TEXT }}>我的优惠券</span>
      </div>

      <div style={{ padding: "0 20px 12px", display: "flex", gap: 8, flexShrink: 0 }}>
        <button onClick={() => setTab("available")} style={{ background: tab === "available" ? ACCENT : ACCENT_LIGHT, color: tab === "available" ? "#fff" : ACCENT, fontFamily: font, fontSize: 13, fontWeight: 500, padding: "6px 16px", borderRadius: 18, border: "none", cursor: "pointer" }}>可用 ({couponsData.filter(c => c.status === "available").length})</button>
        <button onClick={() => setTab("expired")} style={{ background: tab === "expired" ? ACCENT : ACCENT_LIGHT, color: tab === "expired" ? "#fff" : ACCENT, fontFamily: font, fontSize: 13, fontWeight: 500, padding: "6px 16px", borderRadius: 18, border: "none", cursor: "pointer" }}>已过期 ({couponsData.filter(c => c.status === "expired").length})</button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 20px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map(coupon => (
            <div key={coupon.id} style={{
              background: coupon.status === "available" ? CARD : "#f0ebe3",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: coupon.status === "available" ? "0 2px 12px rgba(0,0,0,0.06)" : "none",
              display: "flex",
              opacity: coupon.status === "expired" ? 0.6 : 1,
            }}>
              {/* Left amount */}
              <div style={{
                width: 100,
                background: coupon.status === "available" ? `linear-gradient(135deg, ${ACCENT}, #9c6b34)` : "#d8cfc4",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                flexShrink: 0,
              }}>
                <div style={{ fontFamily: font, fontSize: 28, fontWeight: 700 }}>
                  <span style={{ fontSize: 14 }}>¥</span>{coupon.amount}
                </div>
                <div style={{ fontFamily: font, fontSize: 11, opacity: 0.8 }}>满{coupon.threshold}可用</div>
              </div>
              {/* Right info */}
              <div style={{ flex: 1, padding: "14px 16px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ fontFamily: font, fontSize: 15, fontWeight: 600, color: TEXT, marginBottom: 4 }}>{coupon.name}</div>
                <div style={{ fontFamily: font, fontSize: 12, color: MUTED, marginBottom: 8 }}>有效期至 {coupon.expire}</div>
                {coupon.status === "available" ? (
                  <button style={{ alignSelf: "flex-start", padding: "5px 14px", borderRadius: 14, border: "none", background: ACCENT, color: "#fff", fontFamily: font, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>去使用</button>
                ) : (
                  <span style={{ fontFamily: font, fontSize: 12, color: MUTED }}>已过期</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── RECORDS PAGE ─────────────────────────────────────────────────────────────
function RecordsPage({ onBack }: { onBack: () => void }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: BG }}>
      <div style={{ padding: "16px 20px 12px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
          <X size={22} color={TEXT} />
        </button>
        <span style={{ fontFamily: font, fontSize: 18, fontWeight: 700, color: TEXT }}>我的穿搭记录</span>
      </div>

      {/* Stats */}
      <div style={{ margin: "0 20px 12px", background: ACCENT_LIGHT, borderRadius: 14, padding: "12px 16px", display: "flex", justifyContent: "space-around", flexShrink: 0 }}>
        {[{ v: "24", l: "总记录" }, { v: "18", l: "本月" }, { v: "6", l: "场景" }].map(s => (
          <div key={s.l} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: font, fontSize: 18, fontWeight: 700, color: ACCENT }}>{s.v}</div>
            <div style={{ fontFamily: font, fontSize: 11, color: MUTED }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 20px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {recordsData.map((record, i) => (
            <div key={record.id} style={{ display: "flex", gap: 14 }}>
              {/* Timeline dot & line */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: ACCENT, marginTop: 4 }} />
                {i < recordsData.length - 1 && <div style={{ width: 2, flex: 1, background: `${ACCENT}30`, marginTop: 4 }} />}
              </div>
              {/* Card */}
              <div style={{ flex: 1, background: CARD, borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginBottom: i < recordsData.length - 1 ? 0 : 0 }}>
                <div style={{ display: "flex", gap: 12, padding: "12px 14px" }}>
                  <img src={record.img} alt={record.title} style={{ width: 70, height: 70, borderRadius: 10, objectFit: "cover", flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: TEXT }}>{record.title}</span>
                      <span style={{ fontFamily: font, fontSize: 11, color: MUTED }}>{record.date}</span>
                    </div>
                    <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                      <span style={{ background: ACCENT_LIGHT, color: ACCENT, fontFamily: font, fontSize: 10, padding: "2px 8px", borderRadius: 8 }}>{record.scene}</span>
                      <span style={{ background: "#f0f0f0", color: MUTED, fontFamily: font, fontSize: 10, padding: "2px 8px", borderRadius: 8 }}>{record.weather}</span>
                    </div>
                    <div style={{ fontFamily: font, fontSize: 12, color: "#666", lineHeight: 1.4 }}>{record.note}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── VIP BENEFITS PAGE ────────────────────────────────────────────────────────
function VipPage({ onBack }: { onBack: () => void }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: BG }}>
      <div style={{ padding: "16px 20px 12px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
          <X size={22} color={TEXT} />
        </button>
        <span style={{ fontFamily: font, fontSize: 18, fontWeight: 700, color: TEXT }}>VIP 专属权益</span>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 20px" }}>
        {/* VIP card */}
        <div style={{
          background: `linear-gradient(135deg, #3a2a18 0%, #6b4a28 100%)`,
          borderRadius: 18, padding: "20px 18px",
          marginBottom: 20,
          display: "flex", alignItems: "center", gap: 14,
        }}>
          <div style={{ width: 50, height: 50, borderRadius: "50%", overflow: "hidden", border: `2px solid ${ACCENT}`, flexShrink: 0 }}>
            <img src={IMG.hero} alt="头像" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div>
            <div style={{ fontFamily: font, fontSize: 16, fontWeight: 700, color: "#f5d9a8" }}>VIP 会员</div>
            <div style={{ fontFamily: font, fontSize: 12, color: "rgba(245,217,168,0.6)", marginTop: 2 }}>有效期至 2027.03.15</div>
          </div>
        </div>

        {/* Benefits list */}
        <div style={{ fontFamily: font, fontSize: 15, fontWeight: 700, color: TEXT, marginBottom: 12 }}>专属权益</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
          {vipBenefits.map(b => (
            <div key={b.title} style={{ background: CARD, borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "flex-start", gap: 12, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: ACCENT_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                {b.icon}
              </div>
              <div>
                <div style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: TEXT, marginBottom: 3 }}>{b.title}</div>
                <div style={{ fontFamily: font, fontSize: 12, color: MUTED, lineHeight: 1.4 }}>{b.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Member level progress */}
        <div style={{ background: CARD, borderRadius: 16, padding: "16px 18px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <div style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: TEXT, marginBottom: 12 }}>成长进度</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontFamily: font, fontSize: 13, color: ACCENT, fontWeight: 600 }}>黄金会员</span>
            <span style={{ fontFamily: font, fontSize: 12, color: MUTED }}>距铂金会员还差 2,000 积分</span>
          </div>
          <div style={{ width: "100%", height: 8, background: ACCENT_LIGHT, borderRadius: 4, overflow: "hidden" }}>
            <div style={{ width: "72%", height: "100%", background: `linear-gradient(90deg, ${ACCENT}, #d4a56a)`, borderRadius: 4 }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
            <span style={{ fontFamily: font, fontSize: 11, color: MUTED }}>当前 5,200 积分</span>
            <span style={{ fontFamily: font, fontSize: 11, color: MUTED }}>铂金 7,200 积分</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── BOTTOM TAB BAR ───────────────────────────────────────────────────────────
const tabs: { id: Tab; label: string; Icon: React.FC<{ size: number; color: string; fill?: string }> }[] = [
  { id: "home", label: "首页", Icon: ({ size, color }) => <Home size={size} color={color} /> },
  { id: "recommend", label: "穿搭定制", Icon: ({ size, color }) => <Sparkles size={size} color={color} /> },
  { id: "mine", label: "我的", Icon: ({ size, color }) => <User size={size} color={color} /> },
];

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [subPage, setSubPage] = useState<SubPage>(null);
  const [selectedLook, setSelectedLook] = useState<(typeof looks)[0] | null>(null);
  const [selectedTryOnItem, setSelectedTryOnItem] = useState<{ img: string; name: string } | null>(null);
  const [selectedNote, setSelectedNote] = useState<(typeof notesData)[0] | null>(null);
  const [showStylistQR, setShowStylistQR] = useState(false);
  const [showCallDialog, setShowCallDialog] = useState(false);
  const [orderInitialTab, setOrderInitialTab] = useState<string>("all");
  const dragConstraintsRef = useRef<HTMLDivElement>(null);

  const handleGoProduct = (look?: (typeof looks)[0]) => {
    if (look) setSelectedLook(look);
    setSubPage("product");
  };
  const handleGoTryOn = (item: { img: string; name: string }) => {
    setSelectedTryOnItem(item);
    setSubPage("tryon");
  };
  const handleGoNote = (note: (typeof notesData)[0]) => {
    setSelectedNote(note);
    setSubPage("note");
  };
  const handleBack = () => setSubPage(null);
  const handleGoOrders = (tab?: string) => { setOrderInitialTab(tab || "all"); setSubPage("orders"); };
  const handleGoFavorites = () => setSubPage("favorites");
  const handleGoCoupons = () => setSubPage("coupons");
  const handleGoRecords = () => setSubPage("records");
  const handleGoVip = () => setSubPage("vip");
  const handleCallService = () => setShowCallDialog(true);

  const tabIndex = tabs.findIndex(t => t.id === activeTab);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#e8e3dc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: font,
      }}
    >
      {/* Phone frame */}
      <div
        style={{
          width: "100%",
          maxWidth: 430,
          height: "100%",
          maxHeight: 896,
          background: BG,
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
          borderRadius: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Status bar */}
        <div style={{ background: BG, padding: "10px 24px 4px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0, zIndex: 10 }}>
          <span style={{ fontFamily: font, fontSize: 12, fontWeight: 600, color: TEXT }}>9:41</span>
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            <div style={{ width: 15, height: 8, borderRadius: 2, border: `1.5px solid ${TEXT}`, position: "relative" }}>
              <div style={{ position: "absolute", inset: 1.5, right: "auto", width: "65%", background: TEXT, borderRadius: 1 }} />
            </div>
          </div>
        </div>

        {/* Page content */}
        <div ref={dragConstraintsRef} style={{ flex: 1, overflow: "hidden", position: "relative" }}>
          {/* Tab pages */}
          <AnimatePresence mode="wait" initial={false}>
            {subPage === null && (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                style={{ position: "absolute", inset: 0 }}
              >
                {activeTab === "home" && <HomePage onGoProduct={() => handleGoProduct()} onGoNote={handleGoNote} />}
                {activeTab === "recommend" && <RecommendPage onGoProduct={handleGoProduct} onGoTryOn={(look) => handleGoTryOn({ img: look.img, name: look.title })} />}
                {activeTab === "mine" && <MinePage
                  onGoOrders={handleGoOrders}
                  onGoFavorites={handleGoFavorites}
                  onGoCoupons={handleGoCoupons}
                  onGoRecords={handleGoRecords}
                  onGoVip={handleGoVip}
                  onCallService={handleCallService}
                />}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating stylist button - only on home and recommend tabs, draggable */}
          {subPage === null && (activeTab === "home" || activeTab === "recommend") && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 20 }}
              drag
              dragConstraints={dragConstraintsRef}
              dragMomentum={false}
              whileDrag={{ scale: 1.12, boxShadow: "0 8px 28px rgba(184,135,74,0.5)" }}
              whileTap={{ scale: 0.95 }}
              onTap={() => setShowStylistQR(true)}
              style={{
                position: "absolute",
                right: 0,
                top: "calc(50% - 30px)",
                background: `linear-gradient(135deg, ${ACCENT}, #d4a56a)`,
                color: "#fff",
                border: "none",
                borderRadius: 16,
                padding: "12px 10px",
                fontFamily: font,
                fontSize: 12,
                fontWeight: 600,
                cursor: "grab",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                boxShadow: "0 4px 16px rgba(184,135,74,0.35)",
                zIndex: 15,
                width: 48,
                touchAction: "none",
                WebkitTouchCallout: "none",
                userSelect: "none",
              }}
            >
              <Headphones size={18} color="#fff" />
              <span style={{ writingMode: "vertical-rl", fontSize: 11, letterSpacing: 1, userSelect: "none" }}>穿搭师</span>
            </motion.button>
          )}

          {/* Stylist QR code popup */}
          <AnimatePresence>
            {showStylistQR && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setShowStylistQR(false)}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0.6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 100,
                  backdropFilter: "blur(4px)",
                }}
              >
                <motion.div
                  initial={{ scale: 0.85, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.85, y: 20 }}
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    width: 300,
                    background: "#fff",
                    borderRadius: 24,
                    padding: "28px 24px 24px",
                    textAlign: "center",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                  }}
                >
                  {/* Close */}
                  <button
                    onClick={() => setShowStylistQR(false)}
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      border: "none",
                      background: "#f5f3f0",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <X size={16} color={MUTED} />
                  </button>

                  {/* Avatar */}
                  <div style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${ACCENT}, #d4a56a)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 12px",
                  }}>
                    <Headphones size={24} color="#fff" />
                  </div>

                  <div style={{ fontFamily: font, fontSize: 17, fontWeight: 700, color: TEXT, marginBottom: 4 }}>
                    添加专属穿搭师
                  </div>
                  <div style={{ fontFamily: font, fontSize: 13, color: MUTED, marginBottom: 18 }}>
                    扫码添加企业微信，获取1对1穿搭服务
                  </div>

                  {/* QR code placeholder */}
                  <div style={{
                    width: 200,
                    height: 200,
                    margin: "0 auto 16px",
                    borderRadius: 16,
                    background: "#f8f6f3",
                    border: `2px solid ${ACCENT_LIGHT}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}>
                    {/* Simulated QR code pattern */}
                    <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Corner markers */}
                      <rect x="10" y="10" width="40" height="40" rx="4" fill={TEXT} />
                      <rect x="18" y="18" width="24" height="24" rx="2" fill="#fff" />
                      <rect x="22" y="22" width="16" height="16" rx="1" fill={TEXT} />
                      <rect x="130" y="10" width="40" height="40" rx="4" fill={TEXT} />
                      <rect x="138" y="18" width="24" height="24" rx="2" fill="#fff" />
                      <rect x="142" y="22" width="16" height="16" rx="1" fill={TEXT} />
                      <rect x="10" y="130" width="40" height="40" rx="4" fill={TEXT} />
                      <rect x="18" y="138" width="24" height="24" rx="2" fill="#fff" />
                      <rect x="22" y="142" width="16" height="16" rx="1" fill={TEXT} />
                      {/* Random data dots */}
                      {Array.from({ length: 64 }).map((_, i) => {
                        const x = 60 + (i % 8) * 8;
                        const y = 60 + Math.floor(i / 8) * 8;
                        const fill = (i * 7 + 3) % 3 === 0 ? TEXT : "transparent";
                        return fill === TEXT ? <rect key={i} x={x} y={y} width="6" height="6" rx="1" fill={fill} /> : null;
                      })}
                      {Array.from({ length: 48 }).map((_, i) => {
                        const x = 60 + (i % 6) * 8;
                        const y = 10 + Math.floor(i / 6) * 8;
                        const fill = (i * 5 + 1) % 3 === 0 ? TEXT : "transparent";
                        return fill === TEXT ? <rect key={`t${i}`} x={x} y={y} width="6" height="6" rx="1" fill={fill} /> : null;
                      })}
                      {Array.from({ length: 48 }).map((_, i) => {
                        const x = 10 + (i % 6) * 8;
                        const y = 60 + Math.floor(i / 6) * 8;
                        const fill = (i * 3 + 2) % 3 === 0 ? TEXT : "transparent";
                        return fill === TEXT ? <rect key={`l${i}`} x={x} y={y} width="6" height="6" rx="1" fill={fill} /> : null;
                      })}
                      {Array.from({ length: 48 }).map((_, i) => {
                        const x = 130 + (i % 3) * 8;
                        const y = 60 + Math.floor(i / 3) * 8;
                        const fill = (i * 4 + 1) % 3 === 0 ? TEXT : "transparent";
                        return fill === TEXT ? <rect key={`r${i}`} x={x} y={y} width="6" height="6" rx="1" fill={fill} /> : null;
                      })}
                      {Array.from({ length: 48 }).map((_, i) => {
                        const x = 60 + (i % 6) * 8;
                        const y = 130 + Math.floor(i / 6) * 8;
                        const fill = (i * 6 + 2) % 3 === 0 ? TEXT : "transparent";
                        return fill === TEXT ? <rect key={`b${i}`} x={x} y={y} width="6" height="6" rx="1" fill={fill} /> : null;
                      })}
                      {/* Center logo */}
                      <rect x="76" y="76" width="28" height="28" rx="6" fill={ACCENT} />
                      <text x="90" y="96" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="700" fontFamily={font}>穿</text>
                    </svg>
                  </div>

                  <div style={{ fontFamily: font, fontSize: 12, color: MUTED, marginBottom: 16, lineHeight: 1.5 }}>
                    微信扫一扫 · 添加穿搭师企业微信
                  </div>

                  <button
                    onClick={() => setShowStylistQR(false)}
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: 24,
                      border: "none",
                      background: ACCENT,
                      color: "#fff",
                      fontFamily: font,
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    知道了
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sub pages (slide up) */}
          <AnimatePresence>
            {subPage !== null && (
              <motion.div
                key={subPage}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 340, damping: 36 }}
                style={{ position: "absolute", inset: 0, background: BG, zIndex: 20 }}
              >
                {subPage === "live" && <LivePage onBack={handleBack} />}
                {subPage === "product" && <ProductPage look={selectedLook} onBack={handleBack} />}
                {subPage === "tryon" && selectedTryOnItem && <TryOnPage item={selectedTryOnItem} onBack={handleBack} />}
                {subPage === "note" && selectedNote && <NoteDetailPage note={selectedNote} onBack={handleBack} />}
                {subPage === "orders" && <OrdersPage onBack={handleBack} initialTab={orderInitialTab} />}
                {subPage === "favorites" && <FavoritesPage onBack={handleBack} />}
                {subPage === "coupons" && <CouponsPage onBack={handleBack} />}
                {subPage === "records" && <RecordsPage onBack={handleBack} />}
                {subPage === "vip" && <VipPage onBack={handleBack} />}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Phone call confirmation dialog */}
          <AnimatePresence>
            {showCallDialog && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setShowCallDialog(false)}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 200,
                  backdropFilter: "blur(4px)",
                }}
              >
                <motion.div
                  initial={{ scale: 0.85, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.85, y: 20 }}
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    width: 280,
                    background: "#fff",
                    borderRadius: 20,
                    padding: "24px 24px 20px",
                    textAlign: "center",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                  }}
                >
                  {/* Phone icon */}
                  <div style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${ACCENT}, #d4a56a)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}>
                    <Phone size={26} color="#fff" />
                  </div>

                  <div style={{ fontFamily: font, fontSize: 16, fontWeight: 700, color: TEXT, marginBottom: 6 }}>
                    联系客服
                  </div>
                  <div style={{ fontFamily: font, fontSize: 13, color: MUTED, marginBottom: 4, lineHeight: 1.5 }}>
                    客服热线：400-888-6688
                  </div>
                  <div style={{ fontFamily: font, fontSize: 12, color: MUTED, marginBottom: 20 }}>
                    服务时间：9:00 - 21:00（全年无休）
                  </div>

                  <div style={{ display: "flex", gap: 10 }}>
                    <button
                      onClick={() => setShowCallDialog(false)}
                      style={{
                        flex: 1,
                        padding: "11px",
                        borderRadius: 22,
                        border: `1px solid ${ACCENT}`,
                        background: "transparent",
                        color: ACCENT,
                        fontFamily: font,
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      取消
                    </button>
                    <button
                      onClick={() => setShowCallDialog(false)}
                      style={{
                        flex: 1,
                        padding: "11px",
                        borderRadius: 22,
                        border: "none",
                        background: ACCENT,
                        color: "#fff",
                        fontFamily: font,
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                      }}
                    >
                      <Phone size={14} /> 立即拨打
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom tab bar */}
        {subPage === null && (
          <div
            style={{
              flexShrink: 0,
              background: CARD,
              borderTop: `1px solid rgba(184,135,74,0.12)`,
              display: "flex",
              paddingBottom: 8,
              zIndex: 30,
            }}
          >
            {tabs.map(({ id, label, Icon }) => {
              const active = activeTab === id;
              return (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  style={{
                    flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
                    gap: 3, padding: "10px 0 4px", background: "none", border: "none", cursor: "pointer",
                  }}
                >
                  <motion.div
                    animate={{ scale: active ? 1.1 : 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Icon size={22} color={active ? ACCENT : MUTED} />
                  </motion.div>
                  <span style={{ fontFamily: font, fontSize: 10, color: active ? ACCENT : MUTED, fontWeight: active ? 600 : 400 }}>
                    {label}
                  </span>
                  {active && (
                    <motion.div
                      layoutId="tab-indicator"
                      style={{ width: 4, height: 4, borderRadius: "50%", background: ACCENT }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
