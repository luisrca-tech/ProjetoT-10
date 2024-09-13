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
        <div>
          <span>Qtd. Horas</span>
          <span>Valor Hora</span>
        </div>
      </TableTitle>
      {customFields ? (
        <TableBody>
          <Separate />
          {customFields?.map((customField, index) => (
            <div key={index}>
              <TableFields>
                <span>{customField.chargeName}</span>
                <div>
                  <span>{customField.hours}h</span>
                  <span>R${customField.valueByHour}</span>
                </div>
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
