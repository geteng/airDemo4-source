import { useState } from "react";
import { Heart, X } from "lucide-react";
import {
  ACCENT,
  ACCENT_LIGHT,
  BG,
  CARD,
  favoritesData,
  font,
  TEXT,
} from "../constants";

export function FavoritesPage({ onBack }: { onBack: () => void }) {
  const [filter, setFilter] = useState<"all" | "单品" | "搭配">("all");
  const filtered = filter === "all" ? favoritesData : favoritesData.filter((f) => f.type === filter);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: BG }}>
      <div style={{ padding: "16px 20px 12px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
          <X size={22} color={TEXT} />
        </button>
        <span style={{ fontFamily: font, fontSize: 18, fontWeight: 700, color: TEXT }}>我的收藏</span>
      </div>

      <div style={{ padding: "0 20px 12px", display: "flex", gap: 8, flexShrink: 0 }}>
        {[{ k: "all", l: "全部" }, { k: "单品", l: "单品" }, { k: "搭配", l: "搭配" }].map((t) => (
          <button
            key={t.k}
            onClick={() => setFilter(t.k as "all" | "单品" | "搭配")}
            style={{
              background: filter === t.k ? ACCENT : ACCENT_LIGHT,
              color: filter === t.k ? "#fff" : ACCENT,
              fontFamily: font, fontSize: 12, fontWeight: 500,
              padding: "6px 14px", borderRadius: 18, border: "none", cursor: "pointer",
            }}
          >
            {t.l}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {filtered.map((item) => (
            <div key={item.id} style={{ background: CARD, borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
              <div style={{ height: 160, overflow: "hidden", position: "relative" }}>
                <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <span style={{ position: "absolute", top: 8, left: 8, background: "rgba(0,0,0,0.5)", color: "#fff", fontFamily: font, fontSize: 10, padding: "2px 8px", borderRadius: 8 }}>{item.type}</span>
              </div>
              <div style={{ padding: "10px 12px 12px" }}>
                <div style={{ fontFamily: font, fontSize: 13, fontWeight: 600, color: TEXT, marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: font, fontSize: 15, fontWeight: 700, color: ACCENT }}>¥{item.price}</span>
                  <Heart size={16} color="#e53935" fill="#e53935" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
