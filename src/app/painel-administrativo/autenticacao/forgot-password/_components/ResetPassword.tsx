import { useSignIn } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { FormContent } from "./styles";
import Button from "~/components/widgets/Button";
import AuthenticationInput from "~/components/inputs/AuthenticationInput";
import { showToast } from "~/utils/functions/showToast";

export default function ResetPassword() {
  const router = useRouter();

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingResend, setIsLoadingResend] = useState(false);

  const { isLoaded, setActive, signIn } = useSignIn();

  if (!isLoaded) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const completeSignUp = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
        showToast("success", "Senha alterada com sucesso!");
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        return showToast(
          "error",
          "A senha ou o código de verificação estão incorretos",
          "Por favor, confirme se você está preenchendo todos os campos!"
        );
      }
      toast.error("Something went wrong. Try again");
    } finally {
      setIsLoading(false);
    }
  };

  const resendCode = async () => {
    setIsLoadingResend(true);
    try {
      await signIn.attemptFirstFactor({
        strategy: "email_code",
        code,
      });
      showToast("success", "Úm código foi enviado para o seu e-mail!");
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        return showToast(
          "error",
          "Um código ja foi enviado para o seu e-mail!",
          "Por favor, confira a caixa de entrada do seu e-mail."
        );
      }

      showToast("error", "Something went wrong. Please try again");
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
          value={code}
          placeholder="Informe seu código"
          onChange={(e) => setCode(e.target.value)}
        />
        <AuthenticationInput
          label="Informe sua nova senha"
          placeholder="********"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <Button
            onClick={resendCode}
            type="button"
            text="Reenviar código"
            loading={isLoadingResend}
          />
          <Button
            type="submit"
            text="Confirmar nova senha"
            loading={isLoading}
          />
        </div>
      </FormContent>
    </form>
  );
}
