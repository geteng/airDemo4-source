import { useState } from "react";
import { ArrowLeft, Check, Sparkles, Trash2 } from "lucide-react";
import { ACCENT, BG, CARD, font, MUTED, TEXT } from "../constants";

// 专属形象卡（Mock 数据，参考小程序源码样式）
interface ModelItem {
  id: number;
  img: string;
  selected: boolean;
  defective?: boolean;
  height: string;
}

const INITIAL_MODELS: ModelItem[] = [
  {
    id: 1,
    img: "https://admins3.tos-cn-shanghai.volces.com/tmp_522c5ade4151f7432fdd91ca07e92b61.jpg",
    selected: true,
    height: "160cm",
  },
  {
    id: 2,
    img: "https://admins3.tos-cn-shanghai.volces.com/tmp_b8b0264f8af7a7b01ff823cdedd27817.jpg",
    selected: false,
    defective: true,
    height: "160cm",
  },
  {
    id: 3,
    img: "https://admins3.tos-cn-shanghai.volces.com/PXmRWyidzR1ahzB.jpeg",
    selected: false,
    height: "160cm",
  },
];

export function MyModelsPage({
  onBack,
  onAdd,
}: {
  onBack: () => void;
  onAdd: () => void;
}) {
  const [models] = useState<ModelItem[]>(INITIAL_MODELS);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const comingSoon = () => setShowComingSoon(true);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: BG,
        position: "relative",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px 20px 12px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexShrink: 0,
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            display: "flex",
          }}
        >
          <ArrowLeft size={22} color={TEXT} />
        </button>
        <span
          style={{
            fontFamily: font,
            fontSize: 18,
            fontWeight: 700,
            color: TEXT,
          }}
        >
          我的专属形象
        </span>
      </div>

      {/* 列表区 */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0 14px 16px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {models.map((m) => (
            <div
              key={m.id}
              style={{
                background: CARD,
                borderRadius: 18,
                padding: 14,
                display: "flex",
                alignItems: "center",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              {/* 形象图 */}
              <div
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 14,
                  overflow: "hidden",
                  flexShrink: 0,
                  background: "#2a2118",
                }}
              >
                <img
                  src={m.img}
                  alt="我的形象"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
              {/* 右侧信息 */}
              <div
                style={{
                  flex: 1,
                  marginLeft: 14,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      fontFamily: font,
                      fontSize: 16,
                      fontWeight: 600,
                      color: TEXT,
                    }}
                  >
                    我的形象
                  </span>
                  {m.defective && (
                    <div
                      onClick={comingSoon}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "3px 10px",
                        borderRadius: 14,
                        background: "#241f16",
                        color: "#D97629",
                        fontSize: 12,
                        fontFamily: font,
                        cursor: "pointer",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          background: "#D97629",
                          color: "#241f16",
                          textAlign: "center",
                          lineHeight: "16px",
                          fontSize: 12,
                          fontWeight: 700,
                          marginRight: 6,
                        }}
                      >
                        !
                      </span>
                      该形象可优化
                    </div>
                  )}
                </div>
                <span
                  style={{
                    fontFamily: font,
                    fontSize: 12,
                    color: "#787878",
                  }}
                >
                  身高：{m.height}
                </span>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginTop: 4,
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    onClick={comingSoon}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      padding: "6px 14px",
                      borderRadius: 18,
                      border: m.selected ? "none" : "1px solid #E3E3E3",
                      background: m.selected
                        ? "linear-gradient(301deg, #b8874a, #b8874a)"
                        : "#1e1b17",
                      color: m.selected ? "#fff" : TEXT,
                      fontFamily: font,
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        background: m.selected ? "#fff" : "transparent",
                        border: m.selected ? "none" : "1.5px solid #E3E3E3",
                      }}
                    >
                      {m.selected && (
                        <Check size={11} color="#b8874a" strokeWidth={3} />
                      )}
                    </span>
                    默认试衣形象
                  </button>
                  <button
                    onClick={comingSoon}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "6px 14px",
                      borderRadius: 18,
                      border: "1px solid #E3E3E3",
                      background: "transparent",
                      color: "#bababa",
                      fontFamily: font,
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    <Trash2 size={12} style={{ marginRight: 4 }} />
                    删除
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI 提示 */}
      <div
        style={{
          padding: "12px 20px",
          textAlign: "center",
          background: "#2a2118",
          color: MUTED,
          fontSize: 12,
          fontFamily: font,
          flexShrink: 0,
        }}
      >
        本服务为AI生成内容，结果仅供参考
      </div>

      {/* 底部 CTA：跳到当前的《我的专属形象》(IdentityPage) */}
      <div
        style={{
          padding: "14px 20px 22px",
          background: CARD,
          flexShrink: 0,
        }}
      >
        <button
          onClick={onAdd}
          style={{
            width: "100%",
            height: 48,
            borderRadius: 24,
            border: "none",
            background: "linear-gradient(301deg, #b8874a, #b8874a)",
            color: "#fff",
            fontFamily: font,
            fontSize: 16,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          添加专属形象
        </button>
      </div>

      {/* 通用「敬请期待」弹窗（用于「默认试衣形象」「删除」「该形象可优化」点击） */}
      {showComingSoon && (
        <div
          onClick={() => setShowComingSoon(false)}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 28,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 300,
              background: CARD,
              border: "1px solid rgba(212,165,106,0.3)",
              borderRadius: 20,
              padding: "26px 22px 20px",
              textAlign: "center",
              boxShadow: "0 18px 50px rgba(0,0,0,0.55)",
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "rgba(212,165,106,0.14)",
                margin: "0 auto 14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Sparkles size={30} color={ACCENT} />
            </div>
            <div
              style={{
                fontFamily: font,
                fontSize: 18,
                fontWeight: 800,
                color: TEXT,
              }}
            >
              敬请期待
            </div>
            <div
              style={{
                fontFamily: font,
                fontSize: 13,
                color: MUTED,
                marginTop: 8,
                lineHeight: 1.65,
              }}
            >
              该功能正在开发中，敬请期待
            </div>
            <button
              onClick={() => setShowComingSoon(false)}
              style={{
                width: "100%",
                marginTop: 18,
                padding: "12px 0",
                borderRadius: 22,
                border: "none",
                background: `linear-gradient(90deg, ${ACCENT}, #d4a56a)`,
                color: "#18160F",
                fontFamily: font,
                fontSize: 15,
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
