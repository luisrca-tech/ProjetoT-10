import { Container } from "./styles";
import * as Switch from "@radix-ui/react-switch";

type ButtonRegistrationType = {
  onChange: () => void;
};

export default function ToogleSwitch({ onChange }: ButtonRegistrationType) {
  return (
    <Container>
      <Switch.Root
        className="SwitchRoot"
        id="airplane-mode"
        onCheckedChange={onChange}
      >
        <Switch.Thumb className="SwitchThumb" />
      </Switch.Root>
    </Container>
  );
}
