import Button from "@/app/components/widgets/Button";
import Input, {
  InputProps,
  InputSchema,
} from "@/app/components/inputs/AuthenticationInput";
import { useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { FormContent } from "./style";

export default function EmailVerify() {
  const router = useRouter();

  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingResend, setIsLoadingResend] = useState(false);

  const { isLoaded, setActive, signUp } = useSignUp();

  if (!isLoaded) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        return toast.error(error.errors[0]?.message);
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
        <p>Um código de confirmação foi enviado para seu e-mail.</p>
        <Input
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
