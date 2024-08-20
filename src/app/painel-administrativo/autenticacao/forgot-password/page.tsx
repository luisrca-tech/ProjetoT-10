"use client";
import { useSignIn } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { roboto } from "~/assets/fonts/fonts";
import Input from "~/components/inputs/Input";
import Button from "~/components/widgets/Button";
import ErrorMessage from "~/components/widgets/ErrorMessage";
import { confirmEmailSchema } from "~/schemas/forgot-password.schema";
import { type confirmEmail } from "~/types/forgot-password.type";
import { showToast } from "~/utils/functions/showToast";
import ResetPassword from "./_components/ResetPassword";
import { Container, Form } from "./styles";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<confirmEmail>({
    resolver: zodResolver(confirmEmailSchema),
  });
  const [verifyCode, setVerifyCode] = useState(false);

  const { isLoaded, signIn } = useSignIn();

  if (!isLoaded) return null;

  async function handleEmailSubmit({ email }: confirmEmail) {
    try {
      await signIn?.create({
        identifier: email,
        strategy: "reset_password_email_code",
      });

      setVerifyCode(true);
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        return showToast(
          "error",
          "úsuario não encontrado",
          "Por favor, verifique se o e-mail digitado realmente esta cadastrado em nosso sistema."
        );
      }
      toast.error("Something went wrong. Try again");
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(handleEmailSubmit)}>
        <p>Informe seu e-mail para recuperação de senha.</p>
        <Input
          label="E-MAIL"
          id="email"
          type="email"
          placeholder="Email@exemplo.com"
          autoComplete="useremail"
          {...register("email")}
        />
        <ErrorMessage>
          {errors.email?.message && errors.email?.message}
        </ErrorMessage>
        {!verifyCode && (
          <Button
            className={roboto.className}
            type="submit"
            text="Confirmar"
            loading={isSubmitting}
          />
        )}
      </Form>
      {verifyCode && <ResetPassword />}
    </Container>
  );
}
