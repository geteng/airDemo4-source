import { useState } from "react";
import { Check, Minus, Plus, ShoppingCart, Sparkles, Trash2, X } from "lucide-react";
import { ACCENT, ACCENT_LIGHT, BG, CARD, cartData, font, MUTED, TEXT } from "../constants";
import type { CartItem } from "../types";

// 「我的」→ 购物车：查看已加入购物车的商品，支持勾选、改数量、删除
export function CartPage({ onBack }: { onBack: () => void }) {
  const [items, setItems] = useState<CartItem[]>(cartData);
  // 默认全选
  const [selected, setSelected] = useState<number[]>(cartData.map((i) => i.id));
  // 「去结算」点击后的「敬请期待」弹窗
  const [showComingSoon, setShowComingSoon] = useState(false);

  const allChecked = items.length > 0 && selected.length === items.length;
  const selectedItems = items.filter((i) => selected.includes(i.id));
  const totalQty = selectedItems.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = selectedItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  const toggleOne = (id: number) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const toggleAll = () => setSelected(allChecked ? [] : items.map((i) => i.id));

  const changeQty = (id: number, delta: number) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.min(99, Math.max(1, i.qty + delta)) } : i))
    );

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    setSelected((prev) => prev.filter((x) => x !== id));
  };

  const checkStyle = (active: boolean): React.CSSProperties => ({
    width: 22,
    height: 22,
    borderRadius: "50%",
    border: active ? `1.5px solid ${ACCENT}` : "1.5px solid rgba(212,165,106,0.55)",
    background: active ? ACCENT : "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    cursor: "pointer",
  });

  const stepBtn: React.CSSProperties = {
    width: 26,
    height: 26,
    borderRadius: 8,
    border: "1px solid rgba(212,165,106,0.35)",
    background: "transparent",
    color: ACCENT,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: 0,
    flexShrink: 0,
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: BG }}>
      {/* Header */}
      <div style={{ padding: "16px 20px 12px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
          <X size={22} color={TEXT} />
        </button>
        <span style={{ fontFamily: font, fontSize: 18, fontWeight: 700, color: TEXT }}>购物车</span>
        <span style={{ marginLeft: "auto", fontFamily: font, fontSize: 12, color: MUTED }}>
          共 {items.reduce((sum, i) => sum + i.qty, 0)} 件
        </span>
      </div>

      {items.length === 0 ? (
        /* 空购物车 */
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            paddingBottom: 60,
          }}
        >
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: "50%",
              background: ACCENT_LIGHT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ShoppingCart size={34} color={ACCENT} />
          </div>
          <div style={{ fontFamily: font, fontSize: 15, fontWeight: 600, color: TEXT }}>购物车还是空的</div>
          <div style={{ fontFamily: font, fontSize: 12.5, color: MUTED }}>去逛逛搭配，把心动的单品加进来</div>
          <button
            onClick={onBack}
            style={{
              marginTop: 6,
              padding: "10px 26px",
              borderRadius: 22,
              border: "none",
              background: `linear-gradient(90deg, ${ACCENT}, #e0b67e)`,
              color: "#2a1d0c",
              fontFamily: font,
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            去逛逛
          </button>
        </div>
      ) : (
        <>
          {/* List */}
          <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 16px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {items.map((item) => {
                const active = selected.includes(item.id);
                return (
                  <div
                    key={item.id}
                    style={{
                      background: CARD,
                      borderRadius: 16,
                      padding: 12,
                      display: "flex",
                      gap: 12,
                      boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
                    }}
                  >
                    <div
                      onClick={() => toggleOne(item.id)}
                      style={{ display: "flex", alignItems: "center" }}
                      role="checkbox"
                      aria-checked={active}
                      aria-label={`选择 ${item.name}`}
                    >
                      <span style={checkStyle(active)}>
                        {active && <Check size={13} color="#2a1d0c" strokeWidth={4} />}
                      </span>
                    </div>

                    <div style={{ width: 84, height: 108, borderRadius: 12, overflow: "hidden", flexShrink: 0, position: "relative" }}>
                      <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <span
                        style={{
                          position: "absolute",
                          top: 6,
                          left: 6,
                          background: "rgba(0,0,0,0.55)",
                          color: "#fff",
                          fontFamily: font,
                          fontSize: 10,
                          padding: "2px 7px",
                          borderRadius: 8,
                        }}
                      >
                        {item.type}
                      </span>
                    </div>

                    <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                        <div
                          style={{
                            flex: 1,
                            fontFamily: font,
                            fontSize: 14,
                            fontWeight: 600,
                            color: TEXT,
                            lineHeight: 1.4,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {item.name}
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          aria-label="删除"
                          style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", flexShrink: 0 }}
                        >
                          <Trash2 size={15} color={MUTED} />
                        </button>
                      </div>

                      <div style={{ fontFamily: font, fontSize: 11.5, color: MUTED, marginTop: 4 }}>{item.spec}</div>

                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 10 }}>
                        <div style={{ fontFamily: font, fontSize: 16, fontWeight: 700, color: ACCENT }}>
                          <span style={{ fontSize: 12 }}>¥</span>
                          {item.price}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <button
                            onClick={() => changeQty(item.id, -1)}
                            disabled={item.qty <= 1}
                            aria-label="减少数量"
                            style={{ ...stepBtn, opacity: item.qty <= 1 ? 0.4 : 1, cursor: item.qty <= 1 ? "not-allowed" : "pointer" }}
                          >
                            <Minus size={13} />
                          </button>
                          <span style={{ fontFamily: font, fontSize: 14, fontWeight: 600, color: TEXT, minWidth: 18, textAlign: "center" }}>
                            {item.qty}
                          </span>
                          <button onClick={() => changeQty(item.id, 1)} aria-label="增加数量" style={stepBtn}>
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom bar */}
          <div
            style={{
              flexShrink: 0,
              padding: "12px 20px 18px",
              background: CARD,
              borderTop: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div onClick={toggleAll} style={{ display: "flex", alignItems: "center", gap: 7, cursor: "pointer" }}>
              <span style={checkStyle(allChecked)}>
                {allChecked && <Check size={13} color="#2a1d0c" strokeWidth={4} />}
              </span>
              <span style={{ fontFamily: font, fontSize: 13, color: MUTED }}>全选</span>
            </div>

            <div style={{ flex: 1, textAlign: "right" }}>
              <div style={{ fontFamily: font, fontSize: 11.5, color: MUTED }}>
                已选 {totalQty} 件，合计
              </div>
              <div style={{ fontFamily: font, fontSize: 18, fontWeight: 700, color: ACCENT }}>
                <span style={{ fontSize: 12 }}>¥</span>
                {totalPrice}
              </div>
            </div>

            <button
              onClick={() => selectedItems.length > 0 && setShowComingSoon(true)}
              style={{
                padding: "12px 22px",
                borderRadius: 22,
                border: "none",
                background:
                  selectedItems.length > 0 ? `linear-gradient(90deg, ${ACCENT}, #e0b67e)` : "rgba(212,165,106,0.25)",
                color: selectedItems.length > 0 ? "#2a1d0c" : MUTED,
                fontFamily: font,
                fontSize: 15,
                fontWeight: 700,
                cursor: selectedItems.length > 0 ? "pointer" : "not-allowed",
                flexShrink: 0,
              }}
            >
              去结算
            </button>
          </div>
        </>
      )}

      {/* 敬请期待弹窗 */}
      {showComingSoon && (
        <div
          onClick={() => setShowComingSoon(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 150,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "28px",
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
            <div style={{ fontFamily: font, fontSize: 18, fontWeight: 800, color: TEXT }}>敬请期待</div>
            <div style={{ fontFamily: font, fontSize: 13, color: MUTED, marginTop: 8, lineHeight: 1.65 }}>
              购物车结算功能正在开发中，上线后即可下单购买
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
