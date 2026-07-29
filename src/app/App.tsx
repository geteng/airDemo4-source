import { useState, useEffect } from "react";
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
type SubPage = "live" | "product" | "tryon" | null;

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
          {[
            { img: IMG.look2, title: "夏日通勤穿搭｜一周不重样", likes: "2.3万", author: "穿搭灵感簿" },
            { img: IMG.look1, title: "梨形身材的天菜！这三套绝了", likes: "1.8万", author: "是小陈呀" },
            { img: IMG.look3, title: "董洁同款，普通人也能驾驭", likes: "5.6万", author: "Lily穿搭记" },
          ].map((article, i) => (
            <div key={i} style={{
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
                  <div style={{
                    width: "100%", height: "100%",
                    background: `linear-gradient(135deg, ${ACCENT_LIGHT} 0%, #f0e6d8 50%, ${ACCENT_LIGHT} 100%)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    position: "relative",
                  }}>
                    {/* Simulated body silhouette with clothing overlay */}
                    <div style={{ position: "relative", width: "60%", height: "80%" }}>
                      {/* Body outline */}
                      <div style={{
                        position: "absolute",
                        inset: 0,
                        background: `radial-gradient(ellipse 50% 50% at 50% 35%, rgba(184,135,74,0.3) 0%, transparent 70%),
                                     linear-gradient(180deg, rgba(184,135,74,0.15) 0%, rgba(184,135,74,0.25) 50%, rgba(184,135,74,0.1) 100%)`,
                        borderRadius: "40% 40% 0 0",
                      }} />
                      {/* Silhouette shape */}
                      <svg viewBox="0 0 100 140" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                        {/* Head */}
                        <circle cx="50" cy="18" r="12" fill="rgba(184,135,74,0.25)" />
                        {/* Neck */}
                        <rect x="45" y="28" width="10" height="8" rx="3" fill="rgba(184,135,74,0.2)" />
                        {/* Shoulders & body */}
                        <path d="M20,38 Q10,42 12,58 L18,80 Q20,90 25,100 L75,100 Q80,90 82,80 L88,58 Q90,42 80,38 Z"
                          fill="rgba(184,135,74,0.2)" />
                        {/* Legs */}
                        <rect x="30" y="100" width="16" height="38" rx="7" fill="rgba(184,135,74,0.15)" />
                        <rect x="54" y="100" width="16" height="38" rx="7" fill="rgba(184,135,74,0.15)" />
                      </svg>
                    </div>
                    {/* Sparkle effects */}
                    {[...Array(6)].map((_, i) => (
                      <div key={i} style={{
                        position: "absolute",
                        width: 4 + Math.random() * 4,
                        height: 4 + Math.random() * 4,
                        borderRadius: "50%",
                        background: ACCENT,
                        opacity: 0.5 + Math.random() * 0.5,
                        top: `${15 + Math.random() * 70}%`,
                        left: `${10 + Math.random() * 70}%`,
                      }} />
                    ))}
                  </div>
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
                style={{
                  width: "100%",
                  borderRadius: 16,
                  boxShadow: "0 10px 50px rgba(184,135,74,0.25)",
                  outline: "none",
                }}
                onEnded={() => setShowVideo(false)}
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
  const [selectedTryOnItem, setSelectedTryOnItem] = useState<{ img: string; name: string } | null>(null);

  const handleGoProduct = (look?: (typeof looks)[0]) => {
    if (look) setSelectedLook(look);
    setSubPage("product");
  };
  const handleGoTryOn = (item: { img: string; name: string }) => {
    setSelectedTryOnItem(item);
    setSubPage("tryon");
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
                {activeTab === "wardrobe" && <WardrobePage onGoTryOn={handleGoTryOn} />}
                {activeTab === "recommend" && <RecommendPage onGoProduct={handleGoProduct} onGoTryOn={(look) => handleGoTryOn({ img: look.img, name: look.title })} />}
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
                {subPage === "tryon" && selectedTryOnItem && <TryOnPage item={selectedTryOnItem} onBack={handleBack} />}
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
