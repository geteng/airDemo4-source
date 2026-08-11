import { useRef, useState } from "react";
import { Check, ChevronLeft, X } from "lucide-react";
import { ACCENT, ACCENT_LIGHT, BG, CARD, font, MUTED, TEXT } from "../constants";

interface ProfileItem {
  label: string;
  value: string;
}

const initialProfile: ProfileItem[] = [
  { label: "身材", value: "158cm/60kg 微胖 M码" },
  { label: "三维", value: "" },
  { label: "风格", value: "偏通勤简约 偶尔休闲" },
  { label: "颜色偏好", value: "黑白蓝为主 没买过亮色" },
  { label: "消费力", value: "400-800元" },
  { label: "衣橱缺口", value: "有上装下装 缺连衣裙外套叠穿" },
  { label: "敏感点", value: "微胖需显瘦 不选紧身" },
];

const BODY3_INDEX = 1; // 身材三维 在 profile 中的下标

// 三维滚轮范围（厘米）
const RANGE = { min: 50, max: 130 };

// 单行滚轮：可滚动选数字，snap 到每行，读取滚动位置得到选中值
function Wheel({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const itemH = 36;
  const pad = itemH * 2; // 上下留白，使选中项居中
  const ref = useRef<HTMLDivElement>(null);

  // 初始滚动到当前值
  const initScroll = (el: HTMLDivElement) => {
    el.scrollTop = (value - RANGE.min) * itemH;
  };

  const handleScroll = () => {
    const el = ref.current;
    if (!el) return;
    const idx = Math.round(el.scrollTop / itemH);
    const v = Math.max(RANGE.min, Math.min(RANGE.max, RANGE.min + idx));
    if (v !== value) onChange(v);
  };

  const items: number[] = [];
  for (let n = RANGE.min; n <= RANGE.max; n++) items.push(n);

  return (
    <div
      ref={(el) => {
        if (el && !el.dataset.ready) {
          el.dataset.ready = "1";
          initScroll(el);
        }
        ref.current = el;
      }}
      onScroll={handleScroll}
      style={{
        height: itemH * 5,
        width: 56,
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
        // 隐藏滚动条
        scrollbarWidth: "none",
        WebkitOverflowScrolling: "touch",
        position: "relative",
        maskImage: "linear-gradient(to bottom, transparent, #000 35%, #000 65%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 35%, #000 65%, transparent)",
      }}
    >
      <div style={{ paddingTop: pad, paddingBottom: pad }}>
        {items.map((n) => (
          <div
            key={n}
            style={{
              height: itemH,
              scrollSnapAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: font,
              fontSize: 16,
              color: n === value ? ACCENT : MUTED,
              fontWeight: n === value ? 700 : 400,
            }}
          >
            {n}
          </div>
        ))}
      </div>
    </div>
  );
}

export function StyleProfilePage({ onBack }: { onBack: () => void }) {
  const [profile, setProfile] = useState<ProfileItem[]>(initialProfile);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState("");
  const [body3, setBody3] = useState({ bust: 86, waist: 70, hip: 92 });
  const [body3Draft, setBody3Draft] = useState(body3);

  const openEdit = (index: number) => {
    if (index === BODY3_INDEX) {
      setBody3Draft(body3);
    } else {
      setDraft(profile[index].value);
    }
    setEditingIndex(index);
  };
  const closeEdit = () => setEditingIndex(null);
  const confirmEdit = () => {
    if (editingIndex === null) return;
    if (editingIndex === BODY3_INDEX) {
      const v = `胸${body3Draft.bust}-腰${body3Draft.waist}-臀${body3Draft.hip}`;
      const next = body3Draft;
      setBody3(next);
      setProfile((prev) => prev.map((it, i) => (i === BODY3_INDEX ? { ...it, value: v } : it)));
    } else {
      const v = draft.slice(0, 20);
      setProfile((prev) => prev.map((it, i) => (i === editingIndex ? { ...it, value: v } : it)));
    }
    setEditingIndex(null);
  };

  return (
    <div style={{ height: "100%", background: BG, display: "flex", flexDirection: "column", fontFamily: font }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "16px 16px 12px", borderBottom: `1px solid ${ACCENT_LIGHT}` }}>
        <button
          onClick={onBack}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: 2 }}
        >
          <ChevronLeft size={22} color={TEXT} />
        </button>
        <div style={{ fontSize: 17, fontWeight: 700, color: TEXT }}>个人穿搭画像</div>
      </div>

      {/* Table */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
        <div style={{ background: CARD, borderRadius: 16, overflow: "hidden" }}>
          {profile.map((item, i) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 16px",
                borderBottom: i < profile.length - 1 ? `1px solid ${ACCENT_LIGHT}` : "none",
              }}
            >
              <div style={{ width: 72, flexShrink: 0, fontSize: 14, fontWeight: 600, color: MUTED }}>{item.label}</div>
              <div style={{ flex: 1, fontSize: 14, color: TEXT, wordBreak: "break-all" }}>
                {item.value || <span style={{ color: MUTED }}>点击完善</span>}
              </div>
              <button
                onClick={() => openEdit(i)}
                style={{
                  flexShrink: 0,
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  border: "none",
                  background: ACCENT_LIGHT,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Check size={16} color={ACCENT} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Edit dialog */}
      {editingIndex !== null && (
        <div
          onClick={closeEdit}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 300,
              background: CARD,
              borderRadius: 20,
              padding: "22px 22px 20px",
              position: "relative",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            }}
          >
            <button
              onClick={closeEdit}
              style={{
                position: "absolute", top: 12, right: 12,
                width: 28, height: 28, borderRadius: "50%",
                border: "none", background: ACCENT_LIGHT,
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <X size={15} color={MUTED} />
            </button>

            <div style={{ fontFamily: font, fontSize: 16, fontWeight: 700, color: TEXT, marginBottom: 4 }}>
              {profile[editingIndex].label}
            </div>

            {editingIndex === BODY3_INDEX ? (
              <>
                <div style={{ fontFamily: font, fontSize: 12, color: MUTED, marginBottom: 14 }}>
                  滚动选择三维（单位：cm）
                </div>
                {/* 滚轮上方标签 */}
                <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 6 }}>
                  <span style={{ width: 56, textAlign: "center", fontSize: 13, color: TEXT, fontWeight: 600, fontFamily: font }}>胸</span>
                  <span style={{ width: 56, textAlign: "center", fontSize: 13, color: TEXT, fontWeight: 600, fontFamily: font }}>腰</span>
                  <span style={{ width: 56, textAlign: "center", fontSize: 13, color: TEXT, fontWeight: 600, fontFamily: font }}>臀</span>
                </div>
                {/* 选中指示横线 */}
                <div style={{ position: "relative", display: "flex", justifyContent: "center", gap: 4 }}>
                  <div style={{
                    position: "absolute", top: "50%", left: 12, right: 12, height: 36,
                    transform: "translateY(-50%)",
                    borderTop: `1px solid ${ACCENT}`, borderBottom: `1px solid ${ACCENT}`,
                    borderRadius: 8, pointerEvents: "none",
                  }} />
                  <Wheel value={body3Draft.bust} onChange={(v) => setBody3Draft((p) => ({ ...p, bust: v }))} />
                  <Wheel value={body3Draft.waist} onChange={(v) => setBody3Draft((p) => ({ ...p, waist: v }))} />
                  <Wheel value={body3Draft.hip} onChange={(v) => setBody3Draft((p) => ({ ...p, hip: v }))} />
                </div>
                {/* 滚轮下方标签（单位） */}
                <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 8 }}>
                  <span style={{ width: 56, textAlign: "center", fontSize: 12, color: MUTED, fontFamily: font }}>cm</span>
                  <span style={{ width: 56, textAlign: "center", fontSize: 12, color: MUTED, fontFamily: font }}>cm</span>
                  <span style={{ width: 56, textAlign: "center", fontSize: 12, color: MUTED, fontFamily: font }}>cm</span>
                </div>
              </>
            ) : (
              <>
                <div style={{ fontFamily: font, fontSize: 12, color: MUTED, marginBottom: 14 }}>
                  点击完善（最多 20 字）
                </div>
                <input
                  autoFocus
                  type="text"
                  value={draft}
                  maxLength={20}
                  onChange={(e) => setDraft(e.target.value.slice(0, 20))}
                  placeholder="请输入内容"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "12px 14px",
                    borderRadius: 12,
                    border: `1px solid ${ACCENT_LIGHT}`,
                    background: BG,
                    color: TEXT,
                    fontFamily: font,
                    fontSize: 14,
                    outline: "none",
                  }}
                />
              </>
            )}

            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              <button
                onClick={closeEdit}
                style={{
                  flex: 1, padding: "11px", borderRadius: 22,
                  border: `1px solid ${ACCENT}`, background: "transparent",
                  color: ACCENT, fontFamily: font, fontSize: 14, fontWeight: 600, cursor: "pointer",
                }}
              >
                取消
              </button>
              <button
                onClick={confirmEdit}
                style={{
                  flex: 1, padding: "11px", borderRadius: 22,
                  border: "none", background: ACCENT,
                  color: "#fff", fontFamily: font, fontSize: 14, fontWeight: 600, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                }}
              >
                <Check size={14} /> 确认
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
