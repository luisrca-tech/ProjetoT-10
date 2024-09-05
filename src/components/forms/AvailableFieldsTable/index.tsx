import { AvailableFieldsItems } from "~/mocks/AvailableFieldsItems";
import {
  Container,
  Separate,
  TableBody,
  TableFields,
  TableFooterCount,
  TableTitle,
} from "./styles";

export function AvailableFields() {
  return (
    <Container>
      <TableTitle>
        <span>Cargo</span>
        <div>
          <span>Qtd. Horas</span>
          <span>Valor Hora</span>
        </div>
      </TableTitle>
      <TableBody>
        <Separate />
        {AvailableFieldsItems.map((item) => (
          <div key={item.role}>
            <TableFields>
              <span>{item.role}</span>
              <div>
                <span>{item.hours}</span>
                <span>{item.valueByHour}</span>
              </div>
            </TableFields>
            <Separate />
          </div>
        ))}
      </TableBody>
      <TableFooterCount>
        <span>Valor Total</span>
        <span>R$ 98.910,00 </span>
      </TableFooterCount>
    </Container>
  );
}
