/* Browser logos in a neutral single tone (freely-licensed assets served
   from /public/browsers), matching the neutral treatment used for the
   social network icons. */
import { asset } from "../lib/asset";

export function ChromeIcon() {
  return <img src={asset("/browsers/chrome.svg")} width={22} height={22} alt="Chrome" className="browser-logo-img" />;
}

export function FirefoxIcon() {
  return <img src={asset("/browsers/firefox.svg")} width={22} height={22} alt="Firefox" className="browser-logo-img" />;
}

export function SafariIcon() {
  return <img src={asset("/browsers/safari.svg")} width={22} height={22} alt="Safari" className="browser-logo-img" />;
}

export function EdgeIcon() {
  return <img src={asset("/browsers/edge.svg")} width={22} height={22} alt="Edge" className="browser-logo-img" />;
}

export function OperaIcon() {
  return <img src={asset("/browsers/opera.svg")} width={22} height={22} alt="Opera" className="browser-logo-img" />;
}

export function BraveIcon() {
  return <img src={asset("/browsers/brave.svg")} width={22} height={22} alt="Brave" className="browser-logo-img" />;
}
