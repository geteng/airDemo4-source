import { useState } from "react";
import { Lock, MessageCircle, User } from "lucide-react";
import { BG, font } from "../constants";
import type { MockUser } from "../types";

// ─── 模拟微信小程序登录的体验账号 ────────────────────────────────────────────
// user1 / 密码 1；user2 / 密码 2；user3 / 密码 3
export const MOCK_USERS: MockUser[] = [
  { account: "user1", password: "1", nickname: "小美" },
  { account: "user2", password: "2", nickname: "小雅" },
  { account: "user3", password: "3", nickname: "小雨" },
];

const WECHAT_GREEN = "#07c160";

const WX_ICON = (() => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden>
    <path d="M8.7 4C4.9 4 1.8 6.5 1.8 9.6c0 1.8 1 3.4 2.6 4.5l-.7 2.1 2.4-1.2c.8.2 1.6.3 2.6.3h.4a4.9 4.9 0 0 1-.2-1.4c0-3 2.9-5.4 6.4-5.4h.4C15.1 5.9 12.1 4 8.7 4zM6.4 7.2a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8zm4.6 0a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8z" />
    <path d="M22.2 14.4c0-2.6-2.6-4.7-5.8-4.7s-5.8 2.1-5.8 4.7 2.6 4.7 5.8 4.7c.7 0 1.4-.1 2-.3l1.9 1-.5-1.7c1.5-.9 2.4-2.2 2.4-3.7zm-7.7-1.2a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6zm3.8 0a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6z" />
  </svg>
))();

export function LoginPage({ onLogin }: { onLogin: (user: MockUser) => void }) {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fillUser = (u: MockUser) => {
    setAccount(u.account);
    setPassword(u.password);
    setError("");
  };

  const doLogin = (u?: MockUser) => {
    const target =
      u ??
      MOCK_USERS.find(
        (m) => m.account === account.trim().toLowerCase() && m.password === password
      );
    if (!target) {
      setError("账号或密码不正确，请重试");
      return;
    }
    setError("");
    setLoading(true);
    // 模拟网络请求耗时，给出真实登录手感
    setTimeout(() => onLogin(target), 500);
  };

  // 快捷填充：点击直接把体验账号填入输入框（user1/1 等）
  const quickFill = (u: MockUser) => {
    fillUser(u);
  };

  const inputBase: React.CSSProperties = {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    fontFamily: font,
    fontSize: 15,
    color: "#2c2419",
    padding: "0 4px",
    height: 46,
  };

  const fieldBox: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: "#faf7f2",
    border: "1px solid #e6dfd4",
    borderRadius: 14,
    padding: "0 14px",
    marginTop: 6,
  };

  const label: React.CSSProperties = {
    fontFamily: font,
    fontSize: 12.5,
    fontWeight: 600,
    color: "#6d5c47",
    marginTop: 16,
    textAlign: "left",
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: BG,
        overflowY: "auto",
        position: "relative",
      }}
    >
      {/* 品牌区 */}
      <div style={{ padding: "44px 24px 6px", textAlign: "center" }}>
        <div
          style={{
            width: 76,
            height: 76,
            margin: "0 auto 14px",
            borderRadius: 24,
            background: `linear-gradient(160deg, ${WECHAT_GREEN}, #05924a)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 26px rgba(7,193,96,0.35)",
          }}
        >
          {WX_ICON}
        </div>
        <div style={{ fontFamily: font, fontSize: 22, fontWeight: 800, color: "#f3ece2" }}>
          AI 智能穿搭
        </div>
        <div style={{ fontFamily: font, fontSize: 13, color: "#a89c8c", marginTop: 6 }}>
          微信授权登录 · 尊享 1 对 1 穿搭定制服务
        </div>
      </div>

      {/* 登录卡片 */}
      <div
        style={{
          margin: "26px 20px 0",
          background: "#fdfbf7",
          borderRadius: 22,
          padding: "24px 20px 22px",
          boxShadow: "0 16px 44px rgba(0,0,0,0.35)",
        }}
      >
        {/* 微信一键登录（模拟微信授权，直接以体验账号 user1 登录） */}
        <button
          onClick={() => doLogin(MOCK_USERS[0])}
          disabled={loading}
          style={{
            width: "100%",
            height: 50,
            border: "none",
            borderRadius: 25,
            background: WECHAT_GREEN,
            color: "#fff",
            fontFamily: font,
            fontSize: 16,
            fontWeight: 700,
            cursor: loading ? "default" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            opacity: loading ? 0.75 : 1,
            boxShadow: "0 8px 20px rgba(7,193,96,0.35)",
          }}
        >
          {WX_ICON}
          {loading ? "登录中…" : "微信一键登录"}
        </button>
        <div style={{ textAlign: "center", fontFamily: font, fontSize: 11, color: "#9b8a74", marginTop: 8 }}>
          演示环境：点击模拟微信授权，直接以体验账号 user1 登录
        </div>

        {/* 分隔线 */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "18px 0 2px" }}>
          <div style={{ flex: 1, height: 1, background: "#ece4d6" }} />
          <div style={{ fontFamily: font, fontSize: 11.5, color: "#b3a38c", whiteSpace: "nowrap" }}>
            或使用体验账号密码登录
          </div>
          <div style={{ flex: 1, height: 1, background: "#ece4d6" }} />
        </div>

        {/* 账号 */}
        <div style={label}>账号</div>
        <div style={fieldBox}>
          <User size={17} color="#b3a38c" style={{ flexShrink: 0 }} />
          <input
            value={account}
            onChange={(e) => {
              setAccount(e.target.value);
              setError("");
            }}
            placeholder="请输入体验账号，如 user1"
            style={{ ...inputBase, width: "100%" }}
            autoComplete="off"
          />
        </div>

        {/* 密码 */}
        <div style={label}>密码</div>
        <div style={fieldBox}>
          <Lock size={17} color="#b3a38c" style={{ flexShrink: 0 }} />
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            placeholder="请输入密码，如 1"
            style={{ ...inputBase, width: "100%" }}
            autoComplete="off"
          />
        </div>

        {/* 体验账号快捷填充 */}
        <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
          {MOCK_USERS.map((u) => {
            const active = account === u.account;
            return (
              <button
                key={u.account}
                onClick={() => quickFill(u)}
                style={{
                  flex: 1,
                  border: active ? "1.5px solid #d4a56a" : "1.5px solid #e6dfd4",
                  background: active ? "rgba(212,165,106,0.16)" : "#faf7f2",
                  borderRadius: 12,
                  padding: "8px 4px",
                  cursor: "pointer",
                  fontFamily: font,
                  fontSize: 12,
                  color: active ? "#8a5a1e" : "#6d5c47",
                  fontWeight: 600,
                }}
              >
                {u.account}
              </button>
            );
          })}
        </div>

        {/* 错误提示 */}
        {error && (
          <div style={{ textAlign: "center", fontFamily: font, fontSize: 12.5, color: "#d9534f", marginTop: 12, fontWeight: 600 }}>
            {error}
          </div>
        )}

        {/* 登录按钮 */}
        <button
          onClick={() => doLogin()}
          disabled={loading}
          style={{
            width: "100%",
            height: 50,
            border: "none",
            borderRadius: 25,
            background: `linear-gradient(90deg, #d4a56a, #e0b67e)`,
            color: "#2a1d0c",
            fontFamily: font,
            fontSize: 16,
            fontWeight: 700,
            cursor: loading ? "default" : "pointer",
            marginTop: error ? 8 : 16,
            opacity: loading ? 0.75 : 1,
            boxShadow: "0 8px 20px rgba(212,165,106,0.3)",
          }}
        >
          {loading ? "登录中…" : "登 录"}
        </button>
      </div>

      {/* 底部协议 */}
      <div style={{ padding: "18px 30px 30px", textAlign: "center" }}>
        <div style={{ fontFamily: font, fontSize: 11, color: "#a89c8c", lineHeight: 1.7 }}>
          登录即代表同意《用户协议》与《隐私政策》
          <br />
          演示环境 · 登录账号仅记录在内存中，刷新页面后需重新登录
        </div>
      </div>
    </div>
  );
}
