import { X } from "lucide-react";
import {
  ACCENT,
  ACCENT_LIGHT,
  BG,
  CARD,
  font,
  MUTED,
  recordsData,
  TEXT,
} from "../constants";

export function RecordsPage({ onBack }: { onBack: () => void }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: BG }}>
      <div style={{ padding: "16px 20px 12px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
          <X size={22} color={TEXT} />
        </button>
        <span style={{ fontFamily: font, fontSize: 18, fontWeight: 700, color: TEXT }}>足迹</span>
      </div>

      {/* Stats */}
      <div style={{ margin: "0 20px 12px", background: ACCENT_LIGHT, borderRadius: 14, padding: "12px 16px", display: "flex", justifyContent: "space-around", flexShrink: 0 }}>
        {[{ v: "24", l: "总记录" }, { v: "18", l: "本月" }, { v: "6", l: "场景" }].map((s) => (
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
