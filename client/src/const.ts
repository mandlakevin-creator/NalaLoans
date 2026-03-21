export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;
  const apiUrl = import.meta.env.VITE_API_URL || "https://nalaloans-hjhv9quk.manus.space";
  
  // On Vercel, use Manus backend for OAuth callback (it's authorized)
  // Then redirect back to Vercel frontend
  const isVercel = window.location.hostname === "nala-loans.vercel.app";
  const redirectUri = isVercel 
    ? `${apiUrl}/api/oauth/callback?returnTo=${encodeURIComponent(window.location.origin)}`
    : `${window.location.origin}/api/oauth/callback`;
  
  const state = btoa(redirectUri);

  const url = new URL(`${oauthPortalUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  return url.toString();
};
