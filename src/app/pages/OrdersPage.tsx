import { useState } from "react";
import { Sparkles, X } from "lucide-react";
import { ACCENT, ACCENT_LIGHT, BG, CARD, font, MUTED, ordersData, TEXT } from "../constants";

export function OrdersPage({
  onBack,
  initialTab,
}: {
  onBack: () => void;
  initialTab?: string;
}) {
  const [activeTab, setActiveTab] = useState(initialTab || "all");
  // 订单列表内各操作按钮点击后的「敬请期待」弹窗
  const [showComingSoon, setShowComingSoon] = useState(false);
  const comingSoon = () => setShowComingSoon(true);
  const orderTabs = [
    { key: "all", label: "全部" },
    { key: "pending_pay", label: "待付款" },
    { key: "pending_ship", label: "待发货" },
    { key: "pending_review", label: "待评价" },
    { key: "refund", label: "退换货" },
  ];
  const filtered = activeTab === "all" ? ordersData : ordersData.filter((o) => o.status === activeTab);

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
        {orderTabs.map((t) => (
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
            {filtered.map((order) => (
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
                      <button onClick={comingSoon} style={{ padding: "7px 16px", borderRadius: 18, border: `1px solid ${ACCENT}`, background: "transparent", color: ACCENT, fontFamily: font, fontSize: 12, fontWeight: 500, cursor: "pointer" }}>取消订单</button>
                      <button onClick={comingSoon} style={{ padding: "7px 16px", borderRadius: 18, border: "none", background: ACCENT, color: "#fff", fontFamily: font, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>去付款</button>
                    </>
                  )}
                  {order.status === "pending_ship" && (
                    <button onClick={comingSoon} style={{ padding: "7px 16px", borderRadius: 18, border: `1px solid ${ACCENT}`, background: "transparent", color: ACCENT, fontFamily: font, fontSize: 12, fontWeight: 500, cursor: "pointer" }}>提醒发货</button>
                  )}
                  {order.status === "pending_review" && (
                    <button onClick={comingSoon} style={{ padding: "7px 16px", borderRadius: 18, border: "none", background: ACCENT, color: "#fff", fontFamily: font, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>去评价</button>
                  )}
                  {order.status === "refund" && (
                    <button onClick={comingSoon} style={{ padding: "7px 16px", borderRadius: 18, border: `1px solid ${ACCENT}`, background: "transparent", color: ACCENT, fontFamily: font, fontSize: 12, fontWeight: 500, cursor: "pointer" }}>查看详情</button>
                  )}
                  {order.status === "done" && (
                    <button onClick={comingSoon} style={{ padding: "7px 16px", borderRadius: 18, border: `1px solid ${ACCENT}`, background: "transparent", color: ACCENT, fontFamily: font, fontSize: 12, fontWeight: 500, cursor: "pointer" }}>再次购买</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 敬请期待弹窗 */}
      {showComingSoon && (
        <div
          onClick={() => setShowComingSoon(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 150,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "28px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 300,
              background: CARD,
              border: "1px solid rgba(212,165,106,0.3)",
              borderRadius: 20,
              padding: "26px 22px 20px",
              textAlign: "center",
              boxShadow: "0 18px 50px rgba(0,0,0,0.55)",
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "rgba(212,165,106,0.14)",
                margin: "0 auto 14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Sparkles size={30} color={ACCENT} />
            </div>
            <div style={{ fontFamily: font, fontSize: 18, fontWeight: 800, color: TEXT }}>敬请期待</div>
            <div style={{ fontFamily: font, fontSize: 13, color: MUTED, marginTop: 8, lineHeight: 1.65 }}>
              该功能正在开发中，敬请期待
            </div>
            <button
              onClick={() => setShowComingSoon(false)}
              style={{
                width: "100%",
                marginTop: 18,
                padding: "12px 0",
                borderRadius: 22,
                border: "none",
                background: `linear-gradient(90deg, ${ACCENT}, #d4a56a)`,
                color: "#18160F",
                fontFamily: font,
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              我知道了
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
