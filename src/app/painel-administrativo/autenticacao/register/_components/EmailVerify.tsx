import { useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { FormContent } from "./style";
import AuthenticationInput from "~/components/inputs/AuthenticationInput";
import Button from "~/components/widgets/Button";
import { api } from "~/trpc/react";
import { showToast } from "~/utils/functions/showToast";

export default function EmailVerify() {
  const router = useRouter();

  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingResend, setIsLoadingResend] = useState(false);
  const userMutation = api.user.create.useMutation();

  const { isLoaded, setActive, signUp } = useSignUp();

  if (!isLoaded) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (!completeSignUp.createdUserId) {
        throw new Error("Id was not provided");
      }

      if (completeSignUp.status === "complete") {
        await userMutation.mutateAsync({
          userId: completeSignUp.createdUserId,
        });
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
        showToast("success", "Úsuario cadastrado com sucesso!");
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        return showToast(
          "error",
          "Não conseguimos validar seu cadastro, tente novamente!"
        );
      }

      showToast("error", "Something went wrong, try again!");
    } finally {
      setIsLoading(false);
    }
  };

  const resendCode = async () => {
    setIsLoadingResend(true);
    try {
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      showToast("success", "Um código foi enviado para seu email!");
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        return showToast(
          "warning",
          "Não conseguimos fazer o envio do código, por favor tente novamente!"
        );
      }

      showToast("error", "Something went wrong, try again!");
    } finally {
      setIsLoadingResend(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormContent>
        <AuthenticationInput
          label="Um código de confirmação foi enviado para seu e-mail."
          type="text"
          placeholder="Informe seu código"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button
          onClick={resendCode}
          type="button"
          text="Reenviar código"
          loading={isLoadingResend}
        />
        <Button type="submit" text="Confirmar" loading={isLoading} />
      </FormContent>
    </form>
  );
}
