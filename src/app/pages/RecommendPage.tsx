import { useState, useEffect, useRef } from "react";
import { Droplets, Heart, Sparkles, Check, Layers, MessageCircle, Package, Ruler, Shirt, Star, Sun, ThumbsUp, ShoppingBag } from "lucide-react";
import { ACCENT, ACCENT_LIGHT, CARD, font, looks, MUTED, productDetails, STYLIST_NAME, TEXT } from "../constants";
import type { Look } from "../types";
import { Pill } from "../components/Pill";

export function RecommendPage({
  onGoTryOn,
  likedIds,
  onToggleLike,
}: {
  onGoTryOn: (look: Look) => void;
  likedIds: Set<number>;
  onToggleLike: (id: number) => void;
}) {
  const [activeScene, setActiveScene] = useState("约会");

  // 自动轮播在用户操作后暂停，15 秒无操作再恢复
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout>>();
  // 「立即购买」点击后的视觉反馈状态
  const [purchasedId, setPurchasedId] = useState<number | null>(null);

  const scenes = ["约会", "通勤", "旅行"];
  const sceneLooks = looks.filter((l) => l.scene === activeScene);

  // 用户产生交互：暂停轮播，并设定 15 秒后若仍无操作则恢复
  const pauseThenResume = () => {
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), 15000);
  };

  // 场景标签自动轮播：默认每 2 秒切换到下一个；用户交互后暂停，15 秒无操作继续。
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setActiveScene((cur) => {
        const idx = scenes.indexOf(cur);
        return scenes[(idx + 1) % scenes.length];
      });
    }, 2000);
    return () => clearInterval(t);
  }, [paused, activeScene]);

  useEffect(() => () => { if (resumeTimer.current) clearTimeout(resumeTimer.current); }, []);

  const toggleLike = (id: number) => {
    pauseThenResume();
    onToggleLike(id);
  };

  return (
    <div style={{ paddingBottom: 80, overflowY: "auto", height: "100%" }}>
      <div style={{ padding: "16px 20px 14px" }}>
        <span style={{ fontFamily: font, fontSize: 20, fontWeight: 700, color: TEXT }}>老师为您定制穿搭</span>
        <div style={{ fontFamily: font, fontSize: 12, color: MUTED, marginTop: 2 }}>为您精选的穿搭方案</div>
      </div>

      {/* Scene tabs */}
      <div style={{ padding: "0 20px 20px", display: "flex", gap: 8 }}>
        {scenes.map((s) => (
          <Pill key={s} active={activeScene === s} onClick={() => { pauseThenResume(); setActiveScene(s); }}>
            {s}
          </Pill>
        ))}
      </div>

      {/* Look cards */}
      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 16 }}>
        {sceneLooks.map((look) => {
          const liked = likedIds.has(look.id);
          const detail = productDetails[look.id] ?? productDetails[1];
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
                  onClick={(e) => { e.stopPropagation(); pauseThenResume(); onGoTryOn(look); }}
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

              {/* 价格 + 收藏（原详情按钮位置） */}
              <div style={{ padding: "14px 16px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontFamily: font, fontSize: 11, color: MUTED }}>套装参考价</div>
                  <div style={{ fontFamily: font, fontSize: 20, fontWeight: 700, color: ACCENT }}>¥{look.price}</div>
                </div>
                <button
                  onClick={() => toggleLike(look.id)}
                  style={{ padding: "9px 18px", borderRadius: 20, border: "none", background: liked ? "#e53935" : ACCENT, fontFamily: font, fontSize: 13, color: "#fff", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}
                >
                  <Heart size={13} color="#fff" fill={liked ? "#fff" : "none"} /> {liked ? "已收藏" : "收藏"}
                </button>
              </div>

              {/* ── 详情页内容内联 ── */}
              <div style={{ padding: "0 16px 16px" }}>
                {/* 形象顾问推荐 */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", overflow: "hidden", border: `1.5px solid ${ACCENT}` }}>
                    <img src={import.meta.env.BASE_URL + "assets/stylist_avatar.png"} alt={STYLIST_NAME} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <span style={{ fontFamily: font, fontSize: 13, fontWeight: 600, color: ACCENT }}>{STYLIST_NAME}推荐</span>
                  <Star size={12} color={ACCENT} fill={ACCENT} />
                </div>

                {/* 为什么适合你 */}
                <div style={{ background: ACCENT_LIGHT, borderRadius: 16, padding: "16px 18px", marginBottom: 16 }}>
                  <div style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: TEXT, marginBottom: 10 }}>为什么适合你</div>
                  {(detail.reasons?.length ? detail.reasons : ["修饰肩型，显宽肩高挑", "腰部收紧，强调腰线比例", "通勤场合百搭不出错"]).map((reason) => (
                    <div key={reason} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
                      <Check size={14} color={ACCENT} style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontFamily: font, fontSize: 13, color: "#7a5c35" }}>{reason}</span>
                    </div>
                  ))}
                </div>

                {/* 适合身型 */}
                <div style={{ background: CARD, borderRadius: 16, padding: "14px 18px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginBottom: 16 }}>
                  <div style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: TEXT, marginBottom: 10 }}>适合身型</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {["155–170cm", "A字型", "梨形身材", "轻熟风格"].map((t) => (
                      <span key={t} style={{ background: "#f5f3f0", fontFamily: font, fontSize: 12, color: MUTED, padding: "4px 12px", borderRadius: 10 }}>{t}</span>
                    ))}
                  </div>
                </div>

                {/* 平铺细节图 */}
                <div style={{ marginBottom: 16 }}>
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
                <div style={{ background: CARD, borderRadius: 16, padding: "14px 16px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginBottom: 16 }}>
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

                {/* 商品信息：面料成分 / 季节适用性 / 洗涤方式 / 保养说明 / 库存情况 */}
                <div style={{ background: CARD, borderRadius: 16, padding: "14px 16px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginBottom: 16 }}>
                  <div style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: TEXT, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                    <Shirt size={16} color={ACCENT} /> 商品信息
                  </div>
                  {[
                    { label: "面料成分", icon: Layers, value: detail.fabric },
                    { label: "季节适用性", icon: Sun, value: detail.season },
                    { label: "洗涤方式", icon: Droplets, value: detail.wash },
                    { label: "保养说明", icon: Sparkles, value: detail.care },
                  ].map((row, i, arr) => (
                    <div
                      key={row.label}
                      style={{
                        display: "flex",
                        gap: 10,
                        padding: "10px 0",
                        borderBottom: i < arr.length - 1 ? "1px solid #f0ece6" : "none",
                      }}
                    >
                      <row.icon size={14} color={ACCENT} style={{ flexShrink: 0, marginTop: 3 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: font, fontSize: 12, color: MUTED, marginBottom: 3 }}>{row.label}</div>
                        <div style={{ fontFamily: font, fontSize: 13, color: TEXT, lineHeight: 1.6 }}>{row.value}</div>
                      </div>
                    </div>
                  ))}

                  {/* 库存情况 */}
                  <div style={{ marginTop: 12, background: ACCENT_LIGHT, borderRadius: 12, padding: "12px 14px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ fontFamily: font, fontSize: 12, color: "#7a5c35", display: "flex", alignItems: "center", gap: 5 }}>
                        <Package size={13} color={ACCENT} /> 库存情况
                      </span>
                      <span style={{ fontFamily: font, fontSize: 12, color: ACCENT, fontWeight: 600 }}>
                        仅剩 {detail.stock?.remaining ?? 0} 件
                      </span>
                    </div>
                    <div style={{ height: 6, borderRadius: 3, background: "rgba(122,92,53,0.15)", overflow: "hidden" }}>
                      <div
                        style={{
                          width: `${Math.round(((detail.stock?.sold ?? 0) / ((detail.stock?.sold ?? 0) + (detail.stock?.remaining ?? 0) || 1)) * 100)}%`,
                          height: "100%",
                          background: ACCENT,
                          borderRadius: 3,
                        }}
                      />
                    </div>
                    <div style={{ fontFamily: font, fontSize: 11, color: "#7a5c35", marginTop: 8, lineHeight: 1.5 }}>
                      已售 {detail.stock?.sold ?? 0} 件 · {(detail.stock?.remaining ?? 0) <= 15 ? "库存紧张，喜欢建议尽快下单" : "库存充足，可正常发货"}
                    </div>
                  </div>
                </div>

                {/* 买家真实评价 */}
                <div style={{ marginBottom: 16 }}>
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

                {/* 立即购买 */}
                <button
                  onClick={() => { pauseThenResume(); setPurchasedId(look.id); }}
                  style={{
                    width: "100%", padding: "13px", borderRadius: 26, border: "none",
                    background: purchasedId === look.id ? "#4caf50" : ACCENT, color: "#fff", fontFamily: font, fontSize: 15, fontWeight: 700,
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    transition: "background 0.25s ease",
                  }}
                >
                  {purchasedId === look.id ? (<><Check size={16} /> 已加入购物车</>) : (<><ShoppingBag size={16} /> 立即购买</>)}
                </button>
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
