export const SPLASH_SESSION_KEY = "vandort:splash-seen";
export const SPLASH_COMPLETE_EVENT = "vandort:splash-complete";

export function hasSeenSplash(): boolean {
  return (
    typeof window !== "undefined" &&
    window.sessionStorage.getItem(SPLASH_SESSION_KEY) === "1"
  );
}
