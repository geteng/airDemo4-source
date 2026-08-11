import { useState } from "react";
import { Camera, ChevronLeft } from "lucide-react";
import {
  ACCENT,
  ACCENT_LIGHT,
  CARD,
  font,
  IMG,
  MUTED,
  TEXT,
} from "../constants";
import type { WardrobeItem } from "../types";

// 常用搭配 mock 数据
const lookItems: WardrobeItem[] = [
  {
    id: 1,
    img: IMG.wardrobe1,
    name: "白衬衫",
    date: "",
    times: 0,
    purpose: "基础款/通勤/内搭",
  },
  {
    id: 2,
    img: IMG.wardrobe4,
    name: "黑色西裤",
    date: "",
    times: 0,
    purpose: "通勒/下装",
  },
  {
    id: 3,
    img: IMG.wardrobe3,
    name: "蓝色牛仔裤",
    date: "",
    times: 0,
    purpose: "休闲/下装",
  },
   {
    id: 4,
    img: IMG.wardrobe2,
    name: "黑色西装休闲外套",
    date: "",
    times: 0,
    purpose: "通勤/休闲/外层",
  },
];

export function WardrobePage({
  onGoTryOn,
  onBack,
}: {
  onGoTryOn: (item: WardrobeItem) => void;
  onBack: () => void;
}) {
  const [activeCategory, setActiveCategory] = useState("全部");
  const categories = ["全部", "通勤", "内搭", "休闲"];
  const items =
    activeCategory === "全部"
      ? lookItems
      : lookItems.filter(
          (it) => it.name.includes(activeCategory) || (it.purpose ?? "").includes(activeCategory)
        );

  return (
    <div style={{ paddingBottom: 80, overflowY: "auto", height: "100%" }}>
      <div style={{ padding: "16px 20px 14px", display: "flex", alignItems: "center", gap: 8 }}>
        <button
          onClick={onBack}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: 2 }}
        >
          <ChevronLeft size={22} color={TEXT} />
        </button>
        <span style={{ fontFamily: font, fontSize: 20, fontWeight: 700, color: TEXT }}>我的衣橱</span>
      </div>

      {/* Category tabs */}
      <div style={{ padding: "0 20px 16px", display: "flex", gap: 8, overflowX: "auto" }}>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            style={{
              flexShrink: 0,
              background: activeCategory === c ? ACCENT : ACCENT_LIGHT,
              color: activeCategory === c ? "#fff" : ACCENT,
              fontFamily: font, fontSize: 13, fontWeight: 500,
              padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer",
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ padding: "0 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {items.map((item) => (
          <div key={item.id} style={{ background: CARD, borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
            <div style={{ height: 150, background: "#f0ebe3", overflow: "hidden", position: "relative" }}>
              <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ padding: "10px 12px 12px" }}>
              <div style={{ fontFamily: font, fontSize: 13, fontWeight: 500, color: TEXT, marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</div>
              <div style={{ fontFamily: font, fontSize: 11, color: MUTED, lineHeight: 1.4 }}>
                {item.purpose}
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
