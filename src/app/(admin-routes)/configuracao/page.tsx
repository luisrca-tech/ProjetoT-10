"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { roboto } from "~/assets/fonts/fonts";
import Input from "~/components/inputs/Input";
import Button from "~/components/widgets/Button";
import ErrorMessage from "~/components/widgets/ErrorMessage";

import { Container, Form } from "./styles";
import { type configurationType } from "~/types/configuration.type";
import { configurationSchema } from "~/schemas/configuration-schema";

export default function Configuration() {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useForm<configurationType>({
    resolver: zodResolver(configurationSchema),
    mode: "onChange",
  });
  const submitIsDisabled = !!errors.listId?.message || !!errors.pk?.message;
  return (
    <Container>
      <Form>
        <Input
          id="listId"
          type="text"
          placeholder="List Id"
          {...register("listId")}
        />
        <ErrorMessage>
          {errors.listId?.message && errors.listId?.message}
        </ErrorMessage>
        <Input
          id="pk"
          type="text"
          placeholder="Autorization Key"
          {...register("pk")}
        />
        <ErrorMessage>{errors.pk?.message && errors.pk?.message}</ErrorMessage>
        <Button
          className={roboto.className}
          loading={isSubmitting}
          text="Entrar"
          type="submit"
          disabled={submitIsDisabled}
        />
      </Form>
    </Container>
  );
}
