import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Home,
  Shirt,
  Sparkles,
  User,
  Plus,
  ChevronRight,
  Heart,
  ShoppingBag,
  Bell,
  Play,
  Calendar,
  Award,
  Package,
  Tag,
  Headphones,
  X,
  Check,
  Star,
  Clock,
  Camera,
} from "lucide-react";

type Tab = "home" | "wardrobe" | "recommend" | "mine";
type SubPage = "live" | "product" | null;

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
function HomePage({ onGoLive, onGoProduct }: { onGoLive: () => void; onGoProduct: () => void }) {
  const [reserved, setReserved] = useState(false);
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

      {/* Live reservation */}
      <div style={{ margin: "0 20px 16px", background: CARD, borderRadius: 18, padding: "18px 18px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#e53935", animation: "pulse 1.5s infinite" }} />
          <span style={{ fontFamily: font, fontSize: 13, fontWeight: 600, color: TEXT }}>下一场直播</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: font, fontSize: 15, fontWeight: 700, color: TEXT, marginBottom: 4 }}>春季高级感穿搭分享</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Calendar size={12} color={MUTED} />
              <span style={{ fontFamily: font, fontSize: 12, color: MUTED }}>周五 20:00</span>
            </div>
            <div style={{ fontFamily: font, fontSize: 12, color: ACCENT, marginTop: 4 }}>已有 3,280 人预约</div>
          </div>
          <button
            onClick={() => { setReserved(true); onGoLive(); }}
            style={{
              background: reserved ? ACCENT_LIGHT : ACCENT,
              color: reserved ? ACCENT : "#fff",
              fontFamily: font, fontSize: 13, fontWeight: 600,
              padding: "9px 16px", borderRadius: 22, border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6,
            }}
          >
            {reserved ? <><Check size={13} /> 已预约</> : "立即预约"}
          </button>
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

function WardrobePage() {
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
            <div style={{ height: 150, background: "#f0ebe3", overflow: "hidden" }}>
              <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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

function RecommendPage({ onGoProduct }: { onGoProduct: (look: (typeof looks)[0]) => void }) {
  const [activeScene, setActiveScene] = useState("通勤");
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());
  const scenes = ["通勤", "约会", "旅行"];
  const filtered = looks.filter(l => l.scene === activeScene);

  return (
    <div style={{ paddingBottom: 80, overflowY: "auto", height: "100%" }}>
      <div style={{ padding: "16px 20px 14px" }}>
        <span style={{ fontFamily: font, fontSize: 20, fontWeight: 700, color: TEXT }}>老师推荐</span>
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
function MinePage() {
  const menuItems = [
    { icon: Package, label: "我的订单", desc: "查看所有订单" },
    { icon: Heart, label: "我的收藏", desc: "收藏的单品与搭配" },
    { icon: Tag, label: "我的优惠券", desc: "3张可用" },
    { icon: Sparkles, label: "我的穿搭记录", desc: "已记录 24 套" },
    { icon: Headphones, label: "联系客服", desc: "7×12小时在线" },
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

        {/* Stats */}
        <div style={{ display: "flex", justifyContent: "space-around", marginTop: 24, padding: "16px 0", background: "rgba(255,255,255,0.08)", borderRadius: 14 }}>
          {[{ v: "3", l: "待付款" }, { v: "1", l: "待发货" }, { v: "0", l: "待评价" }, { v: "2", l: "退换货" }].map(s => (
            <div key={s.l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: font, fontSize: 20, fontWeight: 700, color: "#f5d9a8" }}>{s.v}</div>
              <div style={{ fontFamily: font, fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* VIP card */}
      <div style={{ margin: "16px 20px", background: CARD, borderRadius: 18, padding: "16px 18px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Award size={22} color={ACCENT} />
          <div>
            <div style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: TEXT }}>VIP 专属权益</div>
            <div style={{ fontFamily: font, fontSize: 12, color: MUTED, marginTop: 1 }}>每周穿搭建议 · 新品优先看</div>
          </div>
        </div>
        <ChevronRight size={16} color={MUTED} />
      </div>

      {/* Menu */}
      <div style={{ margin: "0 20px", background: CARD, borderRadius: 18, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        {menuItems.map((item, i) => (
          <div
            key={item.label}
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

// ─── BOTTOM TAB BAR ───────────────────────────────────────────────────────────
const tabs: { id: Tab; label: string; Icon: React.FC<{ size: number; color: string; fill?: string }> }[] = [
  { id: "home", label: "首页", Icon: ({ size, color }) => <Home size={size} color={color} /> },
  { id: "wardrobe", label: "衣橱", Icon: ({ size, color }) => <Shirt size={size} color={color} /> },
  { id: "recommend", label: "推荐", Icon: ({ size, color }) => <Sparkles size={size} color={color} /> },
  { id: "mine", label: "我的", Icon: ({ size, color }) => <User size={size} color={color} /> },
];

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [subPage, setSubPage] = useState<SubPage>(null);
  const [selectedLook, setSelectedLook] = useState<(typeof looks)[0] | null>(null);

  const handleGoProduct = (look?: (typeof looks)[0]) => {
    if (look) setSelectedLook(look);
    setSubPage("product");
  };
  const handleBack = () => setSubPage(null);

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
        <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
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
                {activeTab === "home" && <HomePage onGoLive={() => setSubPage("live")} onGoProduct={() => handleGoProduct()} />}
                {activeTab === "wardrobe" && <WardrobePage />}
                {activeTab === "recommend" && <RecommendPage onGoProduct={handleGoProduct} />}
                {activeTab === "mine" && <MinePage />}
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
