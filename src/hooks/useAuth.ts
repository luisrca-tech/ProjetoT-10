"use client";

import { useSession, useSignIn, useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import router from "next/router";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "~/trpc/react";
import { type authType } from "~/types/auth.type";
import { showToast } from "~/utils/functions/showToast";

export function useAuth() {
  const [emailVerify, setEmailVerify] = useState(false);
  const { session } = useSession();

  const checkUserMutation = api.user.checkUser.useMutation();
  const userMutation = api.user.create.useMutation();

  const { signIn, setActive } = useSignIn();
  const { signUp } = useSignUp();

  async function Login({ email, password }: authType) {
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
        router.push("/painel-administrativo/projetos");
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

  const signInWith = () => {
    return signIn?.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/painel-administrativo/projetos",
      redirectUrlComplete: "/",
    });
  };

  async function Register({ email, password }: authType) {
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

  const createOauthGoogleUser = async () => {
    const user = session?.user;

    const userId = user?.id;

    const email = user?.emailAddresses[0]?.emailAddress;

    if (!email || !userId) {
      showToast("error", "Usuário não encontrado no nosso banco de dados.");
      return;
    }

    try {
      const checkUserResponse = await checkUserMutation.mutateAsync({
        userId: userId,
      });

      if (!checkUserResponse.exists) {
        await userMutation.mutate({
          userId: userId,
          email: email,
        });
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        return showToast("error", `${error.errors[0]?.message}`);
      }
      showToast(`error`, "Something went wrong. Try again");
    } 
  };

  const signUpWith = async () => {
    return signUp?.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/painel-administrativo/projetos",
      redirectUrlComplete: "/",
    });
  };

  return {
    Login,
    signInWith,
    Register,
    signUpWith,
    emailVerify,
    createOauthGoogleUser,
  };
}
