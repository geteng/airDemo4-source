import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Lock,
  Plus,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { ACCENT, BG, CARD, font, MUTED, TEXT } from "../constants";

type SlotKey = "full" | "face";

export function IdentityPage({ onBack }: { onBack: () => void }) {
  const [showToast, setShowToast] = useState(false);
  const [uploaded, setUploaded] = useState<Record<SlotKey, boolean>>({ full: false, face: false });
  const [agreed, setAgreed] = useState(false);
  const [body, setBody] = useState<Record<"height" | "bust" | "waist" | "hip", string>>({
    height: "160",
    bust: "",
    waist: "",
    hip: "",
  });

  // toast 自动消失
  useEffect(() => {
    if (!showToast) return;
    const t = setTimeout(() => setShowToast(false), 2200);
    return () => clearTimeout(t);
  }, [showToast]);

  const handleUploadClick = (slot: SlotKey) => {
    // mock：直接标记为已上传并提示
    setUploaded((prev) => ({ ...prev, [slot]: true }));
    setShowToast(true);
  };

  const handleSubmit = () => {
    if (!agreed) return;
    setShowToast(true);
  };

  return (
    <div style={{ height: "100%", background: BG, position: "relative", overflowY: "auto" }}>
      {/* Top bar */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          padding: "16px 20px 12px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          background: "rgba(19,18,16,0.72)",
          backdropFilter: "blur(8px)",
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "rgba(243,236,226,0.12)",
            border: "none",
            borderRadius: "50%",
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <ArrowLeft size={18} color={TEXT} />
        </button>
        <span style={{ fontFamily: font, fontSize: 16, fontWeight: 600, color: TEXT }}>我的专属形象</span>
      </div>

      <div style={{ padding: "12px 20px 140px" }}>
        {/* Upload slots */}
        <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
          {/* 全身照（必填） */}
          <div
            onClick={() => handleUploadClick("full")}
            style={{
              flex: 1,
              aspectRatio: "3 / 4",
              background: CARD,
              border: `1px dashed ${uploaded.full ? ACCENT : "rgba(168,156,140,0.45)"}`,
              borderRadius: 14,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              gap: 8,
              padding: 12,
              position: "relative",
              transition: "border-color 0.2s",
            }}
          >
            {uploaded.full && (
              <span
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  background: ACCENT,
                  color: "#18160F",
                  fontFamily: font,
                  fontSize: 10,
                  fontWeight: 600,
                  padding: "2px 6px",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <Check size={10} /> 已上传
              </span>
            )}
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(212,165,106,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: MUTED,
              }}
            >
              <Plus size={22} />
            </div>
            <div style={{ fontFamily: font, fontSize: 13, fontWeight: 600, color: TEXT }}>上传单人全身照</div>
            <div style={{ fontFamily: font, fontSize: 11, color: MUTED, textAlign: "center" }}>
              人物从头到脚占 2/3 以上
            </div>
          </div>

          {/* 正脸照（可选） */}
          <div
            onClick={() => handleUploadClick("face")}
            style={{
              flex: 1,
              aspectRatio: "3 / 4",
              background: CARD,
              border: `1px dashed ${uploaded.face ? ACCENT : "rgba(168,156,140,0.45)"}`,
              borderRadius: 14,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              gap: 8,
              padding: 12,
              position: "relative",
              transition: "border-color 0.2s",
            }}
          >
            {uploaded.face ? (
              <span
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  background: ACCENT,
                  color: "#18160F",
                  fontFamily: font,
                  fontSize: 10,
                  fontWeight: 600,
                  padding: "2px 6px",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <Check size={10} /> 已上传
              </span>
            ) : (
              <span
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  background: "rgba(168,156,140,0.15)",
                  color: MUTED,
                  fontFamily: font,
                  fontSize: 10,
                  fontWeight: 600,
                  padding: "2px 6px",
                  borderRadius: 8,
                }}
              >
                可选
              </span>
            )}
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(212,165,106,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: MUTED,
              }}
            >
              <Plus size={22} />
            </div>
            <div style={{ fontFamily: font, fontSize: 13, fontWeight: 600, color: TEXT }}>上传正脸美颜照</div>
            <div style={{ fontFamily: font, fontSize: 11, color: MUTED, textAlign: "center" }}>
              头顶到下巴占 1/2 以上
            </div>
          </div>
        </div>

        {/* 拍照指南 */}
        <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
          <GuideGroup
            title="拍照指南"
            items={[
              { src: `${import.meta.env.BASE_URL}assets/identity_guide_full_ok.png`, ok: true, label: "单人身" },
              { src: `${import.meta.env.BASE_URL}assets/identity_guide_full_no.png`, ok: false, label: "多人" },
            ]}
          />
          <GuideGroup
            title="拍照指南"
            items={[
              { src: `${import.meta.env.BASE_URL}assets/identity_guide_face_ok.png`, ok: true, label: "正脸无遮挡" },
              { src: `${import.meta.env.BASE_URL}assets/identity_guide_face_no.png`, ok: false, label: "墨镜帽子" },
            ]}
          />
        </div>

        {/* 隐私说明 */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 8,
            padding: "12px 14px",
            background: "rgba(212,165,106,0.08)",
            border: "1px solid rgba(212,165,106,0.18)",
            borderRadius: 12,
            marginBottom: 18,
          }}
        >
          <Lock size={14} color={ACCENT} style={{ flexShrink: 0, marginTop: 2 }} />
          <div style={{ fontFamily: font, fontSize: 12, color: "#d8c4a3", lineHeight: 1.6 }}>
            您的照片仅用于虚拟试衣，平台严格保密，不会用于其他用途
          </div>
        </div>

        {/* 定制精准身材 */}
        <div
          style={{
            background: CARD,
            borderRadius: 16,
            padding: "16px 16px 18px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 14,
            }}
          >
            <div style={{ fontFamily: font, fontSize: 15, fontWeight: 700, color: TEXT }}>
              定制精准身材<span style={{ fontFamily: font, fontSize: 12, fontWeight: 400, color: MUTED, marginLeft: 6 }}>(可选)</span>
            </div>
            <span style={{ fontFamily: font, fontSize: 16, color: MUTED, cursor: "pointer" }}>⌃</span>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {(["height", "bust", "waist", "hip"] as const).map((k) => (
              <BodyInput
                key={k}
                label={k === "height" ? "身高" : k === "bust" ? "胸围" : k === "waist" ? "腰围" : "臀围"}
                unit="厘米"
                value={body[k]}
                placeholder="--"
                onChange={(v) => setBody((prev) => ({ ...prev, [k]: v }))}
              />
            ))}
          </div>
          <div style={{ fontFamily: font, fontSize: 12, color: MUTED, marginTop: 12, lineHeight: 1.6 }}>
            建议尽可能填写准确，系统将根据信息生成更贴合的个性化身份
          </div>
        </div>

        {/* 协议勾选 */}
        <label
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            marginBottom: 14,
            cursor: "pointer",
          }}
        >
          <span
            onClick={(e) => {
              e.preventDefault();
              setAgreed((v) => !v);
            }}
            style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              border: `1.5px solid ${agreed ? ACCENT : "rgba(168,156,140,0.6)"}`,
              background: agreed ? ACCENT : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              marginTop: 1,
            }}
          >
            {agreed && <Check size={12} color="#18160F" />}
          </span>
          <span style={{ fontFamily: font, fontSize: 12, color: MUTED, lineHeight: 1.7 }}>
            我已阅读并同意
            <PolicyLink>《照片用途说明》</PolicyLink>
            <PolicyLink>《肖像使用法律声明》</PolicyLink>
            <PolicyLink>《隐私授权条款》</PolicyLink>
          </span>
        </label>

        <div style={{ fontFamily: font, fontSize: 11, color: "#8a7a64", textAlign: "center", marginBottom: 14 }}>
          点击视同阅读并同意服务条款与隐私协议
        </div>
      </div>

      {/* Bottom submit bar */}
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          padding: "12px 20px 18px",
          background: "rgba(19,18,16,0.85)",
          backdropFilter: "blur(8px)",
          zIndex: 50,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          onClick={handleSubmit}
          disabled={!agreed}
          style={{
            width: "100%",
            maxWidth: 390,
            padding: "14px",
            borderRadius: 26,
            border: "none",
            background: agreed
              ? `linear-gradient(90deg, ${ACCENT}, #c79758)`
              : "rgba(168,156,140,0.25)",
            color: agreed ? "#fff" : MUTED,
            fontFamily: font,
            fontSize: 15,
            fontWeight: 700,
            cursor: agreed ? "pointer" : "not-allowed",
            transition: "all 0.2s",
          }}
        >
          上传照片创建身份
        </button>
      </div>

      {/* Toast */}
      {showToast && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: "fixed",
            top: 80,
            left: "50%",
            transform: "translateX(-50%)",
            background: CARD,
            color: TEXT,
            fontFamily: font,
            fontSize: 14,
            fontWeight: 500,
            padding: "10px 18px",
            borderRadius: 22,
            display: "flex",
            alignItems: "center",
            gap: 8,
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            border: "1px solid rgba(212,165,106,0.35)",
            zIndex: 200,
          }}
        >
          <CheckCircle2 size={16} color={ACCENT} />
          上传成功
        </div>
      )}
    </div>
  );
}

// ── 子组件：拍照指南 ─────────────────────────────────────────────────────────────
function GuideGroup({
  title,
  items,
}: {
  title: string;
  items: { src: string; ok: boolean; label: string }[];
}) {
  return (
    <div style={{ flex: 1 }}>
      <div style={{ fontFamily: font, fontSize: 13, fontWeight: 600, color: TEXT, marginBottom: 8 }}>{title}</div>
      <div style={{ display: "flex", gap: 8 }}>
        {items.map((it) => (
          <div
            key={it.label}
            style={{
              flex: 1,
              background: CARD,
              borderRadius: 10,
              padding: 4,
              position: "relative",
            }}
          >
            <img
              src={it.src}
              alt={it.label}
              style={{ width: "100%", height: 72, objectFit: "cover", borderRadius: 8, display: "block", background: "#2a2118" }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.opacity = "0.4";
              }}
            />
            <span
              style={{
                position: "absolute",
                bottom: 6,
                right: 6,
                width: 18,
                height: 18,
                borderRadius: 9,
                background: it.ok ? ACCENT : "#c0392b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {it.ok ? <Check size={11} color="#18160F" /> : <XCircle size={11} color="#fff" />}
            </span>
            <div
              style={{
                fontFamily: font,
                fontSize: 11,
                color: MUTED,
                textAlign: "center",
                marginTop: 4,
                paddingBottom: 2,
              }}
            >
              {it.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 子组件：身材输入框 ─────────────────────────────────────────────────────────────
function BodyInput({
  label,
  unit,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  unit: string;
  value: string;
  placeholder: string;
  onChange: (v: string) => void;
}) {
  return (
    <div
      style={{
        flex: 1,
        background: "rgba(168,156,140,0.08)",
        border: "1px solid rgba(168,156,140,0.2)",
        borderRadius: 12,
        padding: "10px 8px 8px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: font,
          fontSize: 22,
          fontWeight: 700,
          color: TEXT,
          display: "flex",
          alignItems: "baseline",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <input
          inputMode="numeric"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value.replace(/[^0-9]/g, ""))}
          style={{
            width: 0,
            flex: 1,
            minWidth: 0,
            border: "none",
            outline: "none",
            background: "transparent",
            color: TEXT,
            fontFamily: font,
            fontSize: 22,
            fontWeight: 700,
            textAlign: "center",
          }}
        />
        <span style={{ fontFamily: font, fontSize: 11, fontWeight: 400, color: MUTED }}>{unit}</span>
      </div>
      <div style={{ fontFamily: font, fontSize: 11, color: MUTED, marginTop: 4 }}>{label}</div>
    </div>
  );
}

// ── 子组件：协议链接 ─────────────────────────────────────────────────────────────
function PolicyLink({ children }: { children: React.ReactNode }) {
  return (
    <span
      onClick={(e) => e.stopPropagation()}
      style={{
        color: ACCENT,
        textDecoration: "underline",
        textUnderlineOffset: 2,
        margin: "0 2px",
        cursor: "pointer",
        fontFamily: font,
        fontSize: 12,
      }}
    >
      {children}
    </span>
  );
}