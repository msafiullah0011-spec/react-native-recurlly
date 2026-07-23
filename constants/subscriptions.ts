import { icons } from "./icons";
import type { SubscriptionIconType } from "./subscription-icon";

export type BillingCycle = "Monthly" | "Yearly";

export type Subscription = {
  id: string;
  name: string;
  icon: SubscriptionIconType;
  color: string;
  price: number;
  billingCycle: BillingCycle;
  category: string;
  nextBillingDate: string;
  startedOn: string;
};

function image(source: (typeof icons)[keyof typeof icons]): SubscriptionIconType {
  return { kind: "image", source };
}

export const subscriptions: Subscription[] = [
  {
    id: "netflix",
    name: "Netflix",
    icon: image(icons.netflix),
    color: "#E50914",
    price: 15.49,
    billingCycle: "Monthly",
    category: "Entertainment",
    nextBillingDate: "2026-07-24",
    startedOn: "2024-03-12",
  },
  {
    id: "spotify",
    name: "Spotify",
    icon: image(icons.spotify),
    color: "#1DB954",
    price: 9.99,
    billingCycle: "Monthly",
    category: "Music",
    nextBillingDate: "2026-07-27",
    startedOn: "2023-11-02",
  },
  {
    id: "claude",
    name: "Claude Max",
    icon: image(icons.claude),
    color: "#DA7756",
    price: 100,
    billingCycle: "Monthly",
    category: "AI",
    nextBillingDate: "2026-07-30",
    startedOn: "2025-09-18",
  },
  {
    id: "figma",
    name: "Figma",
    icon: image(icons.figma),
    color: "#A259FF",
    price: 12,
    billingCycle: "Monthly",
    category: "Design",
    nextBillingDate: "2026-08-03",
    startedOn: "2024-01-22",
  },
  {
    id: "adobe",
    name: "Adobe Creative Cloud",
    icon: image(icons.adobe),
    color: "#FA0F00",
    price: 54.99,
    billingCycle: "Monthly",
    category: "Design",
    nextBillingDate: "2026-08-06",
    startedOn: "2022-06-30",
  },
  {
    id: "notion",
    name: "Notion",
    icon: image(icons.notion),
    color: "#37352F",
    price: 96,
    billingCycle: "Yearly",
    category: "Productivity",
    nextBillingDate: "2027-02-14",
    startedOn: "2024-02-14",
  },
  {
    id: "github",
    name: "GitHub",
    icon: image(icons.github),
    color: "#2188FF",
    price: 4,
    billingCycle: "Monthly",
    category: "Developer",
    nextBillingDate: "2026-08-09",
    startedOn: "2021-08-09",
  },
];

export function getSubscriptionById(id: string) {
  return subscriptions.find((subscription) => subscription.id === id);
}

export function getUpcomingSubscriptions(list: Subscription[] = subscriptions, limit = 4) {
  return [...list]
    .sort(
      (a, b) =>
        new Date(a.nextBillingDate).getTime() -
        new Date(b.nextBillingDate).getTime(),
    )
    .slice(0, limit);
}

export function getMonthlyTotal(list: Subscription[] = subscriptions) {
  return list.reduce(
    (total, subscription) =>
      total +
      (subscription.billingCycle === "Yearly"
        ? subscription.price / 12
        : subscription.price),
    0,
  );
}
