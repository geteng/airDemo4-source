import { useEffect, useRef, useState } from "react";
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
import { ACCENT, ACCENT_LIGHT, BG, CARD, font, IMG, MUTED, NAV_ACTIVE, NAV_BG, NAV_INACTIVE, STYLIST_NAME, TEXT } from "./constants";
import { initStayDuration, reportPageLeave, trackEvent, trackScrollDepth } from "./track";
import type { Look, MockUser, NoteData, SubPage, Tab } from "./types";

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
import { StyleProfilePage } from "./pages/StyleProfilePage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { IdentityPage } from "./pages/IdentityPage";
import { LoginPage } from "./pages/LoginPage";
import { FitFeedbackDialog } from "./components/FitFeedbackDialog";

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
  // 模拟微信小程序登录：登录用户仅保存在内存，刷新页面后回到登录页
  const [user, setUser] = useState<MockUser | null>(null);
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
  // 收藏状态提升到 App：首页轮播详情与穿搭定制页共享同一份，避免两处不同步
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
  const toggleLiked = (id: number) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  // 收藏入口统一处理（穿搭定制页小心心/收藏按钮、搭配详情页小心心）：
  // 未收藏时 → 收藏并弹出「咨询老师二维码」弹窗；已收藏时 → 仅取消收藏，不弹窗
  const handleLikeClick = (id: number) => {
    if (!likedIds.has(id)) {
      toggleLiked(id);
      setShowStylistQR(true);
      return;
    }
    toggleLiked(id);
  };
  const dragConstraintsRef = useRef<HTMLDivElement>(null);
  const isFirstTabTrack = useRef(true);

  // 真机（微信/移动浏览器）键盘收起后，100vh 可能停留在被键盘压缩的高度，
  // 导致底部 tab 溢出屏幕。改用可视窗口高度动态填充根容器。
  const [viewportH, setViewportH] = useState<number>(() =>
    typeof window !== "undefined" ? window.innerHeight : 0
  );
  useEffect(() => {
    const update = () => setViewportH(window.innerHeight);
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    window.visualViewport?.addEventListener("resize", update);
    // 键盘收起后 innerHeight 会恢复，focus 时也重新测量一次
    window.addEventListener("focus", update);
    update();
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
      window.visualViewport?.removeEventListener("resize", update);
      window.removeEventListener("focus", update);
    };
  }, []);

  // ─── 埋点：全局 PV / 点击 / 异常 / 停留时长 ───────────────────────────────
  useEffect(() => {
    initStayDuration();
    // 埋点【page_view】：位置=App 挂载(首次进入首页)；用途=统计首页初始 PV
    trackEvent("page_view", { page: "home" }, "页面加载：进入首页(home)");

    // 全局点击记录：真实按钮 → click_button；卡片/图片等 → click_element
    const handleDocClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t || t.nodeType !== 1) return;
      const btn = t.closest?.("button, a, [role='button']") as HTMLElement | null;
      // 底部 Tab 已有独立 click_tab 上报，避免重复计为 click_button
      if (btn && btn.dataset.tab !== undefined) return;
      if (btn) {
        const name =
          btn.getAttribute("data-track") ||
          (btn.textContent || "").trim().replace(/\s+/g, " ").slice(0, 24);
        // 埋点【click_button】：位置=document 全局点击委托(命中 button/a/role=button，底部 Tab 除外)；用途=统计所有真实按钮点击
        if (name) trackEvent("click_button", { element: name }, `按钮点击：${name}`);
      } else {
        // 非按钮元素（div 卡片、图片等）：向上最多取 3 层文本
        let el: HTMLElement | null = t;
        let name = "";
        for (let i = 0; i < 3 && el; i++) {
          name = (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 24);
          if (name) break;
          el = el.parentElement;
        }
        // 埋点【click_element】：位置=document 全局点击委托(div 卡片/图片等非按钮元素)；用途=统计卡片/图片等点击
        if (name) trackEvent("click_element", { element: name, tag: t.tagName }, `元素点击：${name}（${t.tagName}）`);
      }
    };
    document.addEventListener("click", handleDocClick);

    // 异常事件：资源加载失败 / 未捕获错误
    // 埋点【error_event】：位置=window error 监听(捕获阶段)；用途=统计图片/脚本等资源加载失败
    const handleError = (e: Event) => {
      const src = (e.target as HTMLElement | null)?.tagName || "";
      trackEvent("error_event", {
        type: "resource_error",
        source: src,
        detail: (e as ErrorEvent).message || "",
      }, `资源加载失败：${src}`);
    };
    // 埋点【error_event】：位置=window unhandledrejection 监听；用途=统计 Promise 未捕获异常
    const handleUnhandledRejection = (e: PromiseRejectionEvent) => {
      trackEvent("error_event", { type: "unhandled_rejection", detail: String(e.reason) }, `未捕获 Promise 异常：${String(e.reason)}`);
    };
    window.addEventListener("error", handleError, true);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    // 停留时长：离开页面 / 切后台时上报
    const handlePageLeave = () => reportPageLeave();
    const handleVisibility = () => {
      if (document.visibilityState === "hidden") reportPageLeave();
    };
    window.addEventListener("pagehide", handlePageLeave);
    window.addEventListener("beforeunload", handlePageLeave);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("click", handleDocClick);
      window.removeEventListener("error", handleError, true);
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
      window.removeEventListener("pagehide", handlePageLeave);
      window.removeEventListener("beforeunload", handlePageLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  // Tab 切换时上报 PV（首次渲染已由 mount 上报，跳过避免重复）
  useEffect(() => {
    if (isFirstTabTrack.current) {
      isFirstTabTrack.current = false;
      return;
    }
    if (subPage === null) {
      // 埋点【page_view】：位置=Tab 切换 useEffect；用途=统计各 Tab 页面 PV(首次已由 mount 上报故跳过)
      trackEvent("page_view", { page: activeTab }, `Tab 页面访问：${activeTab}`);
    }
  }, [activeTab, subPage]);

  const handleGoProduct = (look?: Look) => {
    // 埋点【click_nav】：位置=首页「查看今日搭配」/推荐卡片 → 进入搭配详情页；用途=统计详情页跳转
    trackEvent("click_nav", { page: "product", product: look?.title || "" }, `跳转搭配详情：${look?.title || ""}`);
    if (look) setSelectedLook(look);
    setSubPage("product");
  };
  const handleGoTryOn = (item: { img: string; name: string; video?: string }) => {
    // 埋点【click_nav】：位置=推荐页「AI 试衣」卡片 → 进入 AI 虚拟试衣；用途=统计试衣页跳转
    trackEvent("click_nav", { page: "tryon", item: item.name }, `跳转 AI 试衣：${item.name}`);
    setSelectedTryOnItem(item);
    setSubPage("tryon");
  };
  const handleGoNote = (note: NoteData) => {
    // 埋点【click_nav】：位置=首页种草笔记卡片 → 打开笔记；用途=统计笔记打开/外链跳转
    trackEvent("click_nav", { page: "note", note: note.title }, `打开种草笔记：${note.title}`);
    if (note.link) {
      window.open(note.link, "_blank");
      return;
    }
    setSelectedNote(note);
    setSubPage("note");
  };
  const handleBack = () => {
    // 埋点【click_nav】：位置=各次级页面顶部返回按钮；用途=统计返回行为及来源
    trackEvent("click_nav", { page: "back", from: subPage }, `返回上一页（来自：${subPage ?? "未知"}）`);
    setSubPage(null);
  };
  // 以下 9 个为「我的」页各入口：点击均上报 click_nav 并进入对应子页面
  const handleGoOrders = (tab?: string) => { /* 埋点【click_nav】：我的页「我的订单」入口 */ trackEvent("click_nav", { page: "orders", tab: tab || "all" }, `跳转我的订单（tab=${tab || "all"}）`); setOrderInitialTab(tab || "all"); setSubPage("orders"); };
  const handleGoFavorites = () => { /* 埋点【click_nav】：我的页「我的收藏」入口 */ trackEvent("click_nav", { page: "favorites" }, "跳转我的收藏"); setSubPage("favorites"); };
  const handleGoCoupons = () => { /* 埋点【click_nav】：我的页「优惠券」入口 */ trackEvent("click_nav", { page: "coupons" }, "跳转优惠券"); setSubPage("coupons"); };
  const handleGoRecords = () => { /* 埋点【click_nav】：我的页「服务记录」入口 */ trackEvent("click_nav", { page: "records" }, "跳转服务记录"); setSubPage("records"); };
  const handleGoVip = () => { /* 埋点【click_nav】：我的页「我的会员」入口 */ trackEvent("click_nav", { page: "vip" }, "跳转我的会员"); setSubPage("vip"); };
  const handleGoStyleProfile = () => { /* 埋点【click_nav】：我的页「个人穿搭画像」入口 */ trackEvent("click_nav", { page: "styleProfile" }, "跳转个人穿搭画像"); setSubPage("styleProfile"); };
  const handleGoWardrobe = () => { /* 埋点【click_nav】：我的页「个人衣橱」入口 */ trackEvent("click_nav", { page: "wardrobe" }, "跳转个人衣橱"); setSubPage("wardrobe"); };
  const handleGoPrivacy = () => { /* 埋点【click_nav】：我的页「隐私条款相关」入口 */ trackEvent("click_nav", { page: "privacy" }, "跳转隐私条款相关"); setSubPage("privacy"); };
  const handleGoIdentity = () => { /* 埋点【click_nav】：我的页「我的专属形象」入口 */ trackEvent("click_nav", { page: "identity" }, "跳转我的专属形象"); setSubPage("identity"); };
  const handleCallService = () => { /* 埋点【click_nav】：我的页「拨打客服」按钮 → 弹出拨打确认弹窗 */ trackEvent("click_nav", { page: "call_dialog" }, "点击拨打客服（弹确认框）"); setShowCallDialog(true); };
  const handleGoStylist = () => { /* 埋点【click_nav】：首页/我的页「咨询席霖老师」入口 → 进入咨询页 */ trackEvent("click_nav", { page: "stylist" }, "跳转咨询席霖老师"); setSubPage("stylist"); };

  return (
    <div
      style={{
        width: "100%",
        height: viewportH ? `${viewportH}px` : "100vh",
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
        {/* 登录态：未登录先展示模拟微信登录页，登录后才进入小程序主界面 */}
        {user ? (
          <>
        {/* Page content */}
        <div
          ref={dragConstraintsRef}
          style={{ flex: 1, overflow: "hidden", position: "relative" }}
          onScrollCapture={(e) => {
            const el = e.target as HTMLElement;
            if (el && el.scrollHeight > el.clientHeight) {
              trackScrollDepth(el.scrollTop, el.scrollHeight, el.clientHeight);
            }
          }}
        >
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
                {activeTab === "home" && <HomePage onGoProduct={handleGoProduct} onGoNote={handleGoNote} onGoVipJoin={() => { /* 埋点【click_nav】：首页「加入会员」横幅 → 弹出 VIP 开通弹窗 */ trackEvent("click_nav", { page: "vip_join" }, "首页加入会员横幅（弹 VIP 弹窗）"); setShowVipJoin(true); }} onGoStylist={handleGoStylist} />}
                {activeTab === "recommend" && <RecommendPage onGoTryOn={(look) => handleGoTryOn({ img: look.img, name: look.title, video: look.video })} likedIds={likedIds} onToggleLike={handleLikeClick} />}
                {activeTab === "mine" && <MinePage
                  currentUser={user}
                  onLogout={() => { /* 切换账号：回到模拟微信登录页 */ setUser(null); setSubPage(null); }}
                  onGoOrders={handleGoOrders}
                  onGoFavorites={handleGoFavorites}
                  onGoCoupons={handleGoCoupons}
                  onGoRecords={handleGoRecords}
                  onGoVip={handleGoVip}
                  onCallService={handleCallService}
                  onGoStyleProfile={handleGoStyleProfile}
                  onGoWardrobe={handleGoWardrobe}
                  onGoPrivacy={handleGoPrivacy}
                  onGoIdentity={handleGoIdentity}
                />}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating stylist button - only on home and recommend tabs, draggable */}
          {((subPage === null && (activeTab === "home" || activeTab === "recommend")) || subPage === "product") && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 20 }}
              drag
              dragConstraints={dragConstraintsRef}
              dragMomentum={false}
              whileDrag={{ scale: 1.12, boxShadow: "0 8px 28px rgba(184,135,74,0.5)" }}
              whileTap={{ scale: 0.95 }}
              onTap={() => { /* 埋点【click_nav】：右侧「咨询席霖老师」浮窗 → 弹出二维码弹窗 */ trackEvent("click_nav", { page: "stylist_qr" }, "点击咨询席霖老师浮窗（弹二维码）"); setShowStylistQR(true); }}
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
                zIndex: 30,
                width: 48,
                touchAction: "none",
                WebkitTouchCallout: "none",
                userSelect: "none",
              }}
            >
              <Headphones size={18} color="#322302" />
              <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, fontSize: 11, lineHeight: 1.2, letterSpacing: 1, userSelect: "none" }}>
                <span>咨询</span>
                <span>席霖</span>
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
                    overflow: "hidden",
                    border: `2px solid ${ACCENT}`,
                    margin: "0 auto 12px",
                  }}>
                    <img
                      src={import.meta.env.BASE_URL + "assets/stylist_avatar.png"}
                      alt={STYLIST_NAME}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </div>

                  <div style={{ fontFamily: font, fontSize: 17, fontWeight: 700, color: TEXT, marginBottom: 4 }}>
                    咨询专属穿搭席老师
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
                {subPage === "product" && <ProductPage look={selectedLook} onBack={handleBack} liked={selectedLook ? likedIds.has(selectedLook.id) : false} onToggleLike={() => { if (selectedLook) handleLikeClick(selectedLook.id); }} onGoTryOn={() => handleGoTryOn({ img: selectedLook?.img ?? IMG.product, name: selectedLook?.title ?? "高级感白领风", video: selectedLook?.video })} />}
                {subPage === "tryon" && selectedTryOnItem && <TryOnPage item={selectedTryOnItem} onBack={handleBack} />}
                {subPage === "note" && selectedNote && <NoteDetailPage note={selectedNote} onBack={handleBack} />}
                {subPage === "wardrobe" && <WardrobePage onBack={handleBack} />}
                {subPage === "orders" && <OrdersPage onBack={handleBack} initialTab={orderInitialTab} />}
                {subPage === "favorites" && <FavoritesPage onBack={handleBack} />}
                {subPage === "coupons" && <CouponsPage onBack={handleBack} />}
                {subPage === "records" && <RecordsPage onBack={handleBack} />}
                {subPage === "vip" && <VipPage onBack={handleBack} />}
                {subPage === "styleProfile" && <StyleProfilePage onBack={handleBack} />}
                {subPage === "stylist" && <StylistProfilePage onBack={handleBack} />}
                {subPage === "privacy" && <PrivacyPage onBack={handleBack} />}
                {subPage === "identity" && <IdentityPage onBack={handleBack} />}
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
                      onClick={() => { /* 埋点【click_button】：拨打确认弹窗「取消」按钮 */ trackEvent("click_button", { element: "取消拨打" }, "拨打弹窗：取消"); setShowCallDialog(false); }}
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
                      onClick={() => { /* 埋点【click_nav】：拨打确认弹窗「立即拨打」按钮 */ trackEvent("click_nav", { page: "call_phone", phone: "400-888-6688" }, "拨打弹窗：立即拨打 400-888-6688"); setShowCallDialog(false); }}
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
                      onClick={() => { /* 埋点【click_button】：VIP 开通弹窗右上角「关闭」按钮 */ trackEvent("click_button", { element: "关闭VIP弹窗" }, "VIP 弹窗：关闭"); setShowVipJoin(false); }}
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
                      {/* 埋点【click_vip_plan】：VIP 弹窗选择「月卡」套餐 */}
                      {/* Month */}
                      <div
                        onClick={() => { trackEvent("click_vip_plan", { plan: "month" }, "选择 VIP 月卡"); setVipPlan("month"); }}
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
                      {/* 埋点【click_vip_plan】：VIP 弹窗选择「季卡」套餐 */}
                      {/* Season */}
                      <div
                        onClick={() => { trackEvent("click_vip_plan", { plan: "season" }, "选择 VIP 季卡"); setVipPlan("season"); }}
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
                      {/* 埋点【click_vip_plan】：VIP 弹窗选择「年卡」套餐 */}
                      {/* Year */}
                      <div
                        onClick={() => { trackEvent("click_vip_plan", { plan: "year" }, "选择 VIP 年卡"); setVipPlan("year"); }}
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
                      onClick={() => { /* 埋点【click_vip_subscribe】：VIP 弹窗底部「立即开通」按钮 */ trackEvent("click_vip_subscribe", { plan: vipPlan }, `VIP 立即开通（套餐=${vipPlan}）`); setShowVipJoin(false); }}
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
        {(subPage === null || subPage === "product") && (
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
                  data-tab={id}
                  onClick={() => { /* 埋点【tab_switch】：底部 Tab 栏切换(首页/推荐/我的) */ trackEvent("tab_switch", { from: activeTab, to: id }, `切换 Tab：${activeTab} → ${id}`); setActiveTab(id); setSubPage(null); }}
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

        {/* 详情页停留 12 秒反馈/数字形象调整弹窗（《咨询》→ 复用上方二维码弹窗） */}
        {subPage === "product" && (
          <FitFeedbackDialog onConsult={() => setShowStylistQR(true)} />
        )}
          </>
        ) : (
          <LoginPage onLogin={(u) => setUser(u)} />
        )}
      </div>
    </div>
  );
}
