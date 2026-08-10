import { useState } from "react";
import { X } from "lucide-react";
import { ACCENT, ACCENT_LIGHT, BG, CARD, font, MUTED, ordersData, TEXT } from "../constants";

export function OrdersPage({
  onBack,
  initialTab,
}: {
  onBack: () => void;
  initialTab?: string;
}) {
  const [activeTab, setActiveTab] = useState(initialTab || "all");
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
