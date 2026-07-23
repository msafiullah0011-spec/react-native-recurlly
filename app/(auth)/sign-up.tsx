import { Ionicons } from "@expo/vector-icons";
import { useSignUp } from "@clerk/clerk-expo";
import clsx from "clsx";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

type FieldErrors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

function validate(email: string, password: string, confirmPassword: string): FieldErrors {
  const errors: FieldErrors = {};

  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.email = "Enter a valid email address";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (!PASSWORD_REGEX.test(password)) {
    errors.password = "At least 8 characters, with a letter and a number";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Confirm your password";
  } else if (confirmPassword !== password) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}

const SignUp = () => {
  const { signUp, isLoaded } = useSignUp();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignUp = async () => {
    if (!isLoaded || isSubmitting) return;

    const validationErrors = validate(email, password, confirmPassword);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setFormError(null);
    setIsSubmitting(true);

    try {
      await signUp.create({
        emailAddress: email.trim(),
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      router.push({
        pathname: "/(auth)/verify-email",
        params: { email: email.trim() },
      });
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.longMessage ??
        err?.errors?.[0]?.message ??
        "Unable to create your account. Please try again.";
      setFormError(message);
    } finally {
      setIsSubmitting(false);
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

            <Text className="auth-title">Create your account</Text>
            <Text className="auth-subtitle">
              Track every subscription and never miss a renewal again
            </Text>
          </View>

          <View className="auth-card">
            <View className="auth-form">
              <View className="auth-field">
                <Text className="auth-label">Email</Text>
                <TextInput
                  className={clsx("auth-input", errors.email && "auth-input-error")}
                  placeholder="Enter your email"
                  placeholderTextColor="rgba(8,17,38,0.4)"
                  autoCapitalize="none"
                  autoComplete="email"
                  keyboardType="email-address"
                  value={email}
                  editable={!isSubmitting}
                  onChangeText={(value) => {
                    setEmail(value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                />
                {errors.email ? <Text className="auth-error">{errors.email}</Text> : null}
              </View>

              <View className="auth-field">
                <Text className="auth-label">Password</Text>
                <View className="relative justify-center">
                  <TextInput
                    className={clsx(
                      "auth-input pr-12",
                      errors.password && "auth-input-error",
                    )}
                    placeholder="Create a password"
                    placeholderTextColor="rgba(8,17,38,0.4)"
                    autoCapitalize="none"
                    secureTextEntry={!showPassword}
                    value={password}
                    editable={!isSubmitting}
                    onChangeText={(value) => {
                      setPassword(value);
                      if (errors.password)
                        setErrors((prev) => ({ ...prev, password: undefined }));
                    }}
                  />
                  <Pressable
                    className="absolute right-4"
                    onPress={() => setShowPassword((prev) => !prev)}
                    hitSlop={8}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off" : "eye"}
                      size={20}
                      color="rgba(8,17,38,0.5)"
                    />
                  </Pressable>
                </View>
                {errors.password ? (
                  <Text className="auth-error">{errors.password}</Text>
                ) : (
                  <Text className="auth-helper">
                    At least 8 characters, with a letter and a number
                  </Text>
                )}
              </View>

              <View className="auth-field">
                <Text className="auth-label">Confirm password</Text>
                <TextInput
                  className={clsx(
                    "auth-input",
                    errors.confirmPassword && "auth-input-error",
                  )}
                  placeholder="Re-enter your password"
                  placeholderTextColor="rgba(8,17,38,0.4)"
                  autoCapitalize="none"
                  secureTextEntry={!showPassword}
                  value={confirmPassword}
                  editable={!isSubmitting}
                  onChangeText={(value) => {
                    setConfirmPassword(value);
                    if (errors.confirmPassword)
                      setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                  }}
                />
                {errors.confirmPassword ? (
                  <Text className="auth-error">{errors.confirmPassword}</Text>
                ) : null}
              </View>

              {formError ? (
                <Text className="auth-error text-center">{formError}</Text>
              ) : null}

              <View nativeID="clerk-captcha" />

              <Pressable
                className={clsx("auth-button", isSubmitting && "auth-button-disabled")}
                onPress={handleSignUp}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#081126" />
                ) : (
                  <Text className="auth-button-text">Create account</Text>
                )}
              </Pressable>

              <Text className="auth-helper text-center">
                By continuing, you agree to Recurly&apos;s Terms of Service and
                Privacy Policy.
              </Text>
            </View>

            <View className="auth-link-row">
              <Text className="auth-link-copy">Already have an account?</Text>
              <Link href="/(auth)/sign-in" className="auth-link">
                Sign in
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUp;
