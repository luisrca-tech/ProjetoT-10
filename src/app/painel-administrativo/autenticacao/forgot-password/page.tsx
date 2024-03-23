"use client";
import {
  Container,
  Form,
  ButtonText,
  ButtonsTextContainer,
  OthersRegisterContainer,
} from "./styles";
import { useRouter } from "next/navigation";
import Input from "@/app/components/AuthenticationUp";
import Button from "@/app/components/Button";
import GoogleImage from "../../../../../public/google img.svg";
import LinkedinImage from "../../../../../public/linkedin img.svg";
import Image from "next/image";
import { roboto } from "@/app/fonts";
import { useState } from "react";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [loading, setLoading] = useState(true);

  return (
    <Container>
      <Form>
        <Input
          label="E-MAIL"
          id="email"
          type="email"
          placeholder="email@exemplo.com"
          autoComplete="useremail"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Input
          label="Password"
          isPassword={true}
          id="password"
          type="password"
          placeholder="Nova senha"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
          <Input
          label="NewPassword"
          isPassword={true}
          id="Newpassword"
          type="password"
          placeholder="Confirme a nova senha"
          autoComplete="new-password"
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword}
        />
        <Button
          className={roboto.className}
          type="submit"
          text="Confirmar"
          loading={false}
        />

        <OthersRegisterContainer>
          <div>
            <span className={roboto.className}>Entre com sua conta</span>
          </div>

          <div>
            <Image src={GoogleImage} alt="" width={50} height={50} />
            <Image src={LinkedinImage} alt="" width={50} height={50} />
          </div>
        </OthersRegisterContainer>
      </Form>
    </Container>
  );
}
