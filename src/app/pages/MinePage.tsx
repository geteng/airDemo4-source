import {
  Package, Heart, Tag, Footprints, Headphones,
  Award, ChevronRight, LogOut, User, ShoppingBag, ShoppingCart, ShieldCheck, Camera,
} from "lucide-react";
import { ACCENT, ACCENT_LIGHT, BG, CARD, cartData, font, IMG, MUTED, TEXT } from "../constants";
import type { MockUser } from "../types";

export function MinePage({
  currentUser,
  onLogout,
  onGoOrders,
  onGoCart,
  onGoFavorites,
  onGoCoupons,
  onGoRecords,
  onGoVip,
  onCallService,
  onGoStyleProfile,
  onGoWardrobe,
  onGoPrivacy,
  onGoIdentity,
}: {
  currentUser?: MockUser | null;
  onLogout: () => void;
  onGoOrders: (tab?: string) => void;
  onGoCart: () => void;
  onGoFavorites: () => void;
  onGoCoupons: () => void;
  onGoRecords: () => void;
  onGoVip: () => void;
  onCallService: () => void;
  onGoStyleProfile: () => void;
  onGoWardrobe: () => void;
  onGoPrivacy: () => void;
  onGoIdentity: () => void;
}) {
  const orderStats = [
    { v: "3", l: "待付款", tab: "pending_pay" },
    { v: "1", l: "待发货", tab: "pending_ship" },
    { v: "2", l: "待评价", tab: "pending_review" },
    { v: "2", l: "退换货", tab: "refund" },
  ];

  const menuItems = [
    { icon: ShoppingCart, label: "购物车", desc: `已加入 ${cartData.reduce((sum, i) => sum + i.qty, 0)} 件商品`, action: onGoCart },
    { icon: Package, label: "我的订单", desc: "查看所有订单", action: () => onGoOrders("all") },
    { icon: Heart, label: "我的收藏", desc: "收藏的单品与搭配", action: onGoFavorites },
    { icon: Tag, label: "我的优惠券", desc: "3张可用", action: onGoCoupons },
    // { icon: Footprints, label: "足迹", desc: "已记录 24 套", action: onGoRecords },
    { icon: Headphones, label: "联系客服", desc: "7×12小时在线", action: onCallService },
  ];

  return (
    <div style={{ paddingBottom: 80, overflowY: "auto", height: "100%", background: BG }}>
      {/* Profile header */}
      <div style={{ background: `linear-gradient(160deg, #3a2a18 0%, #6b4a28 100%)`, padding: "28px 20px 32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {currentUser ? (
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                border: `2.5px solid ${ACCENT}`,
                background: `linear-gradient(150deg, #f0d7ae, #d4a56a)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: font,
                fontSize: 26,
                fontWeight: 800,
                color: "#2a1d0c",
                flexShrink: 0,
              }}
            >
              {currentUser.nickname.slice(0, 1)}
            </div>
          ) : (
            <div style={{ width: 64, height: 64, borderRadius: "50%", overflow: "hidden", border: `2.5px solid ${ACCENT}` }}>
              <img src={IMG.hero} alt="头像" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: font, fontSize: 16, fontWeight: 700, color: "#f5d9a8" }}>
              {currentUser ? `${currentUser.nickname} · 会员等级:黄金` : "小美 · 会员等级:黄金"}
            </div>
            <div style={{ fontFamily: font, fontSize: 12, color: "rgba(245,217,168,0.6)", marginTop: 2 }}>
              {currentUser ? (
                <>
                  <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>体验账号 {currentUser.account}</div>
                  <div style={{ marginTop: 2, whiteSpace: "nowrap" }}>有效期至 2027.03.15</div>
                </>
              ) : (
                "有效期至 2027.03.15"
              )}
            </div>
          </div>
          <button
            onClick={onLogout}
            style={{
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              gap: 5,
              border: "1px solid rgba(245,217,168,0.5)",
              background: "rgba(255,255,255,0.08)",
              color: "#f5d9a8",
              borderRadius: 20,
              padding: "7px 12px",
              cursor: "pointer",
              fontFamily: font,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            <LogOut size={13} />
            切换账号
          </button>
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

      {/* Style profile card - clickable, contains 个人衣橱 */}
      <div
        style={{ margin: "16px 20px 0", background: CARD, borderRadius: 18, boxShadow: "0 2px 12px rgba(0,0,0,0.25)", overflow: "hidden" }}
      >
        <div
          onClick={onGoStyleProfile}
          style={{ padding: "15px 18px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}
        >
          <div style={{ width: 36, height: 36, borderRadius: 10, background: ACCENT_LIGHT, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <User size={16} color={ACCENT} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: font, fontSize: 14, fontWeight: 500, color: TEXT }}>个人穿搭画像</div>
            <div style={{ fontFamily: font, fontSize: 12, color: MUTED, marginTop: 1 }}>身材 · 风格 · 衣橱缺口</div>
          </div>
          <ChevronRight size={16} color={MUTED} />
        </div>
        <div
          onClick={onGoWardrobe}
          style={{ padding: "15px 18px", display: "flex", alignItems: "center", gap: 14, borderTop: `1px solid rgba(255,255,255,0.08)`, cursor: "pointer" }}
        >
          <div style={{ width: 36, height: 36, borderRadius: 10, background: ACCENT_LIGHT, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ShoppingBag size={16} color={ACCENT} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: font, fontSize: 14, fontWeight: 500, color: TEXT }}>个人衣橱</div>
            <div style={{ fontFamily: font, fontSize: 12, color: MUTED, marginTop: 1 }}>我的单品与搭配</div>
          </div>
          <ChevronRight size={16} color={MUTED} />
        </div>
      </div>

      {/* Identity & privacy card - right below 个人衣橱 */}
      <div
        style={{ margin: "12px 20px 0", background: CARD, borderRadius: 18, boxShadow: "0 2px 12px rgba(0,0,0,0.25)", overflow: "hidden" }}
      >
        <div
          onClick={onGoIdentity}
          style={{ padding: "15px 18px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}
        >
          <div style={{ width: 36, height: 36, borderRadius: 10, background: ACCENT_LIGHT, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Camera size={16} color={ACCENT} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: font, fontSize: 14, fontWeight: 500, color: TEXT }}>我的专属形象</div>
            <div style={{ fontFamily: font, fontSize: 12, color: MUTED, marginTop: 1 }}>上传照片创建虚拟身份</div>
          </div>
          <ChevronRight size={16} color={MUTED} />
        </div>
        <div
          onClick={onGoPrivacy}
          style={{ padding: "15px 18px", display: "flex", alignItems: "center", gap: 14, borderTop: `1px solid rgba(255,255,255,0.08)`, cursor: "pointer" }}
        >
          <div style={{ width: 36, height: 36, borderRadius: 10, background: ACCENT_LIGHT, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ShieldCheck size={16} color={ACCENT} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: font, fontSize: 14, fontWeight: 500, color: TEXT }}>隐私条款相关</div>
            <div style={{ fontFamily: font, fontSize: 12, color: MUTED, marginTop: 1 }}>查看隐私政策与协议</div>
          </div>
          <ChevronRight size={16} color={MUTED} />
        </div>
      </div>

      {/* VIP card - clickable */}
      <div
        onClick={onGoVip}
        style={{ margin: "16px 20px", background: CARD, borderRadius: 18, padding: "15px 18px", boxShadow: "0 2px 12px rgba(0,0,0,0.25)", display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}
      >
        <div style={{ width: 36, height: 36, borderRadius: 10, background: ACCENT_LIGHT, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Award size={16} color={ACCENT} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: font, fontSize: 14, fontWeight: 500, color: TEXT }}>VIP 专属权益</div>
          <div style={{ fontFamily: font, fontSize: 12, color: MUTED, marginTop: 1 }}>每周穿搭建议 · 新品优先看</div>
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