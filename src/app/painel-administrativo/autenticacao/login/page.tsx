"use client";
import {
  Container,
  Form,
  ButtonText,
  ButtonsTextContainer,
  AlternativesLoginsContainer,
  OtherOptionsContainer,
} from "./styles";
import {
  InputProps,
  InputSchema,
} from "@/app/components/inputs/AuthenticationInput";
import Button from "@/app/components/widgets/Button";
import GoogleImage from "../../../../../public/google img.svg";
import LinkedinImage from "../../../../../public/linkedin img.svg";
import Image from "next/image";
import { roboto } from "@/app/fonts";
import { useState } from "react";
import Link from "next/link";
import AuthenticationInput from "@/app/components/inputs/AuthenticationInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Login() {
  const {
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<InputProps>({
    resolver: zodResolver(InputSchema),
  });

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: SubmitEvent) {
    e.preventDefault();

    setLoading(isSubmitting && !loading);
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(() => handleLogin)}>
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
        <AuthenticationInput
          label="Password"
          isPassword={true}
          id="password"
          type="password"
          placeholder="senha"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required={isSubmitted}
        />
        <Button
          className={roboto.className}
          type="submit"
          text="Entrar"
          loading={loading}
        />

        <OtherOptionsContainer>
          <ButtonsTextContainer>
            <ButtonText className={roboto.className}>
              <Link href={"/painel-administrativo/autenticacao/register"}>
                {" "}
                Não tenho conta
              </Link>
            </ButtonText>

            <ButtonText className={roboto.className}>
              <Link
                href={"/painel-administrativo/autenticacao/forgot-password"}
              >
                Esqueci minha senha
              </Link>
            </ButtonText>
          </ButtonsTextContainer>

          <AlternativesLoginsContainer>
            <div>
              <span className={roboto.className}>Entre com sua conta</span>
            </div>

            <div>
              <Image src={GoogleImage} alt="" width={50} height={50} priority />
              <Image
                src={LinkedinImage}
                alt=""
                width={50}
                height={50}
                priority
              />
            </div>
          </AlternativesLoginsContainer>
        </OtherOptionsContainer>
      </Form>
    </Container>
  );
}
