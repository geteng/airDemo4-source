import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import { BG, CARD, font, TEXT } from "../constants";

export function StylistProfilePage({ onBack }: { onBack: () => void }) {
  const [showToast, setShowToast] = useState(false);

  // toast 2.5s 自动消失
  useEffect(() => {
    if (!showToast) return;
    const t = setTimeout(() => setShowToast(false), 2500);
    return () => clearTimeout(t);
  }, [showToast]);

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
          justifyContent: "space-between",
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
        <span style={{ fontFamily: font, fontSize: 16, fontWeight: 600, color: TEXT }}>形象顾问档案</span>
        <button
          onClick={() => setShowToast(true)}
          style={{
            background: "#d4a56a",
            color: "#18160F",
            border: "none",
            borderRadius: 18,
            padding: "7px 14px",
            fontFamily: font,
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(212,165,106,0.35)",
          }}
        >
          预约顾问
        </button>
      </div>

      {/* Long image */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{ padding: "0 16px 32px" }}
      >
        <img
          src={import.meta.env.BASE_URL + "assets/stylist_profile.jpg"}
          alt="形象顾问档案"
          style={{ width: "100%", display: "block", borderRadius: 16 }}
        />
      </motion.div>

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
          <Check size={16} color="#d4a56a" />
          预约意愿已提交
        </div>
      )}
    </div>
  );
}