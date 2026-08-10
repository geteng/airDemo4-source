import { motion } from "framer-motion";
import { ArrowLeft, Heart, Play, Share2, ShoppingBag, X } from "lucide-react";
import { ACCENT, BG, CARD, font, MUTED, STYLIST_NAME, TEXT } from "../constants";
import type { Look } from "../types";

export function LivePage({
  onBack,
  onGoProduct,
}: {
  onBack: () => void;
  onGoProduct: (look: Look) => void;
}) {
  const liveProducts = [
    { id: 1, name: "高级感白领风套装", price: 899, img: "https://images.unsplash.com/photo-1664076458686-3449062080ac?w=400&h=560&fit=crop&auto=format" },
    { id: 2, name: "都市柔美格调", price: 1260, img: "https://images.unsplash.com/photo-1629511565591-a1d494ad6c58?w=400&h=560&fit=crop&auto=format" },
    { id: 3, name: "轻盈度假系", price: 680, img: "https://images.unsplash.com/photo-1627130697816-4d71dbfe6a5b?w=400&h=560&fit=crop&auto=format" },
  ];
  return (
    <div style={{ height: "100%", background: "#1c1a17", position: "relative", overflowY: "auto" }}>
      {/* Top bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 10, padding: "16px 20px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(28,26,23,0.6)", backdropFilter: "blur(8px)" }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <ArrowLeft size={18} color="#fff" />
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,72,72,0.9)", borderRadius: 16, padding: "4px 12px" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff", display: "inline-block" }} />
            <span style={{ fontFamily: font, fontSize: 12, color: "#fff", fontWeight: 600 }}>直播中</span>
          </div>
          <button style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <X size={18} color="#fff" />
          </button>
        </div>
      </div>

      {/* Live cover */}
      <div style={{ position: "relative", height: 360, margin: "0 20px", borderRadius: 20, overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=900&fit=crop&auto=format" alt="直播" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(28,26,23,0.7), transparent 50%)" }} />
        <div style={{ position: "absolute", bottom: 16, left: 16, right: 16 }}>
          <div style={{ fontFamily: font, fontSize: 18, fontWeight: 700, color: "#fff" }}>秋冬通勤穿搭分享</div>
          <div style={{ fontFamily: font, fontSize: 13, color: "rgba(255,255,255,0.85)", marginTop: 4 }}>{STYLIST_NAME} · 1.2万人在线</div>
        </div>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 64, height: 64, borderRadius: "50%", background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}>
          <Play size={28} color="#fff" fill="#fff" />
        </div>
      </div>

      {/* Interaction bar */}
      <div style={{ display: "flex", gap: 12, padding: "16px 20px" }}>
        <button style={{ flex: 1, background: ACCENT, border: "none", borderRadius: 14, padding: "12px", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, cursor: "pointer" }}>
          <Heart size={18} color="#fff" /> <span style={{ fontFamily: font, fontSize: 14, color: "#fff", fontWeight: 600 }}>点赞主播</span>
        </button>
        <button style={{ flex: 1, background: "rgba(255,255,255,0.12)", border: "none", borderRadius: 14, padding: "12px", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, cursor: "pointer" }}>
          <Share2 size={18} color="#fff" /> <span style={{ fontFamily: font, fontSize: 14, color: "#fff", fontWeight: 600 }}>分享</span>
        </button>
      </div>

      {/* Products in live */}
      <div style={{ padding: "0 20px 24px" }}>
        <div style={{ fontFamily: font, fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 12 }}>直播同款</div>
        <div style={{ display: "flex", gap: 12, overflowX: "auto" }}>
          {liveProducts.map((p) => (
            <div key={p.id} onClick={() => onGoProduct({ id: p.id, img: p.img, scene: "", title: p.name, items: "", price: p.price, liked: false })} style={{ flexShrink: 0, width: 140, background: CARD, borderRadius: 14, overflow: "hidden", cursor: "pointer" }}>
              <div style={{ height: 140, overflow: "hidden" }}>
                <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: "8px 10px" }}>
                <div style={{ fontFamily: font, fontSize: 12, color: TEXT, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6 }}>
                  <span style={{ fontFamily: font, fontSize: 14, fontWeight: 700, color: ACCENT }}>¥{p.price}</span>
                  <ShoppingBag size={14} color={MUTED} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ height: 40, background: BG }} />
    </div>
  );
}
