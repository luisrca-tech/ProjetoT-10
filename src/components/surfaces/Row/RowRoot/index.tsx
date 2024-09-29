import { checkedAtom } from "~/@atom/ProjectStates/checkedAtom";
import { Container } from "./styles";
import { useAtom } from "jotai";
import { type ReactNode } from "react";

type InputRowProps = {
  row?: string;
  children: ReactNode;
};
export function RowRoot({ children }: InputRowProps) {
  const [checked] = useAtom(checkedAtom);

  return <Container checked={checked}>{children}</Container>;
}
