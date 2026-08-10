import { useState, useEffect } from "react";
import { Heart, Sparkles } from "lucide-react";
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
  const [activeScene, setActiveScene] = useState("约会");
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());

  const scenes = ["约会", "通勤", "旅行"];
  const sceneLooks = looks.filter((l) => l.scene === activeScene);

  // 场景标签自动轮播：默认每 2 秒切换到下一个；用户手动点击某个 tab 后会重置计时。
  useEffect(() => {
    const t = setInterval(() => {
      setActiveScene((cur) => {
        const idx = scenes.indexOf(cur);
        return scenes[(idx + 1) % scenes.length];
      });
    }, 2000);
    return () => clearInterval(t);
  }, [activeScene]);

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
        <div style={{ fontFamily: font, fontSize: 12, color: MUTED, marginTop: 2 }}>为你精选的穿搭方案</div>
      </div>

      {/* Scene tabs */}
      <div style={{ padding: "0 20px 20px", display: "flex", gap: 8 }}>
        {scenes.map((s) => (
          <Pill key={s} active={activeScene === s} onClick={() => setActiveScene(s)}>
            {s}
          </Pill>
        ))}
      </div>

      {/* Look cards */}
      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 16 }}>
        {sceneLooks.map((look) => {
          const liked = likedItems.has(look.id);
          return (
            <div key={look.id} style={{ background: CARD, borderRadius: 20, overflow: "hidden", boxShadow: "0 3px 16px rgba(0,0,0,0.07)" }}>
              <div style={{ position: "relative" }}>
                <img src={look.img} alt={look.title} style={{ width: "100%", height: 300, objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(28,26,23,0.65) 0%, transparent 50%)" }} />
                <button
                  onClick={(e) => { e.stopPropagation(); toggleLike(look.id); }}
                  style={{ position: "absolute", top: 14, right: 14, width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.2)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)", zIndex: 5 }}
                >
                  <Heart size={16} color={liked ? "#e53935" : "#fff"} fill={liked ? "#e53935" : "none"} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onGoTryOn(look); }}
                  style={{
                    position: "absolute",
                    bottom: 14,
                    right: 14,
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
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 16px 16px" }}>
                  <div style={{ fontFamily: font, fontSize: 17, fontWeight: 700, color: "#fff" }}>{look.title}</div>
                  <div style={{ fontFamily: font, fontSize: 12, color: "rgba(255,255,255,0.75)", marginTop: 2 }}>{look.items}</div>
                </div>
              </div>
              <div style={{ padding: "14px 16px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontFamily: font, fontSize: 11, color: MUTED }}>套装参考价</div>
                  <div style={{ fontFamily: font, fontSize: 20, fontWeight: 700, color: ACCENT }}>¥{look.price}</div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => toggleLike(look.id)}
                    style={{ padding: "9px 14px", borderRadius: 20, border: `1.5px solid ${ACCENT}`, background: "transparent", fontFamily: font, fontSize: 13, color: ACCENT, fontWeight: 500, cursor: "pointer" }}
                  >
                    收藏
                  </button>
                  <button
                    onClick={() => onGoProduct(look)}
                    style={{ padding: "9px 18px", borderRadius: 20, border: "none", background: ACCENT, fontFamily: font, fontSize: 13, color: "#fff", fontWeight: 600, cursor: "pointer" }}
                  >
                    详情
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 更多穿搭建议 */}
      <div
        style={{ margin: "24px 20px 0", background: ACCENT_LIGHT, borderRadius: 18, padding: "20px 18px", display: "flex", alignItems: "center", gap: 14 }}
      >
        <Sparkles size={28} color={ACCENT} />
        <div>
          <div style={{ fontFamily: font, fontSize: 14, fontWeight: 700, color: TEXT }}>更多穿搭建议</div>
          <div style={{ fontFamily: font, fontSize: 12, color: MUTED, marginTop: 2 }}>根据你的身材与喜好，每日更新专属搭配</div>
        </div>
      </div>
    </div>
  );
}
