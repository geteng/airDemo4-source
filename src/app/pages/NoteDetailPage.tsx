import { motion } from "framer-motion";
import {
  ArrowLeft,
  Bookmark,
  Ellipsis,
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react";
import { ACCENT, font, MUTED, TEXT } from "../constants";
import type { NoteData } from "../types";

export function NoteDetailPage({
  note,
  onBack,
}: {
  note: NoteData;
  onBack: () => void;
}) {
  return (
    <div style={{ height: "100%", background: "#fff", overflowY: "auto" }}>
      {/* Top bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 10, padding: "16px 20px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff", borderBottom: "1px solid #f0ebe3" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer" }}>
          <ArrowLeft size={22} color={TEXT} />
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <Share2 size={20} color={TEXT} />
          <Ellipsis size={20} color={TEXT} />
        </div>
      </div>

      {/* Hero image */}
      <div style={{ width: "100%", height: 320, overflow: "hidden", background: "#f0ebe3" }}>
        <img src={note.img} alt={note.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      {/* Author */}
      <div style={{ padding: "16px 20px 12px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 44, height: 44, borderRadius: "50%", overflow: "hidden", background: "#f0ebe3", flexShrink: 0 }}>
          <img src={note.img} alt={note.author} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: font, fontSize: 15, fontWeight: 600, color: TEXT }}>{note.author}</div>
          <div style={{ fontFamily: font, fontSize: 12, color: MUTED, marginTop: 1 }}>小红书博主</div>
        </div>
        <button style={{ background: ACCENT, border: "none", borderRadius: 18, padding: "8px 18px", cursor: "pointer" }}>
          <span style={{ fontFamily: font, fontSize: 13, color: "#fff", fontWeight: 600 }}>关注</span>
        </button>
      </div>

      {/* Title + body */}
      <div style={{ padding: "0 20px 16px" }}>
        <div style={{ fontFamily: font, fontSize: 18, fontWeight: 700, color: TEXT, lineHeight: 1.4, marginBottom: 10 }}>{note.title}</div>
        <div style={{ fontFamily: font, fontSize: 14, color: "#3a3530", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{note.body}</div>
      </div>

      {/* Tags */}
      <div style={{ padding: "0 20px 16px", display: "flex", flexWrap: "wrap", gap: 8 }}>
        {note.tags.map((t) => (
          <span key={t} style={{ background: "#f5ede0", color: ACCENT, fontFamily: font, fontSize: 12, padding: "4px 12px", borderRadius: 14 }}>#{t}</span>
        ))}
      </div>

      {/* Image gallery */}
      <div style={{ padding: "0 20px 100px", display: "flex", flexDirection: "column", gap: 10 }}>
        {note.images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            style={{ borderRadius: 14, overflow: "hidden", background: "#f0ebe3" }}
          >
            <img src={img} alt={`${note.title}-${i}`} style={{ width: "100%", display: "block" }} />
          </motion.div>
        ))}
      </div>

      {/* Bottom action bar */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#fff", borderTop: "1px solid #f0ebe3", padding: "12px 20px", display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Heart size={22} color="#ff2442" />
          <span style={{ fontFamily: font, fontSize: 13, color: TEXT }}>{note.likes}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <MessageCircle size={22} color={TEXT} />
          <span style={{ fontFamily: font, fontSize: 13, color: TEXT }}>128</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Bookmark size={22} color={TEXT} />
          <span style={{ fontFamily: font, fontSize: 13, color: TEXT }}>收藏</span>
        </div>
        <button
          onClick={() => window.open(note.link, "_blank")}
          style={{ marginLeft: "auto", background: ACCENT, border: "none", borderRadius: 22, padding: "10px 24px", cursor: "pointer" }}
        >
          <span style={{ fontFamily: font, fontSize: 14, color: "#fff", fontWeight: 600 }}>去购买</span>
        </button>
      </div>
    </div>
  );
}
