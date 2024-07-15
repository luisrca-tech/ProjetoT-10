"use client";
import {
  Container,
  Form,
  ButtonText,
  ButtonsTextContainer,
  OthersRegisterContainer,
} from "./styles";
import { useRouter } from "next/navigation";
import Input, {
  InputProps,
  InputSchema,
} from "@/app/components/inputs/AuthenticationInput";
import Button from "@/app/components/widgets/Button";
import GoogleImage from "../../../../../public/google img.svg";
import LinkedinImage from "../../../../../public/linkedin img.svg";
import Image from "next/image";
import { roboto } from "@/app/fonts";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { toast } from "sonner";
import ResetPassword from "./_components/ResetPassword";

export default function ForgotPassword() {
  const {
    handleSubmit,
    formState: { isSubmitting, isSubmitted },
  } = useForm<InputProps>({
    resolver: zodResolver(InputSchema),
  });
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [verifyCode, setVerifyCode] = useState(false);
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
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
        return toast.error(error.errors[0]?.message);
      }
      toast.error("Something went wrong. Try again");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container>
      {!verifyCode ? (
        <Form onSubmit={handleBackupPassword}>
          <p>Informe seu e-mail para recuperação de senha.</p>
          <Input
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
