import "@/global.css";

import { HistoryRow } from "@/components/history-row";
import { WeeklyBarChart } from "@/components/weekly-bar-chart";
import {
  getMonthlyTotal,
  getWeekdaySpend,
  type Subscription,
} from "@/constants/subscriptions";
import { useSubscriptions } from "@/context/subscriptions-context";
import { formatMoney } from "@/utils/format";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ACCENT_COLOR = "#ea7a53";
const BASE_BAR_COLOR = "rgba(8, 17, 38, 0.85)";

export default function Insights() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { subscriptions } = useSubscriptions();

  const weekdaySpend = useMemo(() => getWeekdaySpend(subscriptions), [subscriptions]);
  const monthlyTotal = getMonthlyTotal(subscriptions);
  const currentMonthLabel = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const history = useMemo(
    () =>
      [...subscriptions].sort(
        (a, b) => new Date(b.startedOn).getTime() - new Date(a.startedOn).getTime(),
      ),
    [subscriptions],
  );

  return (
    <View className="flex-1 bg-background">
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: Subscription }) => <HistoryRow subscription={item} />}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: insets.top + 16,
          paddingBottom: 140,
        }}
        ListEmptyComponent={
          <Text className="home-empty-state">No subscription history yet.</Text>
        }
        ListHeaderComponent={
          <>
            <View className="insights-header">
              <Pressable
                className="insights-icon-button"
                onPress={() => router.canGoBack() && router.back()}
              >
                <Ionicons name="chevron-back" size={20} color="#081126" />
              </Pressable>
              <Text className="insights-header-title">Monthly Insights</Text>
              <Pressable className="insights-icon-button">
                <Ionicons name="ellipsis-horizontal" size={20} color="#081126" />
              </Pressable>
            </View>

            <View className="list-head">
              <Text className="list-title">Upcoming</Text>
              <Pressable className="list-action">
                <Text className="list-action-text">View all</Text>
              </Pressable>
            </View>

            <View className="chart-card">
              <WeeklyBarChart
                data={weekdaySpend}
                accentColor={ACCENT_COLOR}
                baseColor={BASE_BAR_COLOR}
              />
            </View>

            <View className="expenses-card">
              <View>
                <Text className="expenses-label">Expenses</Text>
                <Text className="expenses-subtext">{currentMonthLabel}</Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text className="expenses-amount">-{formatMoney(monthlyTotal)}</Text>
                <Text className="expenses-badge">{subscriptions.length} active</Text>
              </View>
            </View>

            <View className="list-head">
              <Text className="list-title">History</Text>
              <Pressable className="list-action">
                <Text className="list-action-text">View all</Text>
              </Pressable>
            </View>
          </>
        }
      />
    </View>
  );
}
