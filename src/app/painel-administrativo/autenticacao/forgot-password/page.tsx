"use client";
import { Container, Form } from "./styles";
import { type FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import ResetPassword from "./_components/ResetPassword";
import AuthenticationInput, {
  type InputProps,
  InputSchema,
} from "~/components/inputs/AuthenticationInput";
import Button from "~/components/widgets/Button";
import { roboto } from "~/assets/fonts/fonts";
import { showToast } from "~/utils/functions/showToast";

export default function ForgotPassword() {
  const {
    formState: { isSubmitted },
  } = useForm<InputProps>({
    resolver: zodResolver(InputSchema),
  });
  const [email, setEmail] = useState<string>("");
  const [verifyCode, setVerifyCode] = useState(false);
  const [isloading, setIsLoading] = useState(false);

  const { isLoaded, signIn } = useSignIn();

  if (!isLoaded) return null;

  async function handleBackupPassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLoading(true);
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
          "E-mail incorreto ou inexistente!",
          "Por favor, confirme se o e-mail fornecido esta correto e se ele existe."
        );
      }
      showToast("error", "Something went wrong, please try again");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container>
      {!verifyCode ? (
        <Form onSubmit={handleBackupPassword}>
          <p>Informe o e-mail referente a conta para recuperar a sua senha.</p>
          <AuthenticationInput
            label="E-MAIL"
            id="email"
            type="email"
            placeholder="email@exemplo.com"
            autoComplete="useremail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required={isSubmitted}
          />
          <Button
            className={roboto.className}
            type="submit"
            text="Confirmar"
            loading={isloading}
          />
        </Form>
      ) : (
        <ResetPassword />
      )}
    </Container>
  );
}
