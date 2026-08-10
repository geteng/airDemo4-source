import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Heart, Sparkles } from "lucide-react";
import { ACCENT, ACCENT_LIGHT, CARD, font, looks, MUTED, TEXT } from "../constants";
import type { Look } from "../types";
import { Pill } from "../components/Pill";

export function RecommendPage({
  onGoProduct,
  onGoTryOn,
}: {
  onGoProduct: (look: Look) => void;
  onGoTryOn: (look: Look) => void;
}) {
  const [activeScene, setActiveScene] = useState("通勤");
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());

  const scenes = ["通勤", "约会", "旅行"];
  const sceneLooks = looks.filter((l) => l.scene === activeScene);

  const toggleLike = (id: number) => {
    setLikedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div style={{ paddingBottom: 80, overflowY: "auto", height: "100%" }}>
      <div style={{ padding: "16px 20px 14px" }}>
        <span style={{ fontFamily: font, fontSize: 20, fontWeight: 700, color: TEXT }}>穿搭定制</span>
      </div>

      {/* Scene tabs */}
      <div style={{ padding: "0 20px 16px", display: "flex", gap: 8, overflowX: "auto" }}>
        {scenes.map((s) => (
          <Pill key={s} active={activeScene === s} onClick={() => setActiveScene(s)}>
            {s}
          </Pill>
        ))}
      </div>

      {/* Looks grid */}
      <div style={{ padding: "0 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {sceneLooks.map((look) => {
          const liked = likedItems.has(look.id);
          return (
            <div key={look.id} style={{ background: CARD, borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
              <div style={{ height: 200, background: "#f0ebe3", overflow: "hidden", position: "relative" }}>
                <img src={look.img} alt={look.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <button
                  onClick={(e) => { e.stopPropagation(); toggleLike(look.id); }}
                  style={{ position: "absolute", top: 8, right: 8, background: "rgba(255,255,255,0.85)", border: "none", borderRadius: "50%", width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 5 }}
                >
                  <Heart size={16} color={liked ? "#ff2442" : "#9a8f82"} fill={liked ? "#ff2442" : "none"} />
                </button>
                {/* AI 试衣按钮 */}
                <button
                  onClick={(e) => { e.stopPropagation(); onGoTryOn(look); }}
                  style={{ position: "absolute", bottom: 8, right: 8, background: `linear-gradient(135deg, ${ACCENT}, #d4a56a)`, color: "#fff", fontFamily: font, fontSize: 11, fontWeight: 600, padding: "5px 10px", borderRadius: 14, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, boxShadow: "0 2px 8px rgba(184,135,74,0.4)", zIndex: 5 }}
                >
                  <Sparkles size={11} /> AI试衣
                </button>
              </div>
              <div style={{ padding: "10px 12px 12px" }}>
                <div style={{ fontFamily: font, fontSize: 13, fontWeight: 500, color: TEXT, marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{look.title}</div>
                <div style={{ fontFamily: font, fontSize: 11, color: MUTED, marginBottom: 8 }}>{look.items}</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: font, fontSize: 14, fontWeight: 700, color: ACCENT }}>¥{look.price}</span>
                  <button
                    onClick={() => onGoProduct(look)}
                    style={{ background: ACCENT_LIGHT, border: "none", borderRadius: 16, padding: "6px 12px", display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}
                  >
                    <span style={{ fontFamily: font, fontSize: 12, color: ACCENT, fontWeight: 500 }}>详情</span>
                    <ChevronRight size={13} color={ACCENT} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom illustration strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{ margin: "24px 20px 0", background: ACCENT_LIGHT, borderRadius: 18, padding: "20px 18px", display: "flex", alignItems: "center", gap: 14 }}
      >
        <Sparkles size={28} color={ACCENT} />
        <div>
          <div style={{ fontFamily: font, fontSize: 14, fontWeight: 700, color: TEXT }}>更多穿搭建议</div>
          <div style={{ fontFamily: font, fontSize: 12, color: MUTED, marginTop: 2 }}>根据你的身材与喜好，每日更新专属搭配</div>
        </div>
      </motion.div>
    </div>
  );
}
