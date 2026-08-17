import { useEffect, useRef, useState } from "react";
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
import { initWxConfig } from "../wx";

export function FavoritesPage({ onBack }: { onBack: () => void }) {
  const [filter, setFilter] = useState<"all" | "单品" | "搭配">("all");
  const filtered = filter === "all" ? favoritesData : favoritesData.filter((f) => f.type === filter);

  // 进入页面即注入微信 config（开放标签需要）
  useEffect(() => {
    initWxConfig();
  }, []);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: BG }}>
      <div style={{ padding: "16px 20px 12px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
          <X size={22} color={TEXT} />
        </button>
        <span style={{ fontFamily: font, fontSize: 18, fontWeight: 700, color: TEXT }}>心愿单</span>
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
                <DetailLaunch item={item} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 微信内：<wx-open-launch-weapp> 开放标签跳转小程序；非微信环境：兜底按钮尝试 scheme
// 策略：按钮始终可见（兜底）；微信环境且 wx.config 成功时，透明开放标签覆盖在按钮上方负责跳转
function DetailLaunch({ item }: { item: (typeof favoritesData)[number] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current?.querySelector("wx-open-launch-weapp");
    if (el) {
      const onLaunch = () => console.log("[wx] 跳转小程序:", item.miniPath);
      const onError = (e: any) => console.warn("[wx] 开放标签错误:", e?.detail);
      el.addEventListener("launch", onLaunch);
      el.addEventListener("error", onError);
      return () => {
        el.removeEventListener("launch", onLaunch);
        el.removeEventListener("error", onError);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const html = `
    <wx-open-launch-weapp
      style="position:absolute;top:0;left:0;right:0;bottom:0;width:100%;height:100%;opacity:0;z-index:2;"
      username="${item.miniUsername}"
      path="${item.miniPath}"
      env-version="release"
    >
      <template>
        <div style="width:100%;height:100%;"></div>
      </template>
    </wx-open-launch-weapp>`;

  return (
    <div style={{ position: "relative", marginTop: 10 }}>
      <button
        onClick={() => (window.location.href = item.detailUrl)}
        style={{ width: "100%", background: ACCENT, color: "#fff", fontFamily: font, fontSize: 13, fontWeight: 600, padding: "8px 0", borderRadius: 10, border: "none", cursor: "pointer" }}
      >
        详情
      </button>
      <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 2 }} />
    </div>
  );
}
