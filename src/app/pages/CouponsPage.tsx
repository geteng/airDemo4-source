import { useState } from "react";
import { Sparkles, X } from "lucide-react";
import {
  ACCENT,
  ACCENT_LIGHT,
  BG,
  CARD,
  couponsData,
  font,
  MUTED,
  TEXT,
} from "../constants";

export function CouponsPage({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<"available" | "expired">("available");
  // 「去使用」点击后的「敬请期待」弹窗
  const [showComingSoon, setShowComingSoon] = useState(false);
  const filtered = couponsData.filter((c) => c.status === tab);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: BG }}>
      <div style={{ padding: "16px 20px 12px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
          <X size={22} color={TEXT} />
        </button>
        <span style={{ fontFamily: font, fontSize: 18, fontWeight: 700, color: TEXT }}>我的优惠券</span>
      </div>

      <div style={{ padding: "0 20px 12px", display: "flex", gap: 8, flexShrink: 0 }}>
        <button onClick={() => setTab("available")} style={{ background: tab === "available" ? ACCENT : ACCENT_LIGHT, color: tab === "available" ? "#fff" : ACCENT, fontFamily: font, fontSize: 13, fontWeight: 500, padding: "6px 16px", borderRadius: 18, border: "none", cursor: "pointer" }}>可用 ({couponsData.filter((c) => c.status === "available").length})</button>
        <button onClick={() => setTab("expired")} style={{ background: tab === "expired" ? ACCENT : ACCENT_LIGHT, color: tab === "expired" ? "#fff" : ACCENT, fontFamily: font, fontSize: 13, fontWeight: 500, padding: "6px 16px", borderRadius: 18, border: "none", cursor: "pointer" }}>已过期 ({couponsData.filter((c) => c.status === "expired").length})</button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 20px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map((coupon) => (
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
                  <button
                    onClick={() => setShowComingSoon(true)}
                    style={{ alignSelf: "flex-start", padding: "5px 14px", borderRadius: 14, border: "none", background: ACCENT, color: "#fff", fontFamily: font, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                  >
                    去使用
                  </button>
                ) : (
                  <span style={{ fontFamily: font, fontSize: 12, color: MUTED }}>已过期</span>
                )}
              </div>
            </div>
          ))}
        </div>
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
              优惠券使用功能正在开发中，上线后即可用于下单抵扣
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
