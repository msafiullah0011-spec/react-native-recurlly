import { SubscriptionIcon } from "@/components/subscription-icon";
import type { Subscription } from "@/constants/subscriptions";
import { withOpacity } from "@/utils/color";
import { formatDate, formatMoney } from "@/utils/format";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export function SubscriptionRow({ subscription }: { subscription: Subscription }) {
  return (
    <Link
      href={{
        pathname: "/subscriptions/[id]",
        params: { id: subscription.id },
      }}
      asChild
    >
      <Pressable
        className="sub-card"
        style={{ backgroundColor: withOpacity(subscription.color, 0.12) }}
      >
        <View className="sub-head">
          <View className="sub-main">
            <SubscriptionIcon icon={subscription.icon} size={64} rounded className="sub-icon" />
            <View className="sub-copy">
              <Text className="sub-title" numberOfLines={1}>
                {subscription.name}
              </Text>
              <Text className="sub-meta">
                {subscription.category} · {subscription.billingCycle}
              </Text>
            </View>
          </View>
          <View className="sub-price-box">
            <Text className="sub-price">{formatMoney(subscription.price)}</Text>
            <Text className="sub-billing">
              {formatDate(subscription.nextBillingDate)}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
