import { Container } from "./styles";
import * as Switch from "@radix-ui/react-switch";
import { checkedAtom } from "~/@atom/ProjectStates/checkedAtom";
import { useAtom } from "jotai";
type ButtonRegistrationType = {
  onChange: () => void;
};

export default function ToogleSwitch({ onChange }: ButtonRegistrationType) {
  const [checked] = useAtom(checkedAtom);
  return (
    <Container>
      <Switch.Root
        className="SwitchRoot"
        id="airplane-mode"
        onCheckedChange={onChange}
        checked={checked}
      >
        <Switch.Thumb className="SwitchThumb" />
      </Switch.Root>
    </Container>
  );
}
