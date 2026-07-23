import AsyncStorage from '@react-native-async-storage/async-storage'
import PostHog from 'posthog-react-native'
import { Platform } from 'react-native'

const projectToken = process.env.EXPO_PUBLIC_POSTHOG_PROJECT_TOKEN
const host = process.env.EXPO_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com'
const isPostHogConfigured = !!projectToken

if (__DEV__ && !isPostHogConfigured) {
  console.error(
    'EXPO_PUBLIC_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, ' +
      'this causes events to be silently missed. ' +
      'This error stops appearing once EXPO_PUBLIC_POSTHOG_PROJECT_TOKEN is configured',
  )
}

// expo-router statically pre-renders web routes in Node (`web.output: "static"` in
// app.json), where there is no `document`/localStorage. The PostHog RN client touches
// AsyncStorage synchronously in its constructor regardless of the `disabled` option,
// which crashes in that environment, so the real client must never be constructed there.
const isStaticRenderingPass = Platform.OS === 'web' && typeof document === 'undefined'

class NoopPostHog {
  identify() {}
  capture() {}
  reset() {}
  screen() {}
  captureException() {}
}

export const posthog = isStaticRenderingPass
  ? (new NoopPostHog() as unknown as PostHog)
  : new PostHog(projectToken ?? 'placeholder_key', {
      host,
      disabled: !isPostHogConfigured,
      captureNativeAppLifecycleEvents: true,
      flushAt: 20,
      flushInterval: 10000,
      preloadFeatureFlags: true,
      // posthog-react-native defaults to expo-file-system's legacy string API for
      // persistence when it's resolvable, which Expo SDK 54 always throws on from
      // the main entrypoint (must go through "expo-file-system/legacy" instead).
      // Forcing AsyncStorage sidesteps that broken path entirely.
      customStorage: AsyncStorage,
    })

if (!isStaticRenderingPass) {
  const previousHandler = ErrorUtils.getGlobalHandler()
  ErrorUtils.setGlobalHandler((error, isFatal) => {
    posthog.captureException(error, { fatal: !!isFatal })
    previousHandler(error, isFatal)
  })
}
