import { useAuth } from "@clerk/clerk-expo";
import { usePostHog } from "posthog-react-native";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Settings = () => {
  const { signOut } = useAuth();
  const posthog = usePostHog();
  const insets = useSafeAreaInsets();

  const handleSignOut = async () => {
    await signOut();
    posthog.capture("user_signed_out");
    posthog.reset();
  };

  return (
    <View
      className="flex-1 bg-background px-5"
      style={{ paddingTop: insets.top + 16, paddingBottom: insets.bottom }}
    >
      <Text className="list-title">Settings</Text>

      <Pressable className="sub-cancel mt-6" onPress={handleSignOut}>
        <Text className="sub-cancel-text">Sign Out</Text>
      </Pressable>
    </View>
  );
};

export default Settings;
