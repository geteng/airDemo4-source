import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, RefreshCw, Share2, Sparkles, X } from "lucide-react";
import { ACCENT, ACCENT_LIGHT, BG, CARD, font, MUTED, TEXT } from "../constants";

const TRYON_VIDEO =
  "https://admins3.tos-cn-shanghai.volces.com/Ai-Video/1.mp4";
const TRYON_SNAPSHOT =
  "https://admins3.tos-cn-shanghai.volces.com/Ai-Video/1.mp4?x-tos-process=video/snapshot%2Ct_1";

export function TryOnPage({
  item,
  onBack,
}: {
  item: { img: string; name: string };
  onBack: () => void;
}) {
  const [stage, setStage] = useState<"analyzing" | "generating" | "result">("analyzing");
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    setStage("analyzing");
    let cancelled = false;
    const t1 = setTimeout(() => {
      if (cancelled) return;
      setStage("generating");
    }, 1800);
    const t2 = setTimeout(() => {
      if (cancelled) return;
      setStage("result");
    }, 4200);
    return () => {
      cancelled = true;
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [item]);

  return (
    <div style={{ paddingBottom: 90, overflowY: "auto", height: "100%" }}>
      {/* Top bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 10, padding: "16px 20px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", background: BG, borderBottom: "1px solid rgba(184,135,74,0.12)" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer" }}>
          <ArrowLeft size={22} color={TEXT} />
        </button>
        <span style={{ fontFamily: font, fontSize: 16, fontWeight: 700, color: TEXT }}>AI 虚拟试衣</span>
        <Sparkles size={20} color={ACCENT} />
      </div>

      <div style={{ padding: "20px 20px 0" }}>
        {/* Loading / progress */}
        {stage !== "result" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ background: CARD, borderRadius: 18, padding: "24px 20px", textAlign: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <div style={{ position: "relative", width: 80, height: 80, margin: "0 auto 20px" }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                style={{ position: "absolute", inset: 0, border: `3px solid ${ACCENT_LIGHT}`, borderTopColor: ACCENT, borderRadius: "50%" }}
              />
              <Sparkles size={28} color={ACCENT} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
            </div>
            <div style={{ fontFamily: font, fontSize: 16, fontWeight: 700, color: TEXT, marginBottom: 6 }}>
              {stage === "analyzing" ? "正在分析身材数据..." : "正在生成试衣效果..."}
            </div>
            <div style={{ fontFamily: font, fontSize: 13, color: MUTED, marginBottom: 18 }}>
              {stage === "analyzing" ? "AI 正在识别肩宽、腰线等 12 项身材特征" : "基于你的身型与单品质感合成上身预览"}
            </div>
            {/* progress bar */}
            <div style={{ height: 6, background: ACCENT_LIGHT, borderRadius: 3, overflow: "hidden" }}>
              <motion.div
                initial={{ width: "8%" }}
                animate={{ width: stage === "analyzing" ? "45%" : "90%" }}
                transition={{ duration: 1.6, ease: "easeInOut" }}
                style={{ height: "100%", background: ACCENT, borderRadius: 3 }}
              />
            </div>
          </motion.div>
        )}

        {/* Result */}
        {stage === "result" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            {/* Comparison */}
            <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
              <div style={{ flex: 1, background: CARD, borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <div style={{ height: 200, background: "#f0ebe3", overflow: "hidden" }}>
                  <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "10px 12px", textAlign: "center" }}>
                  <div style={{ fontFamily: font, fontSize: 12, color: MUTED }}>原单品</div>
                  <div style={{ fontFamily: font, fontSize: 13, fontWeight: 600, color: TEXT, marginTop: 2 }}>{item.name}</div>
                </div>
              </div>
              <div style={{ flex: 1, background: CARD, borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <div style={{ height: 200, background: "#f0ebe3", overflow: "hidden" }}>
                  <img src={TRYON_SNAPSHOT} alt="我试试效果" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "10px 12px", textAlign: "center" }}>
                  <div style={{ fontFamily: font, fontSize: 12, color: MUTED }}>上身效果</div>
                  <button
                    onClick={() => setShowVideo(true)}
                    style={{ background: "none", border: "none", color: ACCENT, fontFamily: font, fontSize: 13, fontWeight: 600, cursor: "pointer", textDecoration: "underline", marginTop: 2, display: "inline-flex", alignItems: "center", gap: 4 }}
                  >
                    上身效果（放大）
                  </button>
                </div>
              </div>
            </div>

            {/* Score card */}
            <div style={{
              background: `linear-gradient(135deg, ${ACCENT}, #9c6b34)`,
              borderRadius: 18,
              padding: "18px 18px",
              color: "#fff",
              boxShadow: "0 4px 20px rgba(184,135,74,0.3)",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontFamily: font, fontSize: 14, fontWeight: 600 }}>AI 穿搭评分</span>
                <div style={{
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: 12,
                  padding: "4px 12px",
                  fontFamily: font,
                  fontSize: 20,
                  fontWeight: 700,
                }}>
                  {Math.floor(82 + Math.random() * 15)}分
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {["版型匹配", "颜色协调", "风格统一"].map(tag => (
                  <span key={tag} style={{
                    background: "rgba(255,255,255,0.2)",
                    borderRadius: 10,
                    padding: "4px 10px",
                    fontFamily: font,
                    fontSize: 11,
                  }}>{tag}</span>
                ))}
              </div>

              {/* 分享按钮 */}
              <button
                onClick={() => {
                  const toast = document.createElement("div");
                  toast.textContent = "已复制分享链接 ✅";
                  toast.style.cssText = `position:fixed;left:50%;bottom:120px;transform:translateX(-50%);background:rgba(0,0,0,0.8);color:#fff;padding:10px 20px;border-radius:24px;font-family:${font};font-size:14px;z-index:9999;`;
                  document.body.appendChild(toast);
                  setTimeout(() => toast.remove(), 2000);
                }}
                style={{
                  marginTop: 16,
                  width: "100%",
                  background: "rgba(255,255,255,0.18)",
                  border: "1.5px dashed rgba(255,255,255,0.6)",
                  borderRadius: 14,
                  padding: "10px",
                  color: "#fff",
                  fontFamily: font,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                <Share2 size={16} /> 分享试衣效果
              </button>
            </div>

            {/* Why it works */}
            <div style={{ background: CARD, borderRadius: 16, padding: "16px 18px", marginTop: 14, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: TEXT, marginBottom: 10 }}>
                <Sparkles size={14} color={ACCENT} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />
                为什么适合你
              </div>
              {[
                `${item.name}的版型与你的身型曲线高度契合`,
                "颜色饱和度完美匹配你的肤色基调",
                "剪裁风格符合你的穿搭偏好画像",
                "与衣橱中其它单品可形成多种搭配方案",
              ].map((reason, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                  <div style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: ACCENT_LIGHT,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 1,
                  }}>
                    <span style={{ fontSize: 11, color: ACCENT, fontWeight: 700 }}>{i + 1}</span>
                  </div>
                  <span style={{ fontFamily: font, fontSize: 13, color: "#5a4a3a", lineHeight: 1.4 }}>
                    {reason}
                  </span>
                </div>
              ))}
            </div>

            {/* Recommended pairing */}
            <div style={{ background: CARD, borderRadius: 16, padding: "16px 18px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginBottom: 8, marginTop: 14 }}>
              <div style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: TEXT, marginBottom: 12 }}>
                推荐搭配
              </div>
              <div style={{ display: "flex", gap: 8, overflowX: "auto" }}>
                {[
                  { label: "高腰阔腿裤", color: "#d4c5b2" },
                  { label: "简约高跟鞋", color: "#c9b896" },
                  { label: "质感手提包", color: "#8c6d4a" },
                ].map((pair) => (
                  <div key={pair.label} style={{
                    flexShrink: 0,
                    background: pair.color,
                    borderRadius: 12,
                    padding: "10px 14px",
                    textAlign: "center",
                  }}>
                    <div style={{
                      width: 50,
                      height: 60,
                      background: "rgba(255,255,255,0.3)",
                      borderRadius: 8,
                      marginBottom: 6,
                    }} />
                    <div style={{ fontFamily: font, fontSize: 11, color: "#4a3a2a", fontWeight: 500 }}>
                      {pair.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendation reason */}
            <div style={{ background: CARD, borderRadius: 16, padding: "16px 18px", marginTop: 14, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: TEXT, marginBottom: 8 }}>推荐理由</div>
              <div style={{ fontFamily: font, fontSize: 13, color: "#5a5048", lineHeight: 1.65 }}>
                这套搭配与你的身材比例高度契合，色彩过渡自然，整体风格统一协调，适合日常通勤与轻社交场合。
              </div>
            </div>

            {/* Matching items */}
            <div style={{ marginTop: 14 }}>
              <div style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: TEXT, marginBottom: 10 }}>可搭配单品</div>
              <div style={{ display: "flex", gap: 10, overflowX: "auto" }}>
                {[1, 2, 3].map((i) => (
                  <div key={i} style={{ flexShrink: 0, width: 100, background: CARD, borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                    <div style={{ height: 100, background: "#f0ebe3", overflow: "hidden" }}>
                      <img src={item.img} alt="搭配" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ padding: "6px 8px" }}>
                      <div style={{ fontFamily: font, fontSize: 11, color: TEXT, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>推荐单品 {i}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 12, marginTop: 24, marginBottom: 8 }}>
              <button onClick={onBack} style={{ flex: 1, background: ACCENT_LIGHT, border: "none", borderRadius: 14, padding: "13px", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, cursor: "pointer" }}>
                <X size={16} color={ACCENT} /> <span style={{ fontFamily: font, fontSize: 14, color: ACCENT, fontWeight: 600 }}>返回</span>
              </button>
              <button onClick={() => setStage("analyzing")} style={{ flex: 1, background: ACCENT, border: "none", borderRadius: 14, padding: "13px", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, cursor: "pointer" }}>
                <RefreshCw size={16} color="#fff" /> <span style={{ fontFamily: font, fontSize: 14, color: "#fff", fontWeight: 600 }}>重新试衣</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Full-screen video overlay */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowVideo(false)}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <button
              onClick={(e) => { e.stopPropagation(); setShowVideo(false); }}
              style={{ position: "absolute", top: 40, right: 20, background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "50%", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              <X size={20} color="#fff" />
            </button>
            <video
              src={TRYON_VIDEO}
              autoPlay
              loop
              playsInline
              controls
              style={{ maxWidth: "100%", maxHeight: "85%", borderRadius: 12 }}
            />
            <div style={{ position: "absolute", bottom: 50, left: 0, right: 0, textAlign: "center", color: "#fff", fontFamily: font, fontSize: 14 }}>
              {item.name} · AI 上身效果
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
