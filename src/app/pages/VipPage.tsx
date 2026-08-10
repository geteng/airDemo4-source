import { X } from "lucide-react";
import { ACCENT, ACCENT_LIGHT, BG, CARD, font, IMG, MUTED, TEXT, vipBenefits } from "../constants";

export function VipPage({ onBack }: { onBack: () => void }) {
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
          {vipBenefits.map((b) => (
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
