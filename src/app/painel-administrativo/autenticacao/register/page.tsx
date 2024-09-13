"use client";
import { useSignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { roboto } from "~/assets/fonts/fonts";
import Input from "~/components/inputs/Input";
import Button from "~/components/widgets/Button";
import ErrorMessage from "~/components/widgets/ErrorMessage";
import { useAuth } from "~/hooks/useAuth";
import { registerSchema } from "~/schemas/register.schema";
import type { registerType } from "~/types/register.type";
import EmailVerify from "./_components/EmailVerify";
import { Container, Form } from "./styles";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<registerType>({
    resolver: zodResolver(registerSchema),
  });
  const { Register, emailVerify } = useAuth();

  const { isLoaded } = useSignUp();

  if (!isLoaded) return null;

  async function handleRegister({ email, password }: registerType) {
    await Register({ email, password, confirmPassword: password });
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(handleRegister)}>
        <Input
          id="email"
          type="email"
          placeholder="Email@example.com"
          autoComplete="useremail"
          {...register("email")}
        />
        <ErrorMessage>
          {errors.email?.message && errors.email?.message}
        </ErrorMessage>
        <Input
          isPassword={true}
          id="password"
          type="password"
          placeholder="Senha"
          autoComplete="current-password"
          {...register("password")}
        />
        <ErrorMessage>
          {errors.password?.message && errors.password?.message}
        </ErrorMessage>
        <Input
          isPassword={true}
          id="confirmPassword"
          type="password"
          placeholder="Confirme sua senha"
          autoComplete="current-password"
          {...register("confirmPassword")}
        />
        <ErrorMessage>
          {errors.confirmPassword?.message && errors.confirmPassword?.message}
        </ErrorMessage>
        {!emailVerify && (
          <Button
            className={roboto.className}
            type="submit"
            text="Confirmar"
            loading={isSubmitting}
          />
        )}
      </Form>
      {emailVerify && <EmailVerify />}
    </Container>
  );
}
