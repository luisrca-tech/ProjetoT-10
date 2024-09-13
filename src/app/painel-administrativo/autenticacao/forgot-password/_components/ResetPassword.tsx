import { useSignIn } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Input from "~/components/inputs/Input";
import Button from "~/components/widgets/Button";
import ErrorMessage from "~/components/widgets/ErrorMessage";
import { backupPasswordSchema } from "~/schemas/forgot-password.schema";
import { type backupPassword } from "~/types/forgot-password.type";
import { showToast } from "~/utils/functions/showToast";
import { FormContainer } from "../../register/_components/style";

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<backupPassword>({
    resolver: zodResolver(backupPasswordSchema),
  });

  const router = useRouter();

  const [code, setCode] = useState("");
  const [isLoadingResend, setIsLoadingResend] = useState(false);

  const { isLoaded, setActive, signIn } = useSignIn();

  if (!isLoaded) return null;

  const handleBackupPassword = async ({ password }: backupPassword) => {
    try {
      const completeSignUp = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        return showToast(
          "error",
          "Código inválido",
          "Por favor, verifique se o código digitado está correto."
        );
      }
      toast.error("Something went wrong. Try again");
    } finally {
      reset();
    }
  };

  const resendCode = async () => {
    setIsLoadingResend(true);
    try {
      await signIn.attemptFirstFactor({
        strategy: "email_code",
        code,
      });
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        return showToast(
          "error",
          "Código ja foi enviado",
          "Dê uma olhada no seu e-mail para pegar o código de confirmação"
        );
      }

      toast.error("Something went wrong. Try again");
    } finally {
      setIsLoadingResend(false);
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit(handleBackupPassword)}>
        <Input placeholder="Senha" type="password" {...register("password")} />
        <ErrorMessage>
          {errors.password?.message && errors.password?.message}
        </ErrorMessage>
        <Input
          type="text"
          value={code}
          placeholder="Código"
          onChange={(e) => setCode(e.target.value)}
        />
        <Button
          onClick={resendCode}
          type="button"
          text="Reenviar código"
          loading={isLoadingResend}
        />
        <Button
          type="submit"
          text="Confirmar nova senha"
          loading={isSubmitting}
        />
      </form>
    </FormContainer>
  );
}
