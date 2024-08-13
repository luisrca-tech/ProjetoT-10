"use client";
import { useSignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { roboto } from "~/assets/fonts/fonts";
import Input from "~/components/inputs/Input";
import Button from "~/components/widgets/Button";
import ErrorMessage from "~/components/widgets/ErrorMessage";
import { useAuth } from "~/hooks/useAuth";
import { authSchema } from "~/schemas/auth.schema";
import { type authType } from "~/types/auth.type";
import { AuthActions } from "../login/styles";
import EmailVerify from "./_components/EmailVerify";
import { Container, Form, OthersRegisterContainer } from "./styles";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<authType>({
    resolver: zodResolver(authSchema),
  });
  const { Register, emailVerify, signUpWith } = useAuth();

  const { isLoaded } = useSignUp();

  if (!isLoaded) return null;

  async function handleRegister({ email, password }: authType) {
    await Register({ email, password });
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(handleRegister)}>
        <Input
          id="email"
          type="email"
          placeholder="Insira seu e-mail..."
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
          placeholder="Cadastre sua senha..."
          autoComplete="current-password"
          {...register("password")}
        />
        <ErrorMessage>
          {errors.password?.message && errors.password?.message}
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
      {emailVerify ? (
        <EmailVerify />
      ) : (
        <OthersRegisterContainer>
          <div>
            <span className={roboto.className}>
              Cadastre-se com o{" "}
              <AuthActions onClick={() => signUpWith()}>google</AuthActions>
            </span>
          </div>
        </OthersRegisterContainer>
      )}
    </Container>
  );
}
