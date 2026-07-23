import { Stack } from "expo-router";
import { PostHogProvider } from 'posthog-react-native';
import { posthog } from '@/lib/posthog';

import '@/global.css';
export default function RootLayout() {
  return (
    <PostHogProvider client={posthog} autocapture>
      <Stack screenOptions={{ headerShown: false }} />
    </PostHogProvider>
  );
}
