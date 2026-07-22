import "@/global.css";

import { SubscriptionRow } from "@/components/subscription-row";
import { subscriptions, type Subscription } from "@/constants/subscriptions";
import { useMemo, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ALL = "All";

export default function Subscriptions() {
  const insets = useSafeAreaInsets();
  const categories = useMemo(
    () => [ALL, ...Array.from(new Set(subscriptions.map((s) => s.category)))],
    [],
  );
  const [category, setCategory] = useState(ALL);

  const filtered =
    category === ALL
      ? subscriptions
      : subscriptions.filter((s) => s.category === category);

  return (
    <View className="flex-1 bg-background">
      <FlatList
        data={filtered}
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
          <Text className="home-empty-state">
            No subscriptions in this category.
          </Text>
        }
        ListHeaderComponent={
          <>
            <View className="list-head">
              <Text className="list-title">Subscriptions</Text>
            </View>

            <View className="category-scroll">
              {categories.map((cat) => {
                const active = cat === category;
                return (
                  <Pressable
                    key={cat}
                    onPress={() => setCategory(cat)}
                    className={
                      active
                        ? "category-chip category-chip-active"
                        : "category-chip"
                    }
                  >
                    <Text
                      className={
                        active
                          ? "category-chip-text category-chip-text-active"
                          : "category-chip-text"
                      }
                    >
                      {cat}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <View className="mt-5" />
          </>
        }
      />
    </View>
  );
}
