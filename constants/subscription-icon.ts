import { icons } from "@/constants/icons";
import type { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import type { ImageSourcePropType } from "react-native";

type IoniconName = ComponentProps<typeof Ionicons>["name"];
type MCIName = ComponentProps<typeof MaterialCommunityIcons>["name"];

export type SubscriptionIconType =
  | { kind: "image"; source: ImageSourcePropType }
  | { kind: "vector"; set: "ionicons"; name: IoniconName; color: string }
  | { kind: "vector"; set: "mci"; name: MCIName; color: string };

type IconMatch = { icon: SubscriptionIconType; color: string };

function image(source: ImageSourcePropType): SubscriptionIconType {
  return { kind: "image", source };
}

function ion(name: IoniconName, color: string): SubscriptionIconType {
  return { kind: "vector", set: "ionicons", name, color };
}

function mci(name: MCIName, color: string): SubscriptionIconType {
  return { kind: "vector", set: "mci", name, color };
}

// Real bundled artwork — used whenever a subscription name matches one of these.
const IMAGE_ICONS: Record<string, IconMatch> = {
  netflix: { icon: image(icons.netflix), color: "#E50914" },
  spotify: { icon: image(icons.spotify), color: "#1DB954" },
  claude: { icon: image(icons.claude), color: "#DA7756" },
  figma: { icon: image(icons.figma), color: "#A259FF" },
  adobe: { icon: image(icons.adobe), color: "#FA0F00" },
  notion: { icon: image(icons.notion), color: "#37352F" },
  github: { icon: image(icons.github), color: "#2188FF" },
  canva: { icon: image(icons.canva), color: "#00C4CC" },
  dropbox: { icon: image(icons.dropbox), color: "#0061FF" },
  openai: { icon: image(icons.openai), color: "#10A37F" },
  chatgpt: { icon: image(icons.openai), color: "#10A37F" },
  medium: { icon: image(icons.medium), color: "#000000" },
};

// A much larger library of well-known subscriptions, rendered from vector logos
// so we don't need to bundle a PNG per service.
const VECTOR_ICONS: Record<string, IconMatch> = {
  "youtube premium": { icon: mci("youtube", "#FF0000"), color: "#FF0000" },
  "youtube music": { icon: mci("youtube", "#FF0000"), color: "#FF0000" },
  "youtube tv": { icon: mci("youtube-tv", "#FF0000"), color: "#FF0000" },
  youtube: { icon: mci("youtube", "#FF0000"), color: "#FF0000" },
  "disney+": { icon: mci("movie-open-star", "#113CCF"), color: "#113CCF" },
  "disney plus": { icon: mci("movie-open-star", "#113CCF"), color: "#113CCF" },
  hulu: { icon: mci("hulu", "#1CE783"), color: "#1CE783" },
  "hbo max": { icon: mci("monitor-star", "#9B30FF"), color: "#9B30FF" },
  max: { icon: mci("monitor-star", "#9B30FF"), color: "#9B30FF" },
  peacock: { icon: mci("bird", "#000000"), color: "#000000" },
  "amazon prime": { icon: ion("logo-amazon", "#FF9900"), color: "#FF9900" },
  "prime video": { icon: ion("logo-amazon", "#00A8E1"), color: "#00A8E1" },
  "apple music": { icon: ion("logo-apple", "#FA243C"), color: "#FA243C" },
  "apple tv+": { icon: ion("logo-apple", "#000000"), color: "#000000" },
  "apple tv": { icon: ion("logo-apple", "#000000"), color: "#000000" },
  "apple one": { icon: ion("logo-apple", "#000000"), color: "#000000" },
  "apple arcade": { icon: ion("logo-apple", "#000000"), color: "#000000" },
  icloud: { icon: mci("apple-icloud", "#3693F3"), color: "#3693F3" },
  "google one": { icon: ion("logo-google", "#4285F4"), color: "#4285F4" },
  "google drive": { icon: mci("google-drive", "#4285F4"), color: "#4285F4" },
  "google play": { icon: mci("google-play", "#4285F4"), color: "#4285F4" },
  "microsoft 365": { icon: mci("microsoft-office", "#D83B01"), color: "#D83B01" },
  "office 365": { icon: mci("microsoft-office", "#D83B01"), color: "#D83B01" },
  onedrive: { icon: mci("microsoft-onedrive", "#0078D4"), color: "#0078D4" },
  "xbox game pass": { icon: mci("microsoft-xbox", "#107C10"), color: "#107C10" },
  xbox: { icon: mci("microsoft-xbox", "#107C10"), color: "#107C10" },
  "playstation plus": { icon: ion("logo-playstation", "#003791"), color: "#003791" },
  playstation: { icon: ion("logo-playstation", "#003791"), color: "#003791" },
  "nintendo switch online": { icon: mci("nintendo-switch", "#E60012"), color: "#E60012" },
  nintendo: { icon: mci("nintendo-switch", "#E60012"), color: "#E60012" },
  slack: { icon: ion("logo-slack", "#4A154B"), color: "#4A154B" },
  "discord nitro": { icon: ion("logo-discord", "#5865F2"), color: "#5865F2" },
  discord: { icon: ion("logo-discord", "#5865F2"), color: "#5865F2" },
  twitch: { icon: ion("logo-twitch", "#9146FF"), color: "#9146FF" },
  zoom: { icon: mci("video", "#2D8CFF"), color: "#2D8CFF" },
  trello: { icon: mci("trello", "#0052CC"), color: "#0052CC" },
  evernote: { icon: mci("evernote", "#00A82D"), color: "#00A82D" },
  "linkedin premium": { icon: ion("logo-linkedin", "#0A66C2"), color: "#0A66C2" },
  linkedin: { icon: ion("logo-linkedin", "#0A66C2"), color: "#0A66C2" },
  "x premium": { icon: ion("logo-x", "#000000"), color: "#000000" },
  twitter: { icon: ion("logo-twitter", "#1DA1F2"), color: "#1DA1F2" },
  instagram: { icon: ion("logo-instagram", "#E4405F"), color: "#E4405F" },
  facebook: { icon: ion("logo-facebook", "#1877F2"), color: "#1877F2" },
  whatsapp: { icon: ion("logo-whatsapp", "#25D366"), color: "#25D366" },
  "reddit premium": { icon: ion("logo-reddit", "#FF4500"), color: "#FF4500" },
  reddit: { icon: ion("logo-reddit", "#FF4500"), color: "#FF4500" },
  vimeo: { icon: ion("logo-vimeo", "#1AB7EA"), color: "#1AB7EA" },
  "soundcloud go": { icon: ion("logo-soundcloud", "#FF5500"), color: "#FF5500" },
  soundcloud: { icon: ion("logo-soundcloud", "#FF5500"), color: "#FF5500" },
  pandora: { icon: mci("pandora", "#005483"), color: "#005483" },
  patreon: { icon: mci("patreon", "#FF424D"), color: "#FF424D" },
  paypal: { icon: ion("logo-paypal", "#003087"), color: "#003087" },
  wordpress: { icon: ion("logo-wordpress", "#21759B"), color: "#21759B" },
  docker: { icon: ion("logo-docker", "#2496ED"), color: "#2496ED" },
  gitlab: { icon: mci("gitlab", "#FC6D26"), color: "#FC6D26" },
  bitbucket: { icon: mci("bitbucket", "#0052CC"), color: "#0052CC" },
  "amazon web services": { icon: mci("aws", "#FF9900"), color: "#FF9900" },
  aws: { icon: mci("aws", "#FF9900"), color: "#FF9900" },
  azure: { icon: mci("microsoft-azure", "#0078D4"), color: "#0078D4" },
  vercel: { icon: ion("logo-vercel", "#000000"), color: "#000000" },
  steam: { icon: ion("logo-steam", "#1B2838"), color: "#1B2838" },
  lastpass: { icon: mci("lastpass", "#D32D2F"), color: "#D32D2F" },
  "duolingo plus": { icon: mci("owl", "#58CC02"), color: "#58CC02" },
  duolingo: { icon: mci("owl", "#58CC02"), color: "#58CC02" },
  strava: { icon: mci("run", "#FC4C02"), color: "#FC4C02" },
  headspace: { icon: mci("meditation", "#FF6F61"), color: "#FF6F61" },
  calm: { icon: mci("weather-night", "#3E7CB1"), color: "#3E7CB1" },
  audible: { icon: mci("headphones", "#F8991C"), color: "#F8991C" },
  kindle: { icon: mci("book-open-page-variant", "#FF9900"), color: "#FF9900" },
};

// When nothing matches by name, fall back to a generic icon for the category.
const CATEGORY_FALLBACK: Record<string, IconMatch> = {
  Entertainment: { icon: mci("movie-open-outline", "#E50914"), color: "#E50914" },
  "AI Tools": { icon: mci("robot-outline", "#DA7756"), color: "#DA7756" },
  AI: { icon: mci("robot-outline", "#DA7756"), color: "#DA7756" },
  "Developer Tools": { icon: mci("code-tags", "#2188FF"), color: "#2188FF" },
  Developer: { icon: mci("code-tags", "#2188FF"), color: "#2188FF" },
  Design: { icon: mci("palette-outline", "#A259FF"), color: "#A259FF" },
  Productivity: { icon: mci("checkbox-marked-outline", "#37352F"), color: "#37352F" },
  Cloud: { icon: mci("cloud-outline", "#0EA5E9"), color: "#0EA5E9" },
  Music: { icon: mci("music-note-outline", "#1DB954"), color: "#1DB954" },
  Other: { icon: mci("wallet-outline", "#8fd1bd"), color: "#8fd1bd" },
};

const NAME_ENTRIES = [
  ...Object.entries(IMAGE_ICONS).map(([key, match]) => ({ key, match, priority: 1 })),
  ...Object.entries(VECTOR_ICONS).map(([key, match]) => ({ key, match, priority: 0 })),
].sort((a, b) => b.key.length - a.key.length || b.priority - a.priority);

function matchByName(name: string): IconMatch | null {
  const normalized = name.trim().toLowerCase();
  if (!normalized) return null;

  for (const entry of NAME_ENTRIES) {
    if (normalized.includes(entry.key)) return entry.match;
  }
  return null;
}

export function resolveSubscriptionIcon(name: string, category: string): IconMatch {
  return (
    matchByName(name) ?? CATEGORY_FALLBACK[category] ?? CATEGORY_FALLBACK.Other
  );
}
