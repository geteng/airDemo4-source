import {
  Package, Heart, Tag, Footprints, Headphones,
  Award, ChevronRight, User,
} from "lucide-react";
import { ACCENT, ACCENT_LIGHT, BG, CARD, font, IMG, MUTED, TEXT } from "../constants";

export function MinePage({
  onGoOrders,
  onGoFavorites,
  onGoCoupons,
  onGoRecords,
  onGoVip,
  onCallService,
  onGoStyleProfile,
}: {
  onGoOrders: (tab?: string) => void;
  onGoFavorites: () => void;
  onGoCoupons: () => void;
  onGoRecords: () => void;
  onGoVip: () => void;
  onCallService: () => void;
  onGoStyleProfile: () => void;
}) {
  const orderStats = [
    { v: "3", l: "待付款", tab: "pending_pay" },
    { v: "1", l: "待发货", tab: "pending_ship" },
    { v: "2", l: "待评价", tab: "pending_review" },
    { v: "2", l: "退换货", tab: "refund" },
  ];

  const menuItems = [
    { icon: Package, label: "我的订单", desc: "查看所有订单", action: () => onGoOrders("all") },
    { icon: Heart, label: "我的收藏", desc: "收藏的单品与搭配", action: onGoFavorites },
    { icon: Tag, label: "我的优惠券", desc: "3张可用", action: onGoCoupons },
    { icon: Footprints, label: "足迹", desc: "已记录 24 套", action: onGoRecords },
    { icon: Headphones, label: "联系客服", desc: "7×12小时在线", action: onCallService },
  ];

  return (
    <div style={{ paddingBottom: 80, overflowY: "auto", height: "100%", background: BG }}>
      {/* Profile header */}
      <div style={{ background: `linear-gradient(160deg, #3a2a18 0%, #6b4a28 100%)`, padding: "28px 20px 32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", overflow: "hidden", border: `2.5px solid ${ACCENT}` }}>
            <img src={IMG.hero} alt="头像" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div>
            <div style={{ fontFamily: font, fontSize: 16, fontWeight: 700, color: "#f5d9a8" }}>小美 · 会员等级:黄金</div>
            <div style={{ fontFamily: font, fontSize: 12, color: "rgba(245,217,168,0.6)", marginTop: 2 }}>有效期至 2027.03.15</div>
          </div>
        </div>

        {/* Stats - clickable, navigate to orders with tab */}
        <div style={{ display: "flex", justifyContent: "space-around", marginTop: 24, padding: "16px 0", background: "rgba(255,255,255,0.08)", borderRadius: 14 }}>
          {orderStats.map((s) => (
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

      {/* Style profile card - clickable */}
      <div
        onClick={onGoStyleProfile}
        style={{ margin: "16px 20px 0", background: CARD, borderRadius: 18, padding: "16px 18px", boxShadow: "0 2px 12px rgba(0,0,0,0.25)", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <User size={22} color={ACCENT} />
          <div>
            <div style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: TEXT }}>个人穿搭画像</div>
            <div style={{ fontFamily: font, fontSize: 12, color: MUTED, marginTop: 1 }}>身材 · 风格 · 衣橱缺口</div>
          </div>
        </div>
        <ChevronRight size={16} color={MUTED} />
      </div>

      {/* VIP card - clickable */}
      <div
        onClick={onGoVip}
        style={{ margin: "16px 20px", background: CARD, borderRadius: 18, padding: "16px 18px", boxShadow: "0 2px 12px rgba(0,0,0,0.25)", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}
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
              borderBottom: i < menuItems.length - 1 ? `1px solid rgba(255,255,255,0.08)` : "none",
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
