import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { loadingAtom } from "~/@atom/LoadingState/loadingAtom";
import Button from "~/components/widgets/Button";
import { useTasksOfProject } from "~/hooks/useTasksOfProject";
import { formPersonsSchema } from "~/schemas/form-persons.schema";
import { api } from "~/trpc/react";
import { type formPersonsData } from "~/types/form-persons.type";
import { showToast } from "~/utils/functions/showToast";
import { FormFooter } from "../FormFooter";
import { Container, Form, PersonByRole, RoleAndPerson } from "./styles";

export function FormForPeople() {
  const { getCustomFields } = useTasksOfProject();
  const roles = getCustomFields();
  const updateTaskName = api.clickup.updateTaskName.useMutation();
  const [isLoading, setIsLoading] = useAtom(loadingAtom);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formPersonsData>({
    resolver: zodResolver(formPersonsSchema),
  });

  const onSubmit = async ({ names }: formPersonsData) => {
    setIsLoading(true);
    try {
      await updateTaskName.mutateAsync({
        taskIds: roles?.map((role) => role.taskId),
        names: names,
      });

      showToast("success", "Pessoas alocadas com sucesso!");
    } catch (error) {
      showToast("error", "Failed to update task name");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <RoleAndPerson>
        <span>Pessoa</span>
        <span>Cargo</span>
      </RoleAndPerson>
      {roles ? (
        <Form onSubmit={handleSubmit(onSubmit)}>
          {roles?.map((role, index) => (
            <div key={index}>
              <PersonByRole>
                <input
                  type="text"
                  defaultValue={role.fieldName}
                  placeholder="Vincule uma pessoa..."
                  {...register(`names.${index}`)}
                />
                <span>{role.chargeName}</span>
              </PersonByRole>
              {errors.names && errors.names[index] && (
                <p>{errors.names[index]?.message}</p>
              )}
            </div>
          ))}
          <FormFooter>
            {!isLoading && <Button text="Salvar" type="submit" />}
          </FormFooter>
        </Form>
      ) : (
        <span>Carregando...</span>
      )}
    </Container>
  );
}
