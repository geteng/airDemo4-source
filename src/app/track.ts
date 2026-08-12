/**
 * H5 静态页面用户行为埋点
 * - 匿名用户唯一标识（localStorage 持久化，代替登录 uid）
 * - 上报方式：navigator.sendBeacon，降级 fetch(keepalive)
 * - 事件类型：page_view / page_leave / click_button / click_element / tab_switch / click_nav / click_buy / click_vip_plan / click_vip_subscribe / scroll_depth / error_event 等
 * - 上报体(文档 2.1)：aid(应用标识) / uid(匿名用户ID,顶层) / event / eventMsg(事件描述,顶层) / url / referrer / timestamp / userAgent / screen / extra
 */

// ========== 配置区 ==========
// 开发环境(localhost)走 Vite 代理 /api → https://gtt666.cn，避免 sendBeacon 跨域凭证被 CORS 拦截；
// 生产部署(gtt666.cn 下)同源直连绝对地址
const isDevEnv =
  typeof location !== "undefined" &&
  /^localhost|127\.0\.0\.1/.test(location.hostname);

export const TRACK_CONFIG = {
  // 上报接口地址
  reportApi: isDevEnv ? "/api/track" : "https://gtt666.cn/api/track",
  // 应用标识：直接取自 vite.config.ts 的 base 字段（构建时注入到 import.meta.env.BASE_URL，如 "/airDemo_cjy/"），去首尾斜杠即得 "airDemo_cjy"
  aid: (import.meta.env.BASE_URL || "/").replace(/^\/|\/$/g, "") || "unknown",
  // 是否在控制台打印事件（便于本地调试验证）
  debug: true,
};

const STORAGE_KEY = "h5_aid";

// ========== 匿名用户唯一标识 ==========
let cachedAid: string | null = null;

/** 简易 UUID v4（crypto.randomUUID 不可用时的降级） */
function uuidV4Fallback(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getAnonymousId(): string {
  if (cachedAid) return cachedAid;
  try {
    let aid = localStorage.getItem(STORAGE_KEY);
    if (!aid) {
      aid =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : uuidV4Fallback();
      localStorage.setItem(STORAGE_KEY, aid);
    }
    cachedAid = aid;
  } catch {
    cachedAid = uuidV4Fallback();
  }
  return cachedAid;
}

// ========== 行为上报 ==========
// eventMsg：事件详情文案（文档 2.1 顶层字段），用于记录该事件具体描述，如「点击试穿按钮」
export function trackEvent(
  eventName: string,
  extra: Record<string, unknown> = {},
  eventMsg = ""
): void {
  try {
    // 请求体与文档 2.1 一致：aid 应用标识、uid 匿名用户标识(顶层)、eventMsg 事件描述(顶层)、extra 附加数据
    const payload = {
      aid: TRACK_CONFIG.aid,
      uid: getAnonymousId(),
      event: eventName,
      url: location.href,
      referrer: document.referrer,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      screen: `${window.screen.width}x${window.screen.height}`,
      eventMsg: eventMsg || "",
      extra: { ...extra },
    };

    if (TRACK_CONFIG.debug) {
      console.debug("[track]", eventName, payload);
    }
    if (!TRACK_CONFIG.reportApi) return;

    const data = JSON.stringify(payload);
    // 优先 sendBeacon（页面关闭也能发出）
    if (navigator.sendBeacon) {
      const blob = new Blob([data], { type: "application/json" });
      if (navigator.sendBeacon(TRACK_CONFIG.reportApi, blob)) return;
    }
    // 降级 fetch keepalive
    if (typeof fetch === "function") {
      fetch(TRACK_CONFIG.reportApi, {
        method: "POST",
        body: data,
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        mode: "cors",
      }).catch(() => {});
      return;
    }
    // 最终降级 Image beacon
    const img = new Image();
    img.src = `${TRACK_CONFIG.reportApi}?e=${encodeURIComponent(eventName)}&t=${Date.now()}`;
  } catch {
    // 埋点异常不影响业务
  }
}

// ========== 停留时长 ==========
let pageEnterTime = Date.now();
let leaveReported = false;

export function initStayDuration(): void {
  pageEnterTime = Date.now();
  leaveReported = false;
}

export function reportPageLeave(extra: Record<string, unknown> = {}): void {
  if (leaveReported) return;
  leaveReported = true;
  const staySecond = Math.round((Date.now() - pageEnterTime) / 1000);
  // 埋点【page_leave】：位置=App.tsx 全局监听 pagehide/beforeunload/visibilitychange(hidden)；
  // 用途=统计页面停留时长(秒)，extra.stay_second=停留秒数，防重复上报
  trackEvent("page_leave", { stay_second: staySecond, ...extra }, "页面离开，记录停留时长（秒）");
}

// ========== 滚动深度 ==========
let reportedDepths = new Set<number>();
const DEPTH_MILESTONES = [25, 50, 75, 100];

export function resetScrollDepth(): void {
  reportedDepths = new Set();
}

export function trackScrollDepth(
  scrollTop: number,
  scrollHeight: number,
  clientHeight: number
): void {
  if (!scrollHeight || scrollHeight <= clientHeight) return;
  const ratio = (scrollTop + clientHeight) / scrollHeight;
  const depth = Math.round(ratio * 100);
  const milestone = DEPTH_MILESTONES.find((m) => depth >= m);
  if (milestone && !reportedDepths.has(milestone)) {
    reportedDepths.add(milestone);
    // 埋点【scroll_depth】：位置=各页面滚动容器 onScrollCapture 调用；用途=统计滚动深度里程碑
    // (25/50/75/100%)，extra.depth=里程碑百分比、ratio=精确比例，每个里程碑仅上报一次
    trackEvent("scroll_depth", { depth: milestone, ratio: Number(ratio.toFixed(2)) }, `滚动深度达到 ${milestone}%`);
  }
}
