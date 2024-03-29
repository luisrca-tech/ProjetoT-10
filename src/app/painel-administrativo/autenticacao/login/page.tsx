"use client";
import {
  Container,
  Form,
  ButtonText,
  ButtonsTextContainer,
  OthersLoginContainer,
} from "./styles";
import { useRouter } from "next/navigation";
import Input from "@/app/components/AuthenticationUp";
import Button from "@/app/components/Button";
import GoogleImage from "../../../../../public/google img.svg";
import LinkedinImage from "../../../../../public/linkedin img.svg";
import Image from "next/image";
import { roboto } from "@/app/fonts";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(true);
  /*Dentro da funcao handleSubmit desta pagina, o loading sera settada para true antes da requisicao ser feita, 
  e settada para false depois que ela terminar
  */
     

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
          placeholder="senha"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button
          className={roboto.className}
          type="submit"
          text="Entrar"
          loading={true}
        />

        <ButtonsTextContainer>
          <ButtonText  
            className={roboto.className}
          >
             <Link href={"/painel-administrativo/autenticacao/register"}> Não tenho conta</Link>
          </ButtonText>

          <ButtonText className={roboto.className}>
            <Link href={"/painel-administrativo/autenticacao/forgot-password"} >Esqueci minha senha</Link>
          </ButtonText>
        </ButtonsTextContainer>

        <OthersLoginContainer>
          <div>
            <span className={roboto.className}>Entre com sua conta</span>
          </div>

          <div>
            <Image src={GoogleImage} alt="" width={50} height={50}  priority/>
            <Image src={LinkedinImage} alt="" width={50} height={50} priority />
          </div>
        </OthersLoginContainer>
      </Form>
    </Container>
  );
}
