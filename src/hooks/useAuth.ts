"use client";

import { useSignIn, useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { useState } from "react";
import { toast } from "sonner";
import { type loginType } from "~/types/login.type";
import { type registerType } from "~/types/register.type";
import { showToast } from "~/utils/functions/showToast";

export function useAuth() {
  const [emailVerify, setEmailVerify] = useState(false);

  const { signIn, setActive } = useSignIn();
  const { signUp } = useSignUp();

  const signInWithGoogle = () =>
    signIn?.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/configuracao",
    });

  async function Login({ email, password }: loginType) {
    try {
      const result = await signIn?.create({
        identifier: email,
        password: password,
      });

      if (result?.status === "complete") {
        if (!setActive) {
          return null;
        }

        await setActive({ session: result.createdSessionId });
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        showToast(
          "error",
          "Usuário não encontrado",
          "Por favor, verifique se o e-mail digitado realmente está cadastrado em nosso sistema."
        );
      }
      toast.error("Something went wrong. Try again");
    }
  }

  async function Register({ email, password }: registerType) {
    try {
      await signUp?.create({
        emailAddress: email,
        password: password,
      });
      await signUp?.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      setEmailVerify(true);
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        return showToast(
          "error",
          "Email já cadastrado",
          "Este e-mail ja está cadastrado no nosso sistema, por favor, tente outro."
        );
      }
      toast.error("Something went wrong. Try again");
    }
  }

  return {
    Login,
    signInWithGoogle,
    Register,
    emailVerify,
  };
}
