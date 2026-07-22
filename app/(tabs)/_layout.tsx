import { colors, tabBar, tabs } from "@/constants/data";
import clsx from "clsx";
import { Image as ExpoImage } from "expo-image";
import { Tabs } from "expo-router";
import { styled } from "nativewind";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Image = styled(ExpoImage);

const TabLayout = () => {
    const insets = useSafeAreaInsets();
  const TabIcon = ({
    focused,
    icon,
  }: {
    focused: boolean;
    icon: any;
  }) => {
    return (
      <View className="tabs-icon">
        <View className={clsx("tabs-pill", focused && "tabs-active")}>
          <Image
            source={icon}
            contentFit="contain"
            className="tabs-glyph"
          />
        </View>
      </View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom:Math.max(insets.bottom,tabBar.horizontalInset),
          height: tabBar.height,
          marginHorizontal: tabBar.horizontalInset,
          borderRadius: tabBar.radius,
          backgroundColor: colors.primary,

        },
        tabBarItemStyle: {
          height: tabBar.height,
          paddingTop: 0,
          paddingBottom: 0,
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      {tabs.map((tab: (typeof tabs)[number]) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={tab.icon} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabLayout;