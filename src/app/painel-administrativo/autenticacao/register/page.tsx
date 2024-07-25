"use client";
import { Container, Form, OthersRegisterContainer } from "./styles";
import GoogleImage from "../../../../../public/google img.svg";
import LinkedinImage from "../../../../../public/linkedin img.svg";
import Image from "next/image";
import { type FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { toast } from "sonner";
import EmailVerify from "./_components/EmailVerify";
import AuthenticationInput, {
  type InputProps,
  InputSchema,
} from "~/components/inputs/AuthenticationInput";
import Button from "~/components/widgets/Button";
import { roboto } from "~/assets/fonts/fonts";

export default function Register() {
  const {
    formState: { isSubmitted },
  } = useForm<InputProps>({
    resolver: zodResolver(InputSchema),
  });

  const [email, setEmail] = useState<string>("");
  const [emailVerify, setEmailVerify] = useState(false);
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const { isLoaded, signUp } = useSignUp();

  if (!isLoaded) return null;

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLoading(true);
    try {
      await signUp?.create({
        emailAddress: email,
        password,
      });
      await signUp?.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      setEmailVerify(true);
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        return toast.error(error.errors[0]?.message);
      }
      toast.error("Something went wrong. Try again");
    } finally {
      setIsLoading(false);
    }
  }

  const signUpWith = () => {
    return signUp.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/painel-administrativo/projetos",
      redirectUrlComplete: "/",
    });
  };

  return (
    <Container>
      {!emailVerify ? (
        <Form onSubmit={handleRegister}>
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
            text="Confirmar"
            loading={isLoading}
          />

          <OthersRegisterContainer>
            <div>
              <span className={roboto.className}>Entre com sua conta</span>
            </div>

            <div>
              <Image
                onClick={() => signUpWith()}
                src={GoogleImage}
                alt=""
                width={50}
                height={50}
              />
              <Image src={LinkedinImage} alt="" width={50} height={50} />
            </div>
          </OthersRegisterContainer>
        </Form>
      ) : (
        <EmailVerify />
      )}
    </Container>
  );
}
