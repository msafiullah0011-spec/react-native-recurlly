import { Ionicons } from "@expo/vector-icons";
import { useSignUp } from "@clerk/clerk-expo";
import clsx from "clsx";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const RESEND_COOLDOWN_SECONDS = 30;

const VerifyEmail = () => {
  const { signUp, isLoaded, setActive } = useSignUp();
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email?: string }>();
  const insets = useSafeAreaInsets();

  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (isLoaded && !signUp?.emailAddress) {
      router.replace("/(auth)/sign-up");
    }
  }, [isLoaded, signUp?.emailAddress, router]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleVerify = async () => {
    if (!isLoaded || isSubmitting) return;

    if (code.trim().length < 6) {
      setError("Enter the 6-digit code we sent you");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: code.trim(),
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
      } else {
        setError("That code didn't work. Please try again.");
      }
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.longMessage ??
        err?.errors?.[0]?.message ??
        "That code didn't work. Please try again.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (!isLoaded || isResending || cooldown > 0) return;

    setIsResending(true);
    setError(null);

    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setCooldown(RESEND_COOLDOWN_SECONDS);
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.longMessage ??
        err?.errors?.[0]?.message ??
        "Unable to resend the code. Please try again.";
      setError(message);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <View className="auth-safe-area" style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <KeyboardAvoidingView
        className="auth-screen"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          className="auth-scroll"
          contentContainerClassName="auth-content"
          keyboardShouldPersistTaps="handled"
        >
          <View className="auth-top-bar">
            <Pressable
              className="auth-back-button"
              onPress={() => router.back()}
              hitSlop={8}
            >
              <Ionicons name="chevron-back" size={20} color="#081126" />
            </Pressable>
          </View>

          <View className="auth-brand-block">
            <View className="auth-logo-wrap">
              <View className="auth-logo-mark">
                <Text className="auth-logo-mark-text">R</Text>
              </View>
              <View>
                <Text className="auth-wordmark">Recurly</Text>
                <Text className="auth-wordmark-sub">Smart Billing</Text>
              </View>
            </View>

            <Text className="auth-title">Check your email</Text>
            <Text className="auth-subtitle">
              Enter the 6-digit code we sent to{" "}
              {email ?? signUp?.emailAddress ?? "your email"}
            </Text>
          </View>

          <View className="auth-card">
            <View className="auth-form">
              <View className="auth-field">
                <Text className="auth-label">Verification code</Text>
                <TextInput
                  className={clsx("auth-otp-input", error && "auth-input-error")}
                  style={{ letterSpacing: 10, textAlign: "center" }}
                  placeholder="000000"
                  placeholderTextColor="rgba(8,17,38,0.3)"
                  keyboardType="number-pad"
                  maxLength={6}
                  value={code}
                  editable={!isSubmitting}
                  onChangeText={(value) => {
                    setCode(value.replace(/[^0-9]/g, ""));
                    if (error) setError(null);
                  }}
                />
                {error ? <Text className="auth-error text-center">{error}</Text> : null}
              </View>

              <Pressable
                className={clsx("auth-button", isSubmitting && "auth-button-disabled")}
                onPress={handleVerify}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#081126" />
                ) : (
                  <Text className="auth-button-text">Verify email</Text>
                )}
              </Pressable>
            </View>

            <View className="auth-resend-row">
              <Text className="auth-link-copy">Didn&apos;t get the code?</Text>
              <Pressable onPress={handleResend} disabled={isResending || cooldown > 0}>
                <Text className={clsx("auth-link", (isResending || cooldown > 0) && "opacity-45")}>
                  {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default VerifyEmail;
