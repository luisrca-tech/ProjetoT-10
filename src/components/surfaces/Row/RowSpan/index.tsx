type RowSpanTypes = {
  taskCustomField: string | number | string[];
  checked?: boolean;
};

import { Span, Container } from "./styles";
export function RowSpan({ taskCustomField, checked }: RowSpanTypes) {
  return (
    <Container checked={checked}>
      <Span>{taskCustomField}</Span>
    </Container>
  );
}
