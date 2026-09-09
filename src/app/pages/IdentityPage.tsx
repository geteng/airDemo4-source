import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Lock,
  Plus,
  ShieldCheck,
  X,
  XCircle,
} from "lucide-react";
import { ACCENT, BG, CARD, font, MUTED, TEXT } from "../constants";

type SlotKey = "full" | "face";

// ─── 协议条款 Mock 数据（点击协议链接时展示） ──────────────────────────────────
interface PolicyDoc {
  title: string;
  effective: string;
  paragraphs: string[];
}

const POLICY_DOCS: PolicyDoc[] = [
  {
    title: "照片用途说明",
    effective: "生效日期：2026-03-01 · 版本 V1.2",
    paragraphs: [
      "您通过本页面上传的全身照、正脸美颜照，仅用于「虚拟试衣」「个性化穿搭推荐」「AI 生成穿搭上身效果」等功能实现。",
      "平台不会将您的照片用于广告、宣传、转售或任何与本服务无关的商业用途，也不会向第三方提供、出售或共享您的照片。",
      "照片在上传及存储过程中均采用加密传输，图片存放于受控服务器，访问权限仅限为您服务的专属穿搭师与 AI 系统。",
      "您可随时在「我的-设置」中申请删除照片及由此生成的数字形象数据，删除后平台将在合理时间内彻底清除相关记录。",
    ],
  },
  {
    title: "肖像使用法律声明",
    effective: "生效日期：2026-03-01 · 依据《民法典》第 1018 条",
    paragraphs: [
      "您上传的照片包含个人肖像，平台严格遵守《中华人民共和国民法典》关于肖像权的相关规定。",
      "未经您本人明示授权，平台不会以任何形式使用、复制、编辑您的肖像用于本服务之外的用途。",
      "AI 生成的试穿效果图仅向您本人展示，其他用户无法查看或下载您的专属形象、照片及衍生数据。",
      "如因案例展示、宣传素材等场景确需使用您的肖像，平台将另行单独征求您的书面同意后才会使用。",
      "如您发现肖像被不当使用，可随时联系在线客服，平台将在 48 小时内核实并处理。",
    ],
  },
  {
    title: "隐私授权条款",
    effective: "生效日期：2026-03-01 · 版本 V2.0",
    paragraphs: [
      "为完成虚拟试衣与风格推荐，您授权平台收集以下信息：个人照片（全身照、正脸照）与身材数据（身高、三围，可选填写）。",
      "上述信息仅在您主动提交「上传照片创建身份」后使用，授权范围以本页面功能为限，遵循最小化收集原则。",
      "您可在「我的-设置-隐私管理」中随时查看授权记录、关闭或撤回授权；撤回授权不影响此前基于授权已完成的处理。",
      "平台不会将您的个人信息与第三方共享，但法律法规另有规定或经您单独同意的除外。",
      "未满 14 周岁的未成年人使用本服务，需在监护人同意并陪同操作下进行。",
    ],
  },
];

export function IdentityPage({ onBack }: { onBack: () => void }) {
  const [showToast, setShowToast] = useState(false);
  const [uploaded, setUploaded] = useState<Record<SlotKey, boolean>>({ full: false, face: false });
  const [agreed, setAgreed] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<PolicyDoc | null>(null);
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
            <PolicyLink doc={POLICY_DOCS[0]} onOpen={setViewingDoc}>《照片用途说明》</PolicyLink>
            <PolicyLink doc={POLICY_DOCS[1]} onOpen={setViewingDoc}>《肖像使用法律声明》</PolicyLink>
            <PolicyLink doc={POLICY_DOCS[2]} onOpen={setViewingDoc}>《隐私授权条款》</PolicyLink>
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

      {/* 条款查看弹层 */}
      {viewingDoc && (
        <div
          onClick={() => setViewingDoc(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 150,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 360,
              maxHeight: "72vh",
              overflowY: "auto",
              background: CARD,
              border: "1px solid rgba(212,165,106,0.25)",
              borderRadius: 18,
              padding: "20px 20px 18px",
              boxShadow: "0 18px 50px rgba(0,0,0,0.55)",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: font, fontSize: 17, fontWeight: 700, color: ACCENT }}>
                  {viewingDoc.title}
                </div>
                <div style={{ fontFamily: font, fontSize: 11, color: MUTED, marginTop: 4 }}>
                  {viewingDoc.effective}
                </div>
              </div>
              <button
                onClick={() => setViewingDoc(null)}
                aria-label="关闭"
                style={{
                  flexShrink: 0,
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  border: "none",
                  background: "rgba(168,156,140,0.15)",
                  color: MUTED,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <X size={15} />
              </button>
            </div>
            <div style={{ height: 1, background: "rgba(168,156,140,0.18)", margin: "14px 0 12px" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {viewingDoc.paragraphs.map((p, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: font,
                    fontSize: 13,
                    color: TEXT,
                    lineHeight: 1.75,
                    margin: 0,
                    textAlign: "justify",
                  }}
                >
                  {p}
                </p>
              ))}
            </div>
            <button
              onClick={() => setViewingDoc(null)}
              style={{
                width: "100%",
                marginTop: 18,
                padding: "11px 0",
                borderRadius: 22,
                border: "none",
                background: `linear-gradient(90deg, ${ACCENT}, #c79758)`,
                color: "#18160F",
                fontFamily: font,
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              我知道了
            </button>
          </div>
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
function PolicyLink({
  doc,
  onOpen,
  children,
}: {
  doc: PolicyDoc;
  onOpen: (d: PolicyDoc) => void;
  children: React.ReactNode;
}) {
  return (
    <span
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation(); // 避免触发外层勾选
        onOpen(doc);
      }}
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