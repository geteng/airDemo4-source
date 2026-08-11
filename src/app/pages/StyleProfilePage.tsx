import { useState } from "react";
import { Check, ChevronLeft, X } from "lucide-react";
import { ACCENT, ACCENT_LIGHT, BG, CARD, font, MUTED, TEXT } from "../constants";

interface ProfileItem {
  label: string;
  value: string;
}

const initialProfile: ProfileItem[] = [
  { label: "身材", value: "158cm/60kg 微胖 M码" },
  { label: "风格", value: "偏通勤简约 偶尔休闲" },
  { label: "颜色偏好", value: "黑白蓝为主 没买过亮色" },
  { label: "消费力", value: "400-800元" },
  { label: "衣橱缺口", value: "有上装下装 缺连衣裙外套叠穿" },
  { label: "敏感点", value: "微胖需显瘦 不选紧身" },
];

export function StyleProfilePage({ onBack }: { onBack: () => void }) {
  const [profile, setProfile] = useState<ProfileItem[]>(initialProfile);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState("");

  const openEdit = (index: number) => {
    setDraft(profile[index].value);
    setEditingIndex(index);
  };
  const closeEdit = () => setEditingIndex(null);
  const confirmEdit = () => {
    if (editingIndex === null) return;
    const v = draft.slice(0, 20);
    setProfile((prev) => prev.map((it, i) => (i === editingIndex ? { ...it, value: v } : it)));
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
              <div style={{ flex: 1, fontSize: 14, color: TEXT, wordBreak: "break-all" }}>{item.value}</div>
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
