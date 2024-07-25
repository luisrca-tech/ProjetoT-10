"use client";

import {
  Container,
  Form,
  ButtonText,
  ButtonsTextContainer,
  AlternativesLoginsContainer,
  OtherOptionsContainer,
  AuthActions,
} from "./styles";
import GoogleImage from "/public/images/google img.svg";
import LinkedinImage from "/public/images/linkedin img.svg";
import Image from "next/image";
import { type FormEvent, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { toast } from "sonner";
import AuthenticationInput, {
  type InputProps,
  InputSchema,
} from "~/components/inputs/AuthenticationInput";
import Button from "~/components/widgets/Button";
import { roboto } from "~/assets/fonts/fonts";

export default function Login() {
  const {
    formState: { isSubmitted },
  } = useForm<InputProps>({
    resolver: zodResolver(InputSchema),
  });

  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isloading, setIsLoading] = useState(false);

  const { isLoaded, signIn, setActive } = useSignIn();

  if (!isLoaded) return null;

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLoading(true);

    try {
      const result = await signIn?.create({
        identifier: email,
        password,
      });

      if (result?.status === "complete") {
        if (!setActive) {
          return null;
        }

        await setActive({ session: result.createdSessionId });
        router.push("/painel-administrativo/projetos");
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        return toast.error(error.errors[0]?.message);
      }
      toast.error("Something went wrong. Try again");
    } finally {
      setIsLoading(false);
    }
  }

  const signInWith = () => {
    return signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/painel-administrativo/projetos",
      redirectUrlComplete: "/",
    });
  };

  return (
    <Container>
      <Form onSubmit={handleLogin}>
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
          loading={isloading}
          text="Entrar"
          type="submit"
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
        </OtherOptionsContainer>
      </Form>
      <AlternativesLoginsContainer>
        <div>
          <span className={roboto.className}>Entre com sua conta</span>
        </div>

        <div>
          <AuthActions onClick={() => signInWith()}>
            <Image src={GoogleImage} alt="" width={50} height={50} priority />
          </AuthActions>
          <AuthActions>
            <Image src={LinkedinImage} alt="" width={50} height={50} priority />
          </AuthActions>
        </div>
      </AlternativesLoginsContainer>
    </Container>
  );
}
