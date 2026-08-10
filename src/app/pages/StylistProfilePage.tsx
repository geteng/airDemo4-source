import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { BG, font, TEXT } from "../constants";

export function StylistProfilePage({ onBack }: { onBack: () => void }) {
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
        <div style={{ width: 36 }} />
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
    </div>
  );
}
