import { useState } from "react";
import {
  Check,
  Heart,
  Layers,
  MessageCircle,
  Ruler,
  ShoppingBag,
  Sparkles,
  Star,
  ThumbsUp,
  X,
} from "lucide-react";
import {
  ACCENT,
  ACCENT_LIGHT,
  BG,
  CARD,
  font,
  IMG,
  MUTED,
  productDetails,
  TEXT,
} from "../constants";
import type { Look } from "../types";

export function ProductPage({
  look,
  onBack,
  onGoTryOn,
}: {
  look: Look | null;
  onBack: () => void;
  onGoTryOn: () => void;
}) {
  const [added, setAdded] = useState(false);
  const img = look?.img ?? IMG.product;
  const title = look?.title ?? "高级感白领风";
  const price = look?.price ?? 899;
  const detail = productDetails[look?.id ?? 1] ?? productDetails[1];

  return (
    <div style={{ paddingBottom: 90, overflowY: "auto", height: "100%" }}>
      {/* Hero image */}
      <div style={{ position: "relative" }}>
        <img src={img} alt={title} style={{ width: "100%", height: 400, objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 40%)" }} />
        <button
          onClick={onBack}
          style={{ position: "absolute", top: 16, left: 16, width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.25)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(6px)" }}
        >
          <X size={16} color="#fff" />
        </button>
        <button style={{ position: "absolute", top: 16, right: 16, width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.25)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(6px)" }}>
          <Heart size={16} color="#fff" />
        </button>
        <button
          onClick={onGoTryOn}
          style={{
            position: "absolute",
            bottom: 16,
            right: 16,
            background: `linear-gradient(135deg, ${ACCENT}, #d4a56a)`,
            color: "#fff",
            fontFamily: font,
            fontSize: 12,
            fontWeight: 600,
            padding: "7px 14px",
            borderRadius: 18,
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 5,
            boxShadow: "0 2px 10px rgba(184,135,74,0.5)",
          }}
        >
          <Sparkles size={13} /> AI试衣
        </button>
      </div>

      <div style={{ padding: "20px 20px 0" }}>
        {/* Influencer badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", overflow: "hidden", border: `1.5px solid ${ACCENT}` }}>
            <img src={IMG.hero} alt="董洁" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <span style={{ fontFamily: font, fontSize: 13, fontWeight: 600, color: ACCENT }}>董洁推荐</span>
          <Star size={12} color={ACCENT} fill={ACCENT} />
        </div>

        {/* Title & price */}
        <div style={{ fontFamily: font, fontSize: 22, fontWeight: 700, color: TEXT, marginBottom: 6 }}>{title}</div>
        <div style={{ fontFamily: font, fontSize: 13, color: MUTED, marginBottom: 16 }}>
          {look?.items ?? "白衬衫 + 阔腿裤 + 高跟鞋"}
        </div>
        <div style={{ fontFamily: font, fontSize: 28, fontWeight: 700, color: ACCENT, marginBottom: 20 }}>
          ¥{price}
        </div>

        {/* Why this fits */}
        <div style={{ background: ACCENT_LIGHT, borderRadius: 16, padding: "16px 18px", marginBottom: 20 }}>
          <div style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: TEXT, marginBottom: 10 }}>为什么适合你</div>
          {["修饰肩型，显宽肩高挑", "腰部收紧，强调腰线比例", "通勤场合百搭不出错"].map((reason) => (
            <div key={reason} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
              <Check size={14} color={ACCENT} style={{ flexShrink: 0, marginTop: 2 }} />
              <span style={{ fontFamily: font, fontSize: 13, color: "#7a5c35" }}>{reason}</span>
            </div>
          ))}
        </div>

        {/* Size guide */}
        <div style={{ background: CARD, borderRadius: 16, padding: "14px 18px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginBottom: 20 }}>
          <div style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: TEXT, marginBottom: 10 }}>适合身型</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["155–170cm", "A字型", "梨形身材", "轻熟风格"].map((t) => (
              <span key={t} style={{ background: "#f5f3f0", fontFamily: font, fontSize: 12, color: MUTED, padding: "4px 12px", borderRadius: 10 }}>{t}</span>
            ))}
          </div>
        </div>

        {/* 平铺细节图 */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontFamily: font, fontSize: 15, fontWeight: 700, color: TEXT, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
            <Layers size={16} color={ACCENT} /> 平铺细节图
          </div>
          <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }}>
            {detail.flatImgs.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`平铺图${i + 1}`}
                style={{
                  width: detail.flatImgs.length === 1 ? "100%" : 112,
                  height: "auto",
                  aspectRatio: undefined,
                  objectFit: "contain",
                  borderRadius: 12,
                  flexShrink: 0,
                  border: `1px solid rgba(184,135,74,0.12)`,
                  background: "#f5f3f0",
                }}
              />
            ))}
          </div>
        </div>

        {/* 码数细节 */}
        <div style={{ background: CARD, borderRadius: 16, padding: "14px 16px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginBottom: 20 }}>
          <div style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: TEXT, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
            <Ruler size={16} color={ACCENT} /> 码数细节
          </div>
          <div style={{ display: "flex", background: ACCENT_LIGHT, borderRadius: 10, overflow: "hidden", fontFamily: font, fontSize: 11, color: "#7a5c35" }}>
            {["尺码", "肩宽", "胸围", "腰围", detail.lengthLabel].map((h, i) => (
              <div key={h} style={{ flex: 1, textAlign: "center", padding: "8px 2px", fontWeight: 600, borderRight: i < 4 ? "1px solid rgba(184,135,74,0.15)" : "none" }}>{h}</div>
            ))}
          </div>
          {detail.sizeChart.map((row, i) => (
            <div key={row.size} style={{ display: "flex", fontFamily: font, fontSize: 12, color: TEXT, borderBottom: i < detail.sizeChart.length - 1 ? "1px solid #f0ece6" : "none" }}>
              {[row.size, row.shoulder, row.bust, row.waist, row.length].map((c, j) => (
                <div key={j} style={{ flex: 1, textAlign: "center", padding: "9px 2px", borderRight: j < 4 ? "1px solid #f0ece6" : "none", fontWeight: j === 0 ? 600 : 400, color: j === 0 ? ACCENT : TEXT }}>{c}</div>
              ))}
            </div>
          ))}
          <div style={{ fontFamily: font, fontSize: 11, color: MUTED, marginTop: 10, lineHeight: 1.5 }}>＊ 以上为平铺手工测量数据，存在 1–2cm 误差，建议按平时尺码选择；试衣间已上线 AI 试衣可先预览上身效果。</div>
        </div>

        {/* 买家真实评价 */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ fontFamily: font, fontSize: 15, fontWeight: 700, color: TEXT, display: "flex", alignItems: "center", gap: 6 }}>
              <MessageCircle size={16} color={ACCENT} /> 买家真实评价
              <span style={{ fontFamily: font, fontSize: 13, fontWeight: 400, color: MUTED }}>({detail.reviews.length})</span>
            </div>
            <span style={{ fontFamily: font, fontSize: 12, color: ACCENT, fontWeight: 600 }}>好评率 98%</span>
          </div>
          {detail.reviews.map((r, i) => (
            <div key={i} style={{ background: CARD, borderRadius: 14, padding: "14px 16px", marginBottom: 10, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: ACCENT_LIGHT, color: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, fontFamily: font, flexShrink: 0 }}>{r.initial}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: font, fontSize: 13, fontWeight: 600, color: TEXT }}>{r.user}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 2 }}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star key={n} size={11} color={n <= r.rating ? ACCENT : "#e0d8cc"} fill={n <= r.rating ? ACCENT : "none"} />
                    ))}
                    <span style={{ fontFamily: font, fontSize: 11, color: MUTED, marginLeft: 4 }}>{r.size}码 · {r.date}</span>
                  </div>
                </div>
              </div>
              <div style={{ fontFamily: font, fontSize: 13, color: "#5a5048", lineHeight: 1.65 }}>{r.content}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 9, fontFamily: font, fontSize: 12, color: MUTED }}>
                <ThumbsUp size={13} /> {r.likes} 人觉得有用
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed bottom CTA */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, padding: "12px 20px 20px", background: BG, borderTop: `1px solid rgba(184,135,74,0.12)` }}>
        <button
          onClick={() => setAdded(true)}
          style={{
            width: "100%", padding: "14px", borderRadius: 26, border: "none",
            background: added ? "#2e7d32" : ACCENT,
            color: "#fff", fontFamily: font, fontSize: 15, fontWeight: 700,
            cursor: "pointer", transition: "background 0.3s",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}
        >
          {added ? <><Check size={16} /> 已加入购物车</> : <><ShoppingBag size={16} /> 立即购买</>}
        </button>
      </div>
    </div>
  );
}
