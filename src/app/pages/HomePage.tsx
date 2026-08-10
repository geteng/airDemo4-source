import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, Check, ChevronRight, Crown } from "lucide-react";
import { ACCENT, CARD, font, MUTED, notesData, STYLIST_NAME, TEXT } from "../constants";
import type { Look, NoteData } from "../types";
import { Pill } from "../components/Pill";

export function HomePage({
  onGoProduct,
  onGoNote,
  onGoVipJoin,
  onGoStylist,
}: {
  onGoProduct: (look?: Look) => void;
  onGoNote: (note: NoteData) => void;
  onGoVipJoin: () => void;
  onGoStylist: () => void;
}) {
  const todaySlides = [
    { look: { id: 11, img: import.meta.env.BASE_URL + "assets/looks/11.png", scene: "通勤", title: "高级感白领风", items: "白衬衫 + 阔腿裤 + 高跟鞋", price: 899, liked: false }, title: "今天适合你的通勤穿搭", tags: ["显瘦通勤风", "165cm+", "轻熟风"] },
    { look: { id: 12, img: import.meta.env.BASE_URL + "assets/looks/21.png", scene: "约会", title: "都市柔美格调", items: "黑色西装 + 丝绒裙 + 小皮包", price: 1260, liked: false }, title: "约会也要温柔在线", tags: ["约会必备", "显白", "法式风"] },
    { look: { id: 13, img: import.meta.env.BASE_URL + "assets/looks/31.png", scene: "旅行", title: "轻盈度假系", items: "白色长裤 + 针织衫 + 草编帽", price: 680, liked: false }, title: "周末轻盈度假感", tags: ["透气舒适", "显高", "度假风"] },
  ];
  const totalSlides = todaySlides.length;
  const [slideIndex, setSlideIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  useEffect(() => {
    if (dragging) return;
    const t = setInterval(() => setSlideIndex((i) => (i + 1) % totalSlides), 3500);
    return () => clearInterval(t);
  }, [dragging, totalSlides]);
  return (
    <div style={{ paddingBottom: 80, overflowY: "auto", height: "100%" }}>
      {/* Top bar */}
      <div style={{ padding: "16px 20px 12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: font, fontSize: 15, fontWeight: 500, color: TEXT, letterSpacing: 2 }}>{STYLIST_NAME}</span>
      </div>

      {/* Profile strip */}
      <div style={{ padding: "0 20px 20px", display: "flex", alignItems: "center", gap: 14 }}>
        <button
          onClick={onGoStylist}
          aria-label="查看形象顾问档案"
          style={{ padding: 0, background: "none", border: "none", cursor: "pointer", lineHeight: 0, flexShrink: 0 }}
        >
          <div style={{ width: 56, height: 56, borderRadius: "50%", overflow: "hidden", border: `2px solid ${ACCENT}` }}>
            <img src={import.meta.env.BASE_URL + "assets/stylist_avatar.png"} alt={STYLIST_NAME} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </button>
        <div>
          <div style={{ fontFamily: font, fontSize: 16, fontWeight: 700, color: TEXT }}>{STYLIST_NAME}</div>
          <div style={{ fontFamily: font, fontSize: 12, color: MUTED, marginTop: 2 }}>生活美学穿搭空间</div>
        </div>
        <div style={{ marginLeft: "auto", textAlign: "center" }}>
          <div style={{ fontFamily: font, fontSize: 17, fontWeight: 700, color: ACCENT }}>20<span style={{ fontSize: 11, fontWeight: 400 }}>万</span></div>
          <div style={{ fontFamily: font, fontSize: 11, color: MUTED }}>粉丝</div>
        </div>
      </div>

      {/* Today's recommendation auto-carousel */}
      <div style={{ margin: "0 20px 16px", borderRadius: 20, overflow: "hidden", position: "relative", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
        <motion.div
          style={{ display: "flex", cursor: "grab" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragStart={() => setDragging(true)}
          onDragEnd={(_, info) => {
            const threshold = 60;
            if (info.offset.x < -threshold || info.velocity.x < -400) {
              setSlideIndex((i) => (i + 1) % totalSlides);
            } else if (info.offset.x > threshold || info.velocity.x > 400) {
              setSlideIndex((i) => (i - 1 + totalSlides) % totalSlides);
            }
            setDragging(false);
          }}
          animate={{ x: `-${slideIndex * 100}%` }}
          transition={{ type: "spring", stiffness: 90, damping: 18 }}
        >
          {todaySlides.map((s, i) => (
            <div
              key={i}
              onClick={() => onGoProduct(s.look)}
              style={{ flex: "0 0 100%", position: "relative", height: 320, cursor: "pointer" }}
            >
              <img src={s.look.img} alt={s.look.title} style={{ width: "100%", height: 320, objectFit: "cover", display: "block", pointerEvents: "none" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(28,26,23,0.82) 0%, rgba(28,26,23,0.1) 55%, transparent 100%)" }} />
              <div style={{ position: "absolute", top: 14, left: 14 }}>
                <span style={{ background: "#EDC297", color: "#322302", fontFamily: font, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 10 }}>今日推荐</span>
              </div>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 18px 42px", pointerEvents: "none" }}>
                <div style={{ fontFamily: font, fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{s.title}</div>
                <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                  {s.tags.map((t) => (
                    <span key={t} style={{ background: "rgba(255,255,255,0.2)", color: "#fff", fontFamily: font, fontSize: 11, padding: "2px 9px", borderRadius: 8, backdropFilter: "blur(4px)" }}>{t}</span>
                  ))}
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); onGoProduct(s.look); }}
                  style={{ background: "#EDC297", color: "#322302", fontFamily: font, fontSize: 13, fontWeight: 600, padding: "9px 20px", borderRadius: 22, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
                >
                  查看今日搭配 <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </motion.div>
        {/* Dots indicator — fixed at the very bottom of the carousel */}
        <div style={{ position: "absolute", bottom: 16, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 6, zIndex: 2 }}>
          {todaySlides.map((_, di) => (
            <button
              key={di}
              onClick={() => setSlideIndex(di)}
              aria-label={`切换到第 ${di + 1} 张`}
              style={{ width: slideIndex === di ? 18 : 6, height: 6, borderRadius: 3, border: "none", padding: 0, cursor: "pointer", background: slideIndex === di ? "#fff" : "rgba(255,255,255,0.5)", transition: "all 0.3s" }}
            />
          ))}
        </div>
      </div>

      {/* 小红书种草文章 */}
      <div style={{ margin: "0 20px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              background: "linear-gradient(135deg, #ff2442, #ff6b6b)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              color: "#fff",
              fontWeight: 700,
              fontFamily: font,
            }}>
              红
            </div>
            <span style={{ fontFamily: font, fontSize: 15, fontWeight: 700, color: TEXT }}>种草笔记</span>
          </div>
          <button style={{
            background: "none",
            border: "none",
            color: ACCENT,
            fontFamily: font,
            fontSize: 12,
            fontWeight: 500,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}>
            更多 <ChevronRight size={14} />
          </button>
        </div>

        <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }}>
          {notesData.map((article, i) => (
            <div
              key={i}
              onClick={() => onGoNote(article)}
              style={{
              flexShrink: 0,
              width: 140,
              background: CARD,
              borderRadius: 14,
              overflow: "hidden",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
              cursor: "pointer",
            }}>
              <div style={{ height: 140, overflow: "hidden", position: "relative" }}>
                <img src={article.img} alt={article.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                {/* image tag */}
                <div style={{
                  position: "absolute",
                  bottom: 6,
                  right: 6,
                  background: "rgba(0,0,0,0.55)",
                  color: "#fff",
                  fontFamily: font,
                  fontSize: 10,
                  padding: "2px 6px",
                  borderRadius: 4,
                }}>
                  {article.imageCount ? `${article.imageCount}图` : "9图"}
                </div>
              </div>
              <div style={{ padding: "8px 10px 10px" }}>
                <div style={{
                  fontFamily: font,
                  fontSize: 12,
                  fontWeight: 600,
                  color: TEXT,
                  lineHeight: 1.4,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  marginBottom: 6,
                  minHeight: 34,
                }}>
                  {article.title}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: font, fontSize: 10, color: "#999" }}>{article.author}</span>
                  <span style={{
                    fontFamily: font,
                    fontSize: 11,
                    color: "#ff2442",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}>
                    ♥ {article.likes}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VIP section */}
      <div style={{
        margin: "0 20px 24px",
        background: `linear-gradient(135deg, #3a2a18 0%, #6b4a28 100%)`,
        borderRadius: 18, padding: "20px 18px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <Award size={16} color={ACCENT} />
          <span style={{ fontFamily: font, fontSize: 14, fontWeight: 700, color: "#f5d9a8" }}>加入 VIP 会员</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
          {["每周专属穿搭建议", "新品优先体验", "专属搭配问答"].map((item) => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Check size={12} color={ACCENT} />
              <span style={{ fontFamily: font, fontSize: 13, color: "#d4b483" }}>{item}</span>
            </div>
          ))}
        </div>
        <button
          onClick={onGoVipJoin}
          style={{
          background: ACCENT, color: "#fff", fontFamily: font, fontSize: 13, fontWeight: 600,
          padding: "9px 20px", borderRadius: 22, border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 6,
          }}>
          成为会员 <Crown size={14} />
        </button>
      </div>
    </div>
  );
}
