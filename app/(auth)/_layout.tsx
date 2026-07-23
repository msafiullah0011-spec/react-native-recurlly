import { Stack } from "expo-router";

import "@/global.css";

export const unstable_settings = {
  initialRouteName: "sign-in",
};

export default function AuthLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
