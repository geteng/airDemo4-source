import { ArrowLeft, ChevronRight, ShieldCheck } from "lucide-react";
import { BG, CARD, font, MUTED, TEXT } from "../constants";

interface PolicyItem {
  title: string;
  desc: string;
  effective: string;
}

const policies: PolicyItem[] = [
  {
    title: "用户服务协议",
    desc: "规范您与平台之间的权利、义务与责任，包括账号注册、订单履约、售后处理等基本规则。",
    effective: "生效日期：2026-03-01",
  },
  {
    title: "隐私政策",
    desc: "说明平台如何收集、使用、存储与保护您的个人信息，以及您依法享有的查询、更正、删除等权利。",
    effective: "生效日期：2026-03-01",
  },
  {
    title: "照片用途说明",
    desc: "明确上传照片仅用于虚拟试衣与个性化推荐，平台不会用于其他商业用途或第三方分享。",
    effective: "生效日期：2026-03-01",
  },
  {
    title: "肖像使用法律声明",
    desc: "用户上传的照片含肖像信息，平台严格遵守《民法典》肖像权相关条款，未经授权绝不作他用。",
    effective: "生效日期：2026-03-01",
  },
  {
    title: "隐私授权条款",
    desc: "细列虚拟试衣、风格推荐、衣橱识别等功能所需的最小授权范围，您可以随时在设置中关闭授权。",
    effective: "生效日期：2026-03-01",
  },
  {
    title: "未成年人保护说明",
    desc: "未满 14 周岁用户需在监护人陪同下使用本平台，平台不主动收集未成年人敏感信息。",
    effective: "生效日期：2026-03-01",
  },
];

export function PrivacyPage({ onBack }: { onBack: () => void }) {
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
        <span style={{ fontFamily: font, fontSize: 16, fontWeight: 600, color: TEXT }}>隐私条款相关</span>
      </div>

      {/* Header card */}
      <div
        style={{
          margin: "12px 20px 0",
          padding: "18px 18px 16px",
          background: CARD,
          borderRadius: 16,
          display: "flex",
          alignItems: "center",
          gap: 14,
          boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: "#2a2118",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <ShieldCheck size={22} color="#d4a56a" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: font, fontSize: 15, fontWeight: 700, color: TEXT }}>隐私与协议中心</div>
          <div style={{ fontFamily: font, fontSize: 12, color: MUTED, marginTop: 2 }}>查看所有与服务、隐私相关的协议条款</div>
        </div>
      </div>

      {/* Policy list */}
      <div style={{ margin: "16px 20px 32px", display: "flex", flexDirection: "column", gap: 10 }}>
        {policies.map((p) => (
          <div
            key={p.title}
            style={{
              background: CARD,
              borderRadius: 14,
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              boxShadow: "0 2px 10px rgba(0,0,0,0.18)",
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: TEXT }}>{p.title}</div>
              <div style={{ fontFamily: font, fontSize: 12, color: MUTED, marginTop: 4, lineHeight: 1.55 }}>
                {p.desc}
              </div>
              <div style={{ fontFamily: font, fontSize: 11, color: "#8a7a64", marginTop: 6 }}>{p.effective}</div>
            </div>
            <ChevronRight size={16} color={MUTED} />
          </div>
        ))}
      </div>
    </div>
  );
}