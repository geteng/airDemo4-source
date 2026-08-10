import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  Check,
  Crown,
  Gem,
  Headphones,
  Heart,
  Home,
  Package,
  Phone,
  Sparkles,
  User,
  X,
  Zap,
} from "lucide-react";
import { ACCENT, ACCENT_LIGHT, BG, CARD, font, IMG, MUTED, NAV_ACTIVE, NAV_BG, NAV_INACTIVE, TEXT } from "./constants";
import type { Look, NoteData, SubPage, Tab } from "./types";

import { HomePage } from "./pages/HomePage";
import { RecommendPage } from "./pages/RecommendPage";
import { MinePage } from "./pages/MinePage";
import { LivePage } from "./pages/LivePage";
import { NoteDetailPage } from "./pages/NoteDetailPage";
import { ProductPage } from "./pages/ProductPage";
import { TryOnPage } from "./pages/TryOnPage";
import { WardrobePage } from "./pages/WardrobePage";
import { OrdersPage } from "./pages/OrdersPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { CouponsPage } from "./pages/CouponsPage";
import { RecordsPage } from "./pages/RecordsPage";
import { VipPage } from "./pages/VipPage";
import { StylistProfilePage } from "./pages/StylistProfilePage";

// ─── Bottom tab bar ──────────────────────────────────────────────────────────
const tabs: {
  id: Tab;
  label: string;
  Icon: React.FC<{ size: number; color: string; fill?: string }>;
}[] = [
  { id: "home", label: "首页", Icon: ({ size, color }) => <Home size={size} color={color} /> },
  { id: "recommend", label: "穿搭定制", Icon: ({ size, color }) => <Sparkles size={size} color={color} /> },
  { id: "mine", label: "我的", Icon: ({ size, color }) => <User size={size} color={color} /> },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [subPage, setSubPage] = useState<SubPage>(null);
  const [selectedLook, setSelectedLook] = useState<Look | null>(null);
  const [selectedTryOnItem, setSelectedTryOnItem] = useState<{ img: string; name: string; video?: string } | null>(null);
  const [selectedNote, setSelectedNote] = useState<NoteData | null>(null);
  const [showStylistQR, setShowStylistQR] = useState(false);
  const [showCallDialog, setShowCallDialog] = useState(false);
  const [showVipJoin, setShowVipJoin] = useState(false);
  const [vipPlan, setVipPlan] = useState<"month" | "season" | "year">("year");
  const [orderInitialTab, setOrderInitialTab] = useState<string>("all");
  const dragConstraintsRef = useRef<HTMLDivElement>(null);

  const handleGoProduct = (look?: Look) => {
    if (look) setSelectedLook(look);
    setSubPage("product");
  };
  const handleGoTryOn = (item: { img: string; name: string; video?: string }) => {
    setSelectedTryOnItem(item);
    setSubPage("tryon");
  };
  const handleGoNote = (note: NoteData) => {
    if (note.link) {
      window.open(note.link, "_blank");
      return;
    }
    setSelectedNote(note);
    setSubPage("note");
  };
  const handleBack = () => setSubPage(null);
  const handleGoOrders = (tab?: string) => { setOrderInitialTab(tab || "all"); setSubPage("orders"); };
  const handleGoFavorites = () => setSubPage("favorites");
  const handleGoCoupons = () => setSubPage("coupons");
  const handleGoRecords = () => setSubPage("records");
  const handleGoVip = () => setSubPage("vip");
  const handleCallService = () => setShowCallDialog(true);
  const handleGoStylist = () => setSubPage("stylist");

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#e8e3dc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: font,
      }}
    >
      {/* Phone frame */}
      <div
        style={{
          width: "100%",
          maxWidth: 430,
          height: "100%",
          maxHeight: 896,
          background: BG,
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
          borderRadius: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Page content */}
        <div ref={dragConstraintsRef} style={{ flex: 1, overflow: "hidden", position: "relative" }}>
          {/* Tab pages */}
          <AnimatePresence mode="wait" initial={false}>
            {subPage === null && (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                style={{ position: "absolute", inset: 0 }}
              >
                {activeTab === "home" && <HomePage onGoProduct={handleGoProduct} onGoNote={handleGoNote} onGoVipJoin={() => setShowVipJoin(true)} onGoStylist={handleGoStylist} />}
                {activeTab === "recommend" && <RecommendPage onGoProduct={handleGoProduct} onGoTryOn={(look) => handleGoTryOn({ img: look.img, name: look.title, video: look.video })} />}
                {activeTab === "mine" && <MinePage
                  onGoOrders={handleGoOrders}
                  onGoFavorites={handleGoFavorites}
                  onGoCoupons={handleGoCoupons}
                  onGoRecords={handleGoRecords}
                  onGoVip={handleGoVip}
                  onCallService={handleCallService}
                />}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating stylist button - only on home and recommend tabs, draggable */}
          {subPage === null && (activeTab === "home" || activeTab === "recommend") && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 20 }}
              drag
              dragConstraints={dragConstraintsRef}
              dragMomentum={false}
              whileDrag={{ scale: 1.12, boxShadow: "0 8px 28px rgba(184,135,74,0.5)" }}
              whileTap={{ scale: 0.95 }}
              onTap={() => setShowStylistQR(true)}
              style={{
                position: "absolute",
                right: 0,
                top: "calc(50% - 30px)",
                background: "#EDC297",
                color: "#322302",
                border: "none",
                borderRadius: 16,
                padding: "12px 10px",
                fontFamily: font,
                fontSize: 12,
                fontWeight: 600,
                cursor: "grab",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                boxShadow: "0 4px 16px rgba(184,135,74,0.35)",
                zIndex: 15,
                width: 48,
                touchAction: "none",
                WebkitTouchCallout: "none",
                userSelect: "none",
              }}
            >
              <Headphones size={18} color="#322302" />
              <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, fontSize: 11, lineHeight: 1.2, letterSpacing: 1, userSelect: "none" }}>
                <span>咨询</span>
                <span>穿搭</span>
                <span>老师</span>
              </span>
            </motion.button>
          )}

          {/* Stylist QR code popup */}
          <AnimatePresence>
            {showStylistQR && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setShowStylistQR(false)}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0.6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 100,
                  backdropFilter: "blur(4px)",
                }}
              >
                <motion.div
                  initial={{ scale: 0.85, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.85, y: 20 }}
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    width: 300,
                    background: CARD,
                    borderRadius: 24,
                    padding: "28px 24px 24px",
                    textAlign: "center",
                    position: "relative",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                  }}
                >
                  {/* Close */}
                  <button
                    onClick={() => setShowStylistQR(false)}
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      border: "none",
                      background: "#f5f3f0",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <X size={16} color={MUTED} />
                  </button>

                  {/* Avatar */}
                  <div style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${ACCENT}, #d4a56a)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 12px",
                  }}>
                    <Headphones size={24} color="#fff" />
                  </div>

                  <div style={{ fontFamily: font, fontSize: 17, fontWeight: 700, color: TEXT, marginBottom: 4 }}>
                    咨询专属穿搭师
                  </div>
                  <div style={{ fontFamily: font, fontSize: 13, color: MUTED, marginBottom: 18 }}>
                    长按识别二维码，添加企业微信,获取1对1穿搭服务
                  </div>

                  {/* QR code placeholder */}
                  <div style={{
                    width: 200,
                    height: 200,
                    margin: "0 auto 16px",
                    borderRadius: 16,
                    background: "#f8f6f3",
                    border: `2px solid ${ACCENT_LIGHT}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}>
                    <img
                      src={`${import.meta.env.BASE_URL}assets/stylist_qr.png`}
                      alt="企业微信二维码"
                      style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 14, display: "block" }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sub pages (slide up) */}
          <AnimatePresence>
            {subPage !== null && (
              <motion.div
                key={subPage}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 340, damping: 36 }}
                style={{ position: "absolute", inset: 0, background: BG, zIndex: 20 }}
              >
                {subPage === "live" && <LivePage onBack={handleBack} onGoProduct={handleGoProduct} />}
                {subPage === "product" && <ProductPage look={selectedLook} onBack={handleBack} onGoTryOn={() => handleGoTryOn({ img: selectedLook?.img ?? IMG.product, name: selectedLook?.title ?? "高级感白领风", video: selectedLook?.video })} />}
                {subPage === "tryon" && selectedTryOnItem && <TryOnPage item={selectedTryOnItem} onBack={handleBack} />}
                {subPage === "note" && selectedNote && <NoteDetailPage note={selectedNote} onBack={handleBack} />}
                {subPage === "wardrobe" && <WardrobePage onGoTryOn={handleGoTryOn} />}
                {subPage === "orders" && <OrdersPage onBack={handleBack} initialTab={orderInitialTab} />}
                {subPage === "favorites" && <FavoritesPage onBack={handleBack} />}
                {subPage === "coupons" && <CouponsPage onBack={handleBack} />}
                {subPage === "records" && <RecordsPage onBack={handleBack} />}
                {subPage === "vip" && <VipPage onBack={handleBack} />}
                {subPage === "stylist" && <StylistProfilePage onBack={handleBack} />}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Phone call confirmation dialog */}
          <AnimatePresence>
            {showCallDialog && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setShowCallDialog(false)}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 200,
                  backdropFilter: "blur(4px)",
                }}
              >
                <motion.div
                  initial={{ scale: 0.85, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.85, y: 20 }}
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    width: 280,
                    background: CARD,
                    borderRadius: 20,
                    padding: "24px 24px 20px",
                    textAlign: "center",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                  }}
                >
                  {/* Phone icon */}
                  <div style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${ACCENT}, #d4a56a)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}>
                    <Phone size={26} color="#fff" />
                  </div>

                  <div style={{ fontFamily: font, fontSize: 16, fontWeight: 700, color: TEXT, marginBottom: 6 }}>
                    联系客服
                  </div>
                  <div style={{ fontFamily: font, fontSize: 13, color: MUTED, marginBottom: 4, lineHeight: 1.5 }}>
                    客服热线：400-888-6688
                  </div>
                  <div style={{ fontFamily: font, fontSize: 12, color: MUTED, marginBottom: 20 }}>
                    服务时间：9:00 - 21:00（全年无休）
                  </div>

                  <div style={{ display: "flex", gap: 10 }}>
                    <button
                      onClick={() => setShowCallDialog(false)}
                      style={{
                        flex: 1,
                        padding: "11px",
                        borderRadius: 22,
                        border: `1px solid ${ACCENT}`,
                        background: "transparent",
                        color: ACCENT,
                        fontFamily: font,
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      取消
                    </button>
                    <button
                      onClick={() => setShowCallDialog(false)}
                      style={{
                        flex: 1,
                        padding: "11px",
                        borderRadius: 22,
                        border: "none",
                        background: ACCENT,
                        color: "#fff",
                        fontFamily: font,
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                      }}
                    >
                      <Phone size={14} /> 立即拨打
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* VIP Join bottom sheet */}
          <AnimatePresence>
            {showVipJoin && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setShowVipJoin(false)}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0.55)",
                  display: "flex",
                  alignItems: "flex-end",
                  zIndex: 200,
                  backdropFilter: "blur(4px)",
                }}
              >
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", stiffness: 340, damping: 36 }}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    width: "100%",
                    background: CARD,
                    borderRadius: "24px 24px 0 0",
                    padding: "0 0 20px",
                    maxHeight: "88%",
                    overflowY: "auto",
                  }}
                >
                  {/* Drag handle */}
                  <div style={{ width: 36, height: 4, background: "#e0d8cc", borderRadius: 2, margin: "10px auto 0" }} />

                  {/* Header */}
                  <div style={{
                    background: "linear-gradient(135deg, #3a2a18 0%, #6b4a28 100%)",
                    borderRadius: "0 0 0 0",
                    padding: "20px 24px 22px",
                    position: "relative",
                  }}>
                    <button
                      onClick={() => setShowVipJoin(false)}
                      style={{
                        position: "absolute", top: 14, right: 16,
                        width: 28, height: 28, borderRadius: "50%",
                        border: "none", background: "rgba(255,255,255,0.15)",
                        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      <X size={15} color="#fff" />
                    </button>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: 12,
                        background: `linear-gradient(135deg, ${ACCENT}, #d4a56a)`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <Crown size={20} color="#fff" />
                      </div>
                      <div>
                        <div style={{ fontFamily: font, fontSize: 18, fontWeight: 700, color: "#f5d9a8" }}>开通 VIP 会员</div>
                        <div style={{ fontFamily: font, fontSize: 12, color: "rgba(245,217,168,0.6)" }}>解锁全部专属权益</div>
                      </div>
                    </div>
                  </div>

                  {/* Plan cards */}
                  <div style={{ padding: "20px 20px 16px" }}>
                    <div style={{ fontFamily: font, fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 12 }}>选择套餐</div>
                    <div style={{ display: "flex", gap: 10 }}>
                      {/* Month */}
                      <div
                        onClick={() => setVipPlan("month")}
                        style={{
                          flex: 1, borderRadius: 16, padding: "14px 10px", textAlign: "center",
                          border: vipPlan === "month" ? `2px solid ${ACCENT}` : "2px solid #e3ddd2",
                          background: vipPlan === "month" ? ACCENT_LIGHT : "#f3efe8",
                          cursor: "pointer", transition: "all 0.2s", position: "relative",
                        }}
                      >
                        <div style={{ fontFamily: font, fontSize: 12, color: vipPlan === "month" ? MUTED : "#8a7a64", marginBottom: 4 }}>月卡</div>
                        <div style={{ fontFamily: font, fontSize: 22, fontWeight: 700, color: vipPlan === "month" ? TEXT : "#2c2419" }}>¥29</div>
                        <div style={{ fontFamily: font, fontSize: 10, color: vipPlan === "month" ? MUTED : "#8a7a64", marginTop: 2 }}>¥29/月</div>
                      </div>
                      {/* Season */}
                      <div
                        onClick={() => setVipPlan("season")}
                        style={{
                          flex: 1, borderRadius: 16, padding: "14px 10px", textAlign: "center",
                          border: vipPlan === "season" ? `2px solid ${ACCENT}` : "2px solid #e3ddd2",
                          background: vipPlan === "season" ? ACCENT_LIGHT : "#f3efe8",
                          cursor: "pointer", transition: "all 0.2s", position: "relative",
                        }}
                      >
                        {vipPlan === "season" && (
                          <span style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", background: ACCENT, color: "#fff", fontSize: 9, fontWeight: 600, padding: "2px 8px", borderRadius: 8, fontFamily: font, whiteSpace: "nowrap" }}>超值</span>
                        )}
                        <div style={{ fontFamily: font, fontSize: 12, color: vipPlan === "season" ? MUTED : "#8a7a64", marginBottom: 4 }}>季卡</div>
                        <div style={{ fontFamily: font, fontSize: 22, fontWeight: 700, color: vipPlan === "season" ? TEXT : "#2c2419" }}>¥79</div>
                        <div style={{ fontFamily: font, fontSize: 10, color: vipPlan === "season" ? MUTED : "#8a7a64", marginTop: 2 }}>¥26.3/月</div>
                      </div>
                      {/* Year */}
                      <div
                        onClick={() => setVipPlan("year")}
                        style={{
                          flex: 1, borderRadius: 16, padding: "14px 10px", textAlign: "center",
                          border: vipPlan === "year" ? `2px solid ${ACCENT}` : "2px solid #e3ddd2",
                          background: vipPlan === "year" ? ACCENT_LIGHT : "#f3efe8",
                          cursor: "pointer", transition: "all 0.2s", position: "relative",
                        }}
                      >
                        {vipPlan === "year" && (
                          <span style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", background: `linear-gradient(90deg, ${ACCENT}, #d4a56a)`, color: "#fff", fontSize: 9, fontWeight: 600, padding: "2px 8px", borderRadius: 8, fontFamily: font, whiteSpace: "nowrap" }}>省 60 元</span>
                        )}
                        <div style={{ fontFamily: font, fontSize: 12, color: vipPlan === "year" ? MUTED : "#8a7a64", marginBottom: 4 }}>年卡</div>
                        <div style={{ fontFamily: font, fontSize: 22, fontWeight: 700, color: vipPlan === "year" ? TEXT : "#2c2419" }}>¥288</div>
                        <div style={{ fontFamily: font, fontSize: 10, color: vipPlan === "year" ? MUTED : "#8a7a64", marginTop: 2 }}>¥24/月</div>
                      </div>
                    </div>
                  </div>

                  {/* Benefits list */}
                  <div style={{ padding: "0 20px 20px" }}>
                    <div style={{ fontFamily: font, fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 12 }}>会员专属权益</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {[
                        { icon: Sparkles, title: "每周专属穿搭建议", desc: "根据身形、场景定制搭配方案" },
                        { icon: Zap, title: "新品优先体验", desc: "每季新品提前 48 小时预览购买" },
                        { icon: Gem, title: "专属搭配问答", desc: "无限次向穿搭师提问，1对1解答" },
                        { icon: Award, title: "生日双倍积分", desc: "生日当月消费积分双倍累计" },
                        { icon: Package, title: "全年免邮", desc: "全年不限次数免运费" },
                        { icon: Heart, title: "30天无忧退换", desc: "会员专享30天退换货保障" },
                      ].map((b) => (
                        <div key={b.title} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                          <div style={{ width: 32, height: 32, borderRadius: 10, background: ACCENT_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <b.icon size={15} color={ACCENT} />
                          </div>
                          <div style={{ flex: 1, paddingTop: 2 }}>
                            <div style={{ fontFamily: font, fontSize: 13, fontWeight: 600, color: TEXT }}>{b.title}</div>
                            <div style={{ fontFamily: font, fontSize: 11, color: MUTED, marginTop: 1 }}>{b.desc}</div>
                          </div>
                          <Check size={14} color={ACCENT} style={{ flexShrink: 0, marginTop: 8 }} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div style={{ padding: "0 20px", position: "sticky", bottom: 0, background: CARD, paddingBottom: 4 }}>
                    <button
                      onClick={() => setShowVipJoin(false)}
                      style={{
                        width: "100%", padding: "14px", borderRadius: 24,
                        border: "none",
                        background: `linear-gradient(90deg, ${ACCENT}, #d4a56a)`,
                        color: "#fff", fontFamily: font, fontSize: 15, fontWeight: 700,
                        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                        boxShadow: "0 4px 16px rgba(184,135,74,0.35)",
                      }}
                    >
                      <Crown size={16} /> 立即开通 · {vipPlan === "month" ? "¥29" : vipPlan === "season" ? "¥79" : "¥288"}
                    </button>
                    <div style={{ textAlign: "center", fontFamily: font, fontSize: 11, color: MUTED, marginTop: 8 }}>
                      支付即同意《VIP会员服务协议》· 自动续费可随时取消
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {subPage === null && (
          <div
            style={{
              flexShrink: 0,
              background: NAV_BG,
              borderTop: `1px solid rgba(58,42,24,0.15)`,
              display: "flex",
              paddingBottom: 8,
              zIndex: 30,
              boxShadow: "0 -6px 24px rgba(0,0,0,0.25)",
            }}
          >
            {tabs.map(({ id, label, Icon }) => {
              const active = activeTab === id;
              return (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  style={{
                    flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
                    gap: 3, padding: "10px 0 4px", background: "none", border: "none", cursor: "pointer",
                  }}
                >
                  <motion.div
                    animate={{ scale: active ? 1.1 : 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Icon size={22} color={active ? NAV_ACTIVE : NAV_INACTIVE} />
                  </motion.div>
                  <span style={{ fontFamily: font, fontSize: 10, color: active ? NAV_ACTIVE : NAV_INACTIVE, fontWeight: active ? 700 : 400 }}>
                    {label}
                  </span>
                  {active && (
                    <motion.div
                      layoutId="tab-indicator"
                      style={{ width: 4, height: 4, borderRadius: "50%", background: NAV_ACTIVE }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
