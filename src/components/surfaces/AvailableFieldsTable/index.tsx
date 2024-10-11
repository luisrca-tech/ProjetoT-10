"use client"

import { Skeleton } from "~/components/widgets/Skeleton";
import { useTasksOfProject } from "~/hooks/useTasksOfProject";
import {
  Container,
  IsAvailable,
  Separate,
  TableBody,
  TableFields,
  TableFooterCount,
  TableTitle,
} from "./styles";

export function AvailableFields() {
  const { getTasksInfos } = useTasksOfProject();
  const taskAttributes = getTasksInfos();

  const filteredFields =
    taskAttributes?.map(({ chargeName, hours, valueByHour }) => ({
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
      {taskAttributes ? (
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
        <TableBody>
          <Separate />
          {Array.from({ length: 10 }).map((_, index) => (
            <TableFields key={index}>
              <Skeleton width="100%" height="1rem" />
            </TableFields>
          ))}
          <Separate />
        </TableBody>
      )}
      <TableFooterCount>
        <span>Valor Total</span>
        <span>R$ 98.910,00 </span>
      </TableFooterCount>
    </Container>
  );
}
