import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { ACCENT, ACCENT_LIGHT, CARD, font, MUTED, TEXT } from "../constants";

// ── 数字形象免费调整次数（本地 mock 数据，localStorage 持久化）──
// 暂时注释掉持久化逻辑：每次进入都固定弹出第一种「效果反馈选择窗」
// 如需恢复：取消下方注释，并把 useEffect 与 confirmAdjust 中的调用恢复即可。
// const ADJUST_KEY = "stylist_avatar_adjust_count";

type Dialog = null | "choose" | "avatar" | "fit" | "done";

const AVATAR_ISSUES = [
  "看起来偏胖",
  "看起来偏瘦",
  "身高/腿比例不对",
  "腰腹比例不对",
  "脸/姿态不像我",
];

const FIT_ISSUES = [
  "显得更修长",
  "腰腹更利落",
  "腿看起来更长",
  "上半身更轻盈",
  "更有曲线",
  "更宽松舒服",
];

// const readAdjustCount = () => {
//   try {
//     return Number(localStorage.getItem(ADJUST_KEY) || "0");
//   } catch {
//     return 0;
//   }
// };

// const saveAdjustCount = () => {
//   try {
//     localStorage.setItem(ADJUST_KEY, String(readAdjustCount() + 1));
//   } catch {
//     /* localStorage 不可用时仅本次会话生效，忽略 */
//   }
// };

export function FitFeedbackDialog({ onConsult }: { onConsult: () => void }) {
  const [dialog, setDialog] = useState<Dialog>(null);
  const [picked, setPicked] = useState<string[]>([]);

  // 进入详情页停留 12 秒后弹出「效果反馈选择窗」（已暂时停用次数持久化判断）
  useEffect(() => {
    const t = setTimeout(() => {
    //   setDialog(readAdjustCount() > 0 ? "done" : "choose");
      setDialog("choose");
    //   setDialog("done");
      setPicked([]);
    }, 12000);
    return () => clearTimeout(t);
  }, []);

  const close = () => setDialog(null);

  const togglePick = (item: string) =>
    setPicked((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );

  // 左按钮：收起选择窗 → 重新弹出「数字形象」多选
  const openAvatarDialog = () => {
    setPicked([]);
    setDialog(null);
    setTimeout(() => setDialog("avatar"), 200);
  };

  // 右按钮：收起选择窗 → 重新弹出「哪一点想改善？」多选
  const openFitDialog = () => {
    setPicked([]);
    setDialog(null);
    setTimeout(() => setDialog("fit"), 200);
  };

  // 《去调整形象》：原逻辑会在本地记录一次（暂时停用持久化，仅收起弹窗）
  const confirmAdjust = () => {
    // saveAdjustCount();
    close();
  };

  // 《咨询》：关闭当前弹窗并唤起咨询老师二维码
  const consult = () => {
    close();
    onConsult();
  };

  const primaryBtn: React.CSSProperties = {
    flex: 1,
    padding: "13px",
    borderRadius: 22,
    border: "none",
    background: `linear-gradient(90deg, ${ACCENT}, #e0b67e)`,
    color: "#2a1d0c",
    fontFamily: font,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(212,165,106,0.35)",
  };

  const ghostBtn: React.CSSProperties = {
    flex: 1,
    padding: "13px",
    borderRadius: 22,
    border: `1px solid ${ACCENT}`,
    background: "transparent",
    color: ACCENT,
    fontFamily: font,
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
  };

  const optionStyle = (active: boolean): React.CSSProperties => ({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    padding: "12px 15px",
    borderRadius: 14,
    border: active ? `1.5px solid ${ACCENT}` : "1.5px solid rgba(212,165,106,0.18)",
    background: active ? "rgba(212,165,106,0.16)" : ACCENT_LIGHT,
    cursor: "pointer",
    fontFamily: font,
    fontSize: 15.5,
    color: active ? "#f0d7ae" : TEXT,
    fontWeight: active ? 700 : 500,
    textAlign: "left",
  });

  const checkStyle = (active: boolean): React.CSSProperties => ({
    width: 22,
    height: 22,
    borderRadius: "50%",
    border: active ? `1.5px solid ${ACCENT}` : "1.5px solid rgba(212,165,106,0.6)",
    background: active ? ACCENT : "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  });

  const dialogCard: React.CSSProperties = {
    width: 300,
    maxHeight: "86%",
    overflowY: "auto",
    background: CARD,
    borderRadius: 24,
    padding: "24px 22px 22px",
    textAlign: "center",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    position: "relative",
  };

  const closeXBtn: React.CSSProperties = {
    position: "absolute",
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: "50%",
    border: "1px solid rgba(244,236,224,0.18)",
    background: "#2b2317",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <AnimatePresence>
      {dialog !== null && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={close}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: dialog === "choose" ? "flex-end" : "center",
            justifyContent: "center",
            zIndex: 90,
          }}
        >
          {/* 12 秒后：效果反馈选择窗（左：感觉不太像我？ 右：衣服穿起来不好看） */}
          {dialog === "choose" && (
            <motion.div
              key="choose"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 36 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                background: CARD,
                borderRadius: "24px 24px 0 0",
                padding: "10px 20px 24px",
                boxShadow: "0 -8px 30px rgba(0,0,0,0.2)",
              }}
            >
              <div style={{ width: 36, height: 4, background: "#4a4034", borderRadius: 2, margin: "0 auto 16px" }} />
              <div style={{ fontFamily: font, fontSize: 18, fontWeight: 700, color: TEXT, marginBottom: 4 }}>
                上身效果怎么样？
              </div>
              <div style={{ fontFamily: font, fontSize: 13, color: MUTED, marginBottom: 18 }}>
                想听听你的真实感受
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button
                  onClick={openAvatarDialog}
                  style={{
                    flex: 1,
                    minHeight: 108,
                    borderRadius: 18,
                    border: "1px solid rgba(244,236,224,0.22)",
                    background: "#2b2317",
                    cursor: "pointer",
                    fontFamily: font,
                    fontSize: 16,
                    fontWeight: 700,
                    color: TEXT,
                    lineHeight: 1.5,
                    padding: "12px 10px",
                  }}
                >
                  感觉不太像我？
                </button>
                <button
                  onClick={openFitDialog}
                  style={{
                    flex: 1,
                    minHeight: 108,
                    borderRadius: 18,
                    border: "none",
                    background: `linear-gradient(135deg, ${ACCENT}, #e0b67e)`,
                    cursor: "pointer",
                    fontFamily: font,
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#2a1d0c",
                    lineHeight: 1.5,
                    padding: "12px 10px",
                    boxShadow: "0 6px 18px rgba(212,165,106,0.35)",
                  }}
                >
                  衣服穿起来不好看
                </button>
              </div>
            </motion.div>
          )}

          {/* 左按钮 → 数字形象多选 */}
          {dialog === "avatar" && (
            <motion.div
              key="avatar"
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              style={dialogCard}
            >
              <button onClick={close} style={closeXBtn} aria-label="关闭">
                <X size={16} color="#e6dccb" />
              </button>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
                {AVATAR_ISSUES.map((item) => {
                  const active = picked.includes(item);
                  return (
                    <button key={item} onClick={() => togglePick(item)} style={optionStyle(active)}>
                      <span>{item}</span>
                      <span style={checkStyle(active)}>
                        {active && <Check size={13} color="#2a1d0c" strokeWidth={4} />}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div style={{ fontFamily: font, fontSize: 12.5, color: MUTED, lineHeight: 1.6, marginBottom: 3 }}>
                可以立即调整你的数字形象，不影响衣服尺码判断
              </div>
              <div style={{ fontFamily: font, fontSize: 12.5, color: "#f0d7ae", fontWeight: 700, marginBottom: 14 }}>
                您还有1次免费调整数字形象机会
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={close} style={ghostBtn}>取消</button>
                <button onClick={confirmAdjust} style={primaryBtn}>去调整形象</button>
              </div>
            </motion.div>
          )}

          {/* 右按钮 → 哪一点想改善？多选 */}
          {dialog === "fit" && (
            <motion.div
              key="fit"
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              style={dialogCard}
            >
              <button onClick={close} style={closeXBtn} aria-label="关闭">
                <X size={16} color="#e6dccb" />
              </button>
              <div style={{ fontFamily: font, fontSize: 18, fontWeight: 700, color: TEXT, marginBottom: 14 }}>
                哪一点想改善？
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
                {FIT_ISSUES.map((item) => {
                  const active = picked.includes(item);
                  return (
                    <button key={item} onClick={() => togglePick(item)} style={optionStyle(active)}>
                      <span>{item}</span>
                      <span style={checkStyle(active)}>
                        {active && <Check size={13} color="#2a1d0c" strokeWidth={4} />}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={close} style={ghostBtn}>取消</button>
                <button onClick={consult} style={primaryBtn}>咨询</button>
              </div>
            </motion.div>
          )}

          {/* 已使用过免费调整 → 仅提示两句 */}
          {dialog === "done" && (
            <motion.div
              key="done"
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              style={{ ...dialogCard, padding: "34px 22px 30px" }}
            >
              <button onClick={close} style={closeXBtn} aria-label="关闭">
                <X size={16} color="#e6dccb" />
              </button>
              <div style={{ fontFamily: font, fontSize: 18, fontWeight: 700, color: TEXT, marginBottom: 10 }}>
                这样是不是更接近你?
              </div>
              <div style={{ fontFamily: font, fontSize: 13, color: MUTED, lineHeight: 1.6 }}>
                您已使用完了2次免费数字形象机会
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
