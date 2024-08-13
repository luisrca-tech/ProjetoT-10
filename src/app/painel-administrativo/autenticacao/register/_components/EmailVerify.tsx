import { useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import Input from "~/components/inputs/Input";
import Button from "~/components/widgets/Button";
import { api } from "~/trpc/react";
import { showToast } from "~/utils/functions/showToast";
import { FormContent } from "./style";

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
        const email = completeSignUp.emailAddress;

        if (!email) {
          throw new Error("Email or name was not provided");
        }

        await userMutation.mutateAsync({
          userId: completeSignUp.createdUserId,
          email: email,
        });
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        return showToast("error", `${error.errors[0]?.message}`);
      }

      toast.error("Something went wrong. Try again");
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
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        return toast.error(error.errors[0]?.message);
      }

      toast.error("Something went wrong. Try again");
    } finally {
      setIsLoadingResend(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormContent>
        <Input
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
