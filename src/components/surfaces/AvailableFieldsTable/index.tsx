"use client";

import { Skeleton } from "~/components/widgets/Skeleton";
import {
  Container,
  IsAvailable,
  Separate,
  TableBody,
  TableFields,
  TableFooterCount,
  TableTitle,
} from "./styles";
import { useAvailableFields } from "~/utils/functions/useAvailableFields";

export function AvailableFields() {
  const { totalValue, filteredFields, taskAttributes } = useAvailableFields();
  const formattedTotalValue = totalValue.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
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
        <span>$ {formattedTotalValue} </span>
      </TableFooterCount>
    </Container>
  );
}
