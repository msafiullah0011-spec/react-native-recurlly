import { SubscriptionIcon } from "@/components/subscription-icon";
import type { Subscription } from "@/constants/subscriptions";
import { withOpacity } from "@/utils/color";
import { formatDate, formatMoney } from "@/utils/format";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export function HistoryRow({ subscription }: { subscription: Subscription }) {
  return (
    <Link
      href={{
        pathname: "/subscriptions/[id]",
        params: { id: subscription.id },
      }}
      asChild
    >
      <Pressable
        className="history-card"
        style={{ backgroundColor: withOpacity(subscription.color, 0.35) }}
      >
        <View className="history-main">
          <SubscriptionIcon icon={subscription.icon} size={48} rounded className="history-icon" />
          <View className="history-copy">
            <Text className="history-name" numberOfLines={1}>
              {subscription.name}
            </Text>
            <Text className="history-date">{formatDate(subscription.startedOn)}</Text>
          </View>
        </View>
        <View className="history-price-box">
          <Text className="history-price">{formatMoney(subscription.price)}</Text>
          <Text className="history-cycle">
            {subscription.billingCycle === "Yearly" ? "per year" : "per month"}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}
