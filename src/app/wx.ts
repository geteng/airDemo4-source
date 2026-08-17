// 微信 JS-SDK 注入：在微信内 H5 中通过 <wx-open-launch-weapp> 开放标签跳转小程序
// 文档：https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_Open_Tag.html
import { WX_APPID, WX_SIGN_API } from "./constants";

// jweixin 全局类型（脚本在 index.html 中引入）
declare global {
  interface Window {
    wx?: any;
  }
}

let configured = false;

/**
 * 注入 wx.config。签名必须由后端用 jsapi_ticket 计算后返回，前端无法生成。
 * 只需在页面挂载时调用一次。
 */
export async function initWxConfig(): Promise<void> {
  if (configured || typeof window === "undefined" || !window.wx) return;
  try {
    const url = location.href.split("#")[0];
    const res = await fetch(`${WX_SIGN_API}?url=${encodeURIComponent(url)}`, {
      credentials: "include",
    });
    const data = await res.json();
    window.wx.config({
      debug: false,
      appId: WX_APPID,
      timestamp: data.timestamp,
      nonceStr: data.nonceStr,
      signature: data.signature,
      // 开放标签必须包含 "openTag"
      jsApiList: ["openTag"],
      openTagList: ["wx-open-launch-weapp"],
    });
    configured = true;
  } catch (e) {
    console.warn("[wx] config 注入失败，开放标签将无法使用：", e);
  }
}
