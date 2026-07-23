import { subscriptions as initialSubscriptions, type Subscription } from "@/constants/subscriptions";
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type SubscriptionsContextValue = {
  subscriptions: Subscription[];
  addSubscription: (subscription: Subscription) => void;
};

const SubscriptionsContext = createContext<SubscriptionsContextValue | null>(null);

export function SubscriptionsProvider({ children }: { children: ReactNode }) {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(initialSubscriptions);

  const value = useMemo<SubscriptionsContextValue>(
    () => ({
      subscriptions,
      addSubscription: (subscription) =>
        setSubscriptions((prev) => [subscription, ...prev]),
    }),
    [subscriptions],
  );

  return (
    <SubscriptionsContext.Provider value={value}>{children}</SubscriptionsContext.Provider>
  );
}

export function useSubscriptions() {
  const context = useContext(SubscriptionsContext);
  if (!context) {
    throw new Error("useSubscriptions must be used within a SubscriptionsProvider");
  }
  return context;
}
