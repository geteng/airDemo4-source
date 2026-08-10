import { ACCENT, ACCENT_LIGHT, font } from "../constants";

export function Pill({
  children,
  active,
  onClick,
}: {
  children: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? ACCENT : ACCENT_LIGHT,
        color: active ? "#fff" : ACCENT,
        fontFamily: font,
        fontSize: 13,
        fontWeight: 500,
        padding: "5px 16px",
        borderRadius: 20,
        border: "none",
        cursor: "pointer",
        transition: "all 0.2s",
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  );
}
