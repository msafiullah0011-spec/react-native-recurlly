import "@/global.css";

import { SubscriptionRow } from "@/components/subscription-row";
import { icons } from "@/constants/icons";
import {
  getMonthlyTotal,
  getUpcomingSubscriptions,
  subscriptions,
  type Subscription,
} from "@/constants/subscriptions";
import { formatDate, formatMoney } from "@/utils/format";
import { Link } from "expo-router";
import { FlatList, Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Home() {
  const insets = useSafeAreaInsets();
  const monthlyTotal = getMonthlyTotal();
  const upcoming = getUpcomingSubscriptions();
  const nextPayment = upcoming[0];

  return (
    <View className="flex-1 bg-background">
      <FlatList
        data={subscriptions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: Subscription }) => (
          <SubscriptionRow subscription={item} />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: insets.top + 16,
          paddingBottom: 140,
        }}
        ListEmptyComponent={
          <Text className="home-empty-state">No subscriptions yet.</Text>
        }
        ListHeaderComponent={
          <>
            <View className="home-header">
              <View className="home-user">
                <Image
                  source={require("@/assets/images/avatar.png")}
                  className="home-avatar"
                  resizeMode="cover"
                />
                <Text className="home-user-name">Welcome back</Text>
              </View>
              <Pressable>
                <Image
                  source={icons.add}
                  className="home-add-icon"
                  resizeMode="contain"
                />
              </Pressable>
            </View>

            <View className="home-balance-card">
              <Text className="home-balance-label">Monthly Spend</Text>
              <View className="home-balance-row">
                <Text className="home-balance-amount">
                  {formatMoney(monthlyTotal)}
                </Text>
              </View>
              {nextPayment ? (
                <Text className="home-balance-date">
                  Next payment {formatDate(nextPayment.nextBillingDate)} ·{" "}
                  {nextPayment.name}
                </Text>
              ) : null}
            </View>

            <View className="list-head">
              <Text className="list-title">Upcoming</Text>
              <Pressable className="list-action">
                <Text className="list-action-text">See All</Text>
              </Pressable>
            </View>

            {upcoming.length > 0 ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {upcoming.map((subscription) => (
                  <Link
                    key={subscription.id}
                    href={{
                      pathname: "/subscriptions/[id]",
                      params: { id: subscription.id },
                    }}
                    asChild
                  >
                    <Pressable className="upcoming-card">
                      <View className="upcoming-row">
                        <Image
                          source={subscription.icon}
                          className="upcoming-icon"
                          resizeMode="contain"
                        />
                        <View>
                          <Text className="upcoming-price">
                            {formatMoney(subscription.price)}
                          </Text>
                          <Text className="upcoming-meta">
                            {formatDate(subscription.nextBillingDate)}
                          </Text>
                        </View>
                      </View>
                      <Text className="upcoming-name" numberOfLines={1}>
                        {subscription.name}
                      </Text>
                    </Pressable>
                  </Link>
                ))}
              </ScrollView>
            ) : (
              <Text className="home-empty-state">No upcoming payments.</Text>
            )}

            <View className="list-head">
              <Text className="list-title">All Subscriptions</Text>
            </View>
          </>
        }
      />
    </View>
  );
}
