import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { loadingAtom } from "~/@atom/LoadingState/loadingAtom";
import Button from "~/components/widgets/Button";
import { FieldsList } from "~/mocks/AvailableFieldsItems";
import { formPersonsSchema } from "~/schemas/form-persons.schema";
import { type formPersonsData } from "~/types/form-persons.type";
import { showToast } from "~/utils/functions/showToast";
import { FormFooter } from "../../FormFooter";
import { Container, Form, PersonByRole, RoleAndPerson } from "./styles";

export function FormForPeople() {
  const [isLoading, setIsLoading] = useAtom(loadingAtom);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formPersonsData>({
    resolver: zodResolver(formPersonsSchema),
  });

  const onSubmit = () => {
    setTimeout(() => {
      setIsLoading(true);
    }, 1000);
    setTimeout(() => {
      setIsLoading(false);
      showToast("success", "Pessoas alocadas com sucesso!");
    }, 2500);
  };

  return (
    <Container>
      <RoleAndPerson>
        <span>Pessoa</span>
        <span>Cargo</span>
      </RoleAndPerson>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {FieldsList.map((field, index) => (
          <div key={index}>
            <PersonByRole>
              <input
                type="text"
                defaultValue={field.name}
                placeholder="Vincule uma pessoa..."
                {...register(`names.${index}`)}
              />
              <span>{field.role}</span>
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
    </Container>
  );
}
