import { useTasksOfProject } from "~/hooks/useTasksOfProject";
import {
  Container,
  IsAvailable,
  LoadingCustomFields,
  Separate,
  TableBody,
  TableFields,
  TableFooterCount,
  TableTitle,
} from "./styles";

export function AvailableFields() {
  const { getCustomFields } = useTasksOfProject();

  const customFields = getCustomFields();

  return (
    <Container>
      <TableTitle>
        <span>Cargo</span>
        <span>Qtd. Horas</span>
        <span>Valor Hora</span>
      </TableTitle>
      {customFields ? (
        <TableBody>
          <Separate />
          {customFields?.map((customField, index) => (
            <div key={index}>
              <TableFields>
                <strong>{customField.chargeName}</strong>
                <span>{customField.hours}h</span>
                <span>R${customField.valueByHour}</span>
                <IsAvailable />
              </TableFields>
              <Separate />
            </div>
          ))}
        </TableBody>
      ) : (
        <LoadingCustomFields>Carregando...</LoadingCustomFields>
      )}
      <TableFooterCount>
        <span>Valor Total</span>
        <span>R$ 98.910,00 </span>
      </TableFooterCount>
    </Container>
  );
}
