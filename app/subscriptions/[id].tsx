import "@/global.css";

import { icons } from "@/constants/icons";
import { getSubscriptionById } from "@/constants/subscriptions";
import { formatDate, formatMoney } from "@/utils/format";
import { Link, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { usePostHog } from "posthog-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SubscriptionDetails() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const subscription = getSubscriptionById(id);
  const [cancelled, setCancelled] = useState(false);
  const posthog = usePostHog();

  useFocusEffect(
    useCallback(() => {
      posthog.capture("subscription_viewed", { subscription_id: id });
    }, [id, posthog]),
  );

  if (!subscription) {
    return (
      <View className="flex-1 items-center justify-center bg-background px-5">
        <Text className="sub-title">Subscription not found</Text>
        <Link href="/" className="mt-4">
          <Text className="auth-link">Go back home</Text>
        </Link>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: insets.top + 16, paddingBottom: 60 }}
      >
        <Link href="/" asChild>
          <Pressable className="mb-5 flex-row items-center gap-2">
            <Image source={icons.back} className="size-6" resizeMode="contain" />
            <Text className="sub-label">Back</Text>
          </Pressable>
        </Link>

        <View className="sub-card sub-card-expanded">
          <View className="sub-head">
            <View className="sub-main">
              <Image
                source={subscription.icon}
                className="sub-icon"
                resizeMode="contain"
              />
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
              <Text className="sub-price">
                {formatMoney(subscription.price)}
              </Text>
              <Text className="sub-billing">
                {formatDate(subscription.nextBillingDate)}
              </Text>
            </View>
          </View>

          <View className="sub-body">
            <View className="sub-details">
              <View className="sub-row">
                <View className="sub-row-copy">
                  <Text className="sub-label">Category</Text>
                </View>
                <Text className="sub-value">{subscription.category}</Text>
              </View>

              <View className="sub-row">
                <View className="sub-row-copy">
                  <Text className="sub-label">Billing Cycle</Text>
                </View>
                <Text className="sub-value">{subscription.billingCycle}</Text>
              </View>

              <View className="sub-row">
                <View className="sub-row-copy">
                  <Text className="sub-label">Next Payment</Text>
                </View>
                <Text className="sub-value">
                  {formatDate(subscription.nextBillingDate)}
                </Text>
              </View>

              <View className="sub-row">
                <View className="sub-row-copy">
                  <Text className="sub-label">Member Since</Text>
                </View>
                <Text className="sub-value">
                  {formatDate(subscription.startedOn)}
                </Text>
              </View>
            </View>

            <Pressable
              className={
                cancelled ? "sub-cancel sub-cancel-disabled" : "sub-cancel"
              }
              disabled={cancelled}
              onPress={() => setCancelled(true)}
            >
              <Text className="sub-cancel-text">
                {cancelled ? "Subscription Cancelled" : "Cancel Subscription"}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
