import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Check, Share2 } from "lucide-react";
import { ACCENT, ACCENT_LIGHT, CARD, TEXT, MUTED, BG, font } from "../constants";

const TRYON_VIDEO_FALLBACK =
  "https://admins3.tos-cn-shanghai.volces.com/Ai-Video/1.mp4";

export function TryOnPage({
  item,
  onBack,
}: {
  item: { img: string; name: string; video?: string };
  onBack: () => void;
}) {
  const tryonVideo = item.video ?? TRYON_VIDEO_FALLBACK;

  const [stage, setStage] = useState<"analyzing" | "generating" | "result">("analyzing");
  const [progress, setProgress] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const smallVideoRef = useRef<HTMLVideoElement | null>(null);

  // 移动端（尤其 iOS Safari）在条件渲染挂载 video 时不会自动触发 autoplay，
  // 必须显式调用 play()，并确保 muted 以满足自动播放策略。
  useEffect(() => {
    if (stage !== "result") return;
    const v = smallVideoRef.current;
    if (!v) return;
    v.muted = true;
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, [stage]);

  // Simulate AI processing
  useEffect(() => {
    const t1 = setTimeout(() => setStage("generating"), 1500);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (stage !== "generating") return;
    let cancelled = false;
    const interval = setInterval(() => {
      setProgress(p => {
        if (cancelled) return p;
        if (p >= 100) {
          clearInterval(interval);
          if (!cancelled) setStage("result");
          return 100;
        }
        return p + Math.random() * 6;
      });
    }, 120);
    return () => { cancelled = true; clearInterval(interval); };
  }, [stage]);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: BG }}>
      {/* Header */}
      <div style={{ padding: "16px 20px 14px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
          <X size={22} color={TEXT} />
        </button>
        <span style={{ fontFamily: font, fontSize: 18, fontWeight: 700, color: TEXT }}>AI 虚拟试衣</span>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 20px" }}>
        {/* Two-panel comparison */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
          {/* Original item */}
          <div style={{ background: CARD, borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <div style={{ padding: "8px 10px", fontFamily: font, fontSize: 12, fontWeight: 600, color: MUTED, textAlign: "center" }}>
              原单品
            </div>
            <img src={item.img} alt={item.name} style={{ width: "100%", height: 180, objectFit: "cover" }} />
            <div style={{ padding: "8px 10px", fontFamily: font, fontSize: 11, color: MUTED, textAlign: "center" }}>
              {item.name}
            </div>
          </div>

          {/* AI result */}
          <div style={{
            background: CARD,
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          }}>
            <div style={{
              padding: "8px 10px",
              fontFamily: font,
              fontSize: 12,
              fontWeight: 600,
              color: ACCENT,
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}>
              <Sparkles size={12} /> 我的上身效果
            </div>
            <div style={{
              height: 180,
              position: "relative",
              overflow: "hidden",
            }}>
              {stage === "result" ? (
                <>
                  <video
                    ref={smallVideoRef}
                    src={tryonVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    onClick={() => setShowVideo(true)}
                    style={{ width: "100%", height: "100%", objectFit: "cover", cursor: "pointer" }}
                  />
                  <div
                    onClick={() => setShowVideo(true)}
                    style={{
                      position: "absolute",
                      inset: 0,
                      cursor: "pointer",
                      pointerEvents: "none",
                    }}
                  />
                  <div style={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    background: "rgba(46,125,50,0.9)",
                    color: "#fff",
                    fontFamily: font,
                    fontSize: 9,
                    fontWeight: 600,
                    padding: "2px 6px",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}>
                    <Check size={9} /> 完成
                  </div>
                </>
              ) : (
                <div style={{
                  width: "100%", height: "100%",
                  background: `linear-gradient(180deg, ${ACCENT_LIGHT} 0%, rgba(184,135,74,0.05) 100%)`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}>
                  {/* Animated processing dots */}
                  <div style={{ display: "flex", gap: 4 }}>
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: "easeInOut",
                        }}
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: ACCENT,
                        }}
                      />
                    ))}
                  </div>
                  <span style={{
                    fontFamily: font,
                    fontSize: 11,
                    color: ACCENT,
                    fontWeight: 500,
                  }}>
                    {stage === "analyzing" ? "分析款式中..." : "AI 生成中..."}
                  </span>
                  {stage === "generating" && (
                    <div style={{
                      width: "70%",
                      height: 3,
                      background: "rgba(184,135,74,0.15)",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}>
                      <div style={{
                        height: "100%",
                        width: `${Math.min(progress, 100)}%`,
                        background: `linear-gradient(90deg, ${ACCENT}, #d4a56a)`,
                        borderRadius: 2,
                        transition: "width 0.1s ease-out",
                      }} />
                    </div>
                  )}
                </div>
              )}
            </div>
            <div style={{ padding: "8px 10px", fontFamily: font, fontSize: 11, color: ACCENT, textAlign: "center", fontWeight: 500 }}>
              {stage === "result" ? (
                <button
                  onClick={() => setShowVideo(true)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: ACCENT,
                    fontFamily: font,
                    fontSize: 11,
                    fontWeight: 600,
                    padding: 0,
                    textDecoration: "underline",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >（放大）
                </button>
              ) : (
                "等待生成..."
              )}
            </div>
          </div>
        </div>

        {/* AI recommendations */}
        {stage === "result" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}
          >
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
                    background: "rgba(255,255,255,0.18)",
                    fontFamily: font,
                    fontSize: 11,
                    padding: "3px 9px",
                    borderRadius: 10,
                  }}>
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share button */}
            <button
              onClick={() => {
                const el = document.createElement("div");
                el.style.cssText = "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#333;color:#fff;padding:12px 28px;border-radius:24px;font-size:14px;font-weight:600;z-index:9999;font-family:system-ui;";
                el.textContent = "已复制分享链接 ✅";
                document.body.appendChild(el);
                setTimeout(() => el.remove(), 2000);
              }}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: 14,
                border: `1.5px dashed ${ACCENT}`,
                background: ACCENT_LIGHT,
                color: ACCENT,
                fontFamily: font,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <Share2 size={16} /> 分享给穿搭师点评
            </button>

            {/* Why it works */}
            <div style={{ background: CARD, borderRadius: 16, padding: "16px 18px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
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
            <div style={{ background: CARD, borderRadius: 16, padding: "16px 18px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginBottom: 8 }}>
              <div style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: TEXT, marginBottom: 12 }}>
                推荐搭配
              </div>
              <div style={{ display: "flex", gap: 8, overflowX: "auto" }}>
                {[
                  { label: "高腰阔腿裤", color: "#d4c5b2" },
                  { label: "简约高跟鞋", color: "#c9b896" },
                  { label: "质感手提包", color: "#8c6d4a" },
                ].map(pair => (
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
            {/* Actions */}
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
            transition={{ duration: 0.5 }}
            onClick={() => setShowVideo(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1000,
              background: "rgba(0,0,0,0.92)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setShowVideo(false)}
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                background: "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: "50%",
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              <X size={18} color="#fff" />
            </button>

            {/* Video player UI badge */}
            <div style={{
              position: "absolute",
              top: 24,
              left: 24,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#ff3b30",
                boxShadow: "0 0 6px #ff3b30",
              }} />
              <span style={{
                fontFamily: font,
                fontSize: 12,
                color: "rgba(255,255,255,0.7)",
                fontWeight: 500,
              }}>
                REC · 04:00
              </span>
            </div>

            {/* Center video player */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "90%",
                maxWidth: 380,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <video
                src={tryonVideo}
                autoPlay
                muted
                playsInline
                controls
                loop
                style={{
                  width: "100%",
                  borderRadius: 16,
                  boxShadow: "0 10px 50px rgba(184,135,74,0.25)",
                  outline: "none",
                }}
              />

              {/* Product name */}
              <div style={{ marginTop: 16, textAlign: "center" }}>
                <div style={{ fontFamily: font, fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 4 }}>
                  {item.name}
                </div>
                <div style={{ fontFamily: font, fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
                  虚拟试穿 · 上身效果展示
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
