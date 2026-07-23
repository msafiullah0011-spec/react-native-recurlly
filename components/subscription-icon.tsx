import type { SubscriptionIconType } from "@/constants/subscription-icon";
import { withOpacity } from "@/utils/color";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, View } from "react-native";

type SubscriptionIconProps = {
  icon: SubscriptionIconType;
  size: number;
  rounded?: boolean;
  className?: string;
};

export function SubscriptionIcon({
  icon,
  size,
  rounded = false,
  className,
}: SubscriptionIconProps) {
  if (icon.kind === "image") {
    return (
      <Image
        source={icon.source}
        className={className}
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
    );
  }

  const glyphSize = Math.round(size * 0.52);
  const IconComponent = icon.set === "ionicons" ? Ionicons : MaterialCommunityIcons;

  return (
    <View
      className={className}
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: withOpacity(icon.color, 0.15),
        borderRadius: rounded ? 12 : 0,
      }}
    >
      <IconComponent name={icon.name as never} size={glyphSize} color={icon.color} />
    </View>
  );
}
