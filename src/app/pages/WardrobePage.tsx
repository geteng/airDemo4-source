import { useState } from "react";
import { Camera, Plus, Sparkles } from "lucide-react";
import {
  ACCENT,
  ACCENT_LIGHT,
  CARD,
  font,
  MUTED,
  TEXT,
  wardrobeCategories,
  wardrobeItems,
} from "../constants";
import type { WardrobeItem } from "../types";
import { Pill } from "../components/Pill";

export function WardrobePage({
  onGoTryOn,
}: {
  onGoTryOn: (item: WardrobeItem) => void;
}) {
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
        {wardrobeCategories.map((c) => (
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
        {[{ label: "单品总数", value: "41" }, { label: "本月穿搭", value: "18次" }, { label: "利用率", value: "76%" }].map((s) => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: font, fontSize: 18, fontWeight: 700, color: ACCENT }}>{s.value}</div>
            <div style={{ fontFamily: font, fontSize: 11, color: MUTED }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div style={{ padding: "0 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {wardrobeItems.map((item) => (
          <div key={item.id} style={{ background: CARD, borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
            <div style={{ height: 150, background: "#f0ebe3", overflow: "hidden", position: "relative" }}>
              <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              {item.video && (
                <video
                  src={item.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
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
                <Sparkles size={11} /> 我试试
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
