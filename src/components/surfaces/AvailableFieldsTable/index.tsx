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
  const { getTasksInfos } = useTasksOfProject();

  const tasksInfos = getTasksInfos();
  const filteredFields =
    tasksInfos?.map(({ chargeName, hours, valueByHour }) => ({
      chargeName,
      hours,
      valueByHour,
    })) || [];

  return (
    <Container>
      <TableTitle>
        <span>Cargo</span>
        <span>Qtd. Horas</span>
        <span>Valor Hora</span>
      </TableTitle>
      {filteredFields ? (
        <TableBody>
          <Separate />
          {filteredFields?.map((customField, index) => (
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
