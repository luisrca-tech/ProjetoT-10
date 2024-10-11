"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { roboto } from "~/assets/fonts/fonts";
import Input from "~/components/inputs/Input";
import Button from "~/components/widgets/Button";
import ErrorMessage from "~/components/widgets/ErrorMessage";

import { useSession } from "@clerk/nextjs";
import { configurationSchema } from "~/schemas/configuration-schema";
import { api } from "~/trpc/react";
import { type configurationType } from "~/types/configuration.type";
import { showToast } from "~/utils/functions/showToast";
import { Container, Form } from "./styles";
import { useRouter } from "next/navigation";

export default function Configuration() {
  const { session } = useSession();
  const userId = session?.user.id ?? "";
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<configurationType>({
    resolver: zodResolver(configurationSchema),
    mode: "onChange",
  });

  const postClickUpKeys = api.clickup.postClickUpKeys.useMutation();
  const updateClickUpKeys = api.clickup.updateClickUpKeys.useMutation();
  const getClickUpKeys = api.clickup.getClickupKeys.useQuery({ userId });

  const submitIsDisabled = !!errors.listId?.message || !!errors.pk?.message;

  const onSubmit = async ({ pk, listId }: configurationType) => {
    try {
      const existingKeys = await getClickUpKeys.refetch();

      if (Array.isArray(existingKeys.data) && existingKeys.data.length > 0) {
        await updateClickUpKeys.mutateAsync({
          pk,
          listId,
          userId: userId,
        });
        if (updateClickUpKeys.isSuccess) {
          showToast("success", "Configuração atualizada com sucesso!");
          router.push("/projetos");
        }
      } else {
        await postClickUpKeys.mutateAsync({
          pk,
          listId,
          userId,
        });
        if (postClickUpKeys.isSuccess) {
          showToast("success", "Configuração salva com sucesso!");
          router.push("/projetos");
        }
      }
    } catch (error) {
      showToast("error", "Erro ao configurar");
    }  finally {
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="listId"
          type="text"
          placeholder="List Id"
          defaultValue={getClickUpKeys.data?.listId ?? ""}
          {...register("listId")}
        />
        <ErrorMessage>
          {errors.listId?.message && errors.listId?.message}
        </ErrorMessage>
        <Input
          id="pk"
          type="text"
          placeholder="Autorization Key"
          defaultValue={getClickUpKeys.data?.AuthorizationPkKey ?? ""}
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
