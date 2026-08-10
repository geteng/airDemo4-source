import {
  ArrowRight,
  Bell,
  ChevronRight,
  Heart,
  Package,
  Settings,
  Shirt,
  Sparkles,
  Star,
  Ticket,
  User,
} from "lucide-react";
import { ACCENT, CARD, font, MUTED, TEXT } from "../constants";

export function MinePage({
  onGoOrders,
  onGoFavorites,
  onGoCoupons,
  onGoRecords,
  onGoVip,
  onGoWardrobe,
}: {
  onGoOrders: () => void;
  onGoFavorites: () => void;
  onGoCoupons: () => void;
  onGoRecords: () => void;
  onGoVip: () => void;
  onGoWardrobe: () => void;
}) {
  const menuItems = [
    { key: "orders", icon: Package, label: "我的订单", onClick: onGoOrders },
    { key: "wardrobe", icon: Shirt, label: "我的衣橱", onClick: onGoWardrobe },
    { key: "favorites", icon: Heart, label: "我的收藏", onClick: onGoFavorites },
    { key: "coupons", icon: Ticket, label: "优惠券", onClick: onGoCoupons },
    { key: "records", icon: Star, label: "穿搭日记", onClick: onGoRecords },
  ];
  return (
    <div style={{ paddingBottom: 80, overflowY: "auto", height: "100%" }}>
      {/* Header */}
      <div style={{ padding: "16px 20px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: font, fontSize: 20, fontWeight: 700, color: TEXT }}>我的</span>
        <div style={{ display: "flex", gap: 16 }}>
          <Bell size={20} color={MUTED} />
          <Settings size={20} color={MUTED} />
        </div>
      </div>

      {/* Profile card */}
      <div style={{ margin: "0 20px 16px", background: CARD, borderRadius: 18, padding: "20px 18px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 60, height: 60, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: `2px solid ${ACCENT}` }}>
            <img src="https://images.unsplash.com/photo-1674457343601-85eacbf0f4b4?w=800&h=900&fit=crop&auto=format" alt="董洁" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: font, fontSize: 18, fontWeight: 700, color: TEXT }}>董洁</div>
            <div style={{ fontFamily: font, fontSize: 12, color: MUTED, marginTop: 2 }}>生活美学穿搭空间</div>
          </div>
          <button style={{ background: "none", border: "none", cursor: "pointer" }}>
            <ChevronRight size={18} color={MUTED} />
          </button>
        </div>
        {/* Stats */}
        <div style={{ display: "flex", justifyContent: "space-around", marginTop: 18, paddingTop: 16, borderTop: `1px solid ${MUTED}` }}>
          {[{ label: "收藏", value: "128" }, { label: "笔记", value: "36" }, { label: "订单", value: "12" }].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: font, fontSize: 18, fontWeight: 700, color: ACCENT }}>{s.value}</div>
              <div style={{ fontFamily: font, fontSize: 11, color: MUTED, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* VIP banner */}
      <div onClick={onGoVip} style={{ margin: "0 20px 16px", background: `linear-gradient(135deg, #3a2a18 0%, #6b4a28 100%)`, borderRadius: 18, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
        <Sparkles size={22} color={ACCENT} />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: font, fontSize: 15, fontWeight: 700, color: "#f5d9a8" }}>VIP 会员中心</div>
          <div style={{ fontFamily: font, fontSize: 12, color: "#d4b483", marginTop: 2 }}>专属穿搭建议 + 全年免邮</div>
        </div>
        <ArrowRight size={16} color="#f5d9a8" />
      </div>

      {/* Menu list */}
      <div style={{ margin: "0 20px", background: CARD, borderRadius: 18, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        {menuItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={item.key}>
              {i > 0 && <div style={{ height: 1, background: MUTED, marginLeft: 18 }} />}
              <button
                onClick={item.onClick}
                style={{ width: "100%", background: "none", border: "none", padding: "16px 18px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
              >
                <Icon size={20} color={ACCENT} />
                <span style={{ fontFamily: font, fontSize: 15, color: TEXT, flex: 1, textAlign: "left" }}>{item.label}</span>
                <ChevronRight size={18} color={MUTED} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer hint */}
      <div style={{ margin: "24px 20px 0", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
        <User size={14} color={MUTED} />
        <span style={{ fontFamily: font, fontSize: 12, color: MUTED }}>董洁穿搭 · 让每一天都好看</span>
      </div>
    </div>
  );
}
