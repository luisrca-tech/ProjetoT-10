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
import { showToast } from "~/utils/functions/showToast";
import { api } from "~/trpc/react";

export default function Configuration() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<configurationType>({
    resolver: zodResolver(configurationSchema),
    mode: "onChange",
  });

  const postClickUpKeys = api.clickup.postClickUpKeys.useMutation();
  const submitIsDisabled = !!errors.listId?.message || !!errors.pk?.message;

  const onSubmit = async ({ pk, listId }: configurationType) => {
    try {
      await postClickUpKeys.mutateAsync({
        pk,
        listId,
      });
      if (postClickUpKeys.isSuccess) {
        showToast("success", "configuração salva com sucesso!");
      }
    } catch (error) {
      showToast("error", "Erro ao configurar");
    }
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
          text="Salvar"
          type="submit"
          disabled={submitIsDisabled}
        />
      </Form>
    </Container>
  );
}
