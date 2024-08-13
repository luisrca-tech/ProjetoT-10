import { Container, SwitchContainer } from "./styles";
import * as Switch from "@radix-ui/react-switch";
import { checkedAtom } from "~/@atom/ProjectStates/checkedAtom";
import { useAtom } from "jotai";

export default function ToogleSwitch() {
  const [checked, setChecked] = useAtom(checkedAtom);

  const handleCheckedChange = () => {
    setChecked(!checked);
  };

  return (
    <SwitchContainer>
      <span>Editar datas</span>
      <Container>
        <Switch.Root
          className="SwitchRoot"
          id="airplane-mode"
          onCheckedChange={handleCheckedChange}
          checked={checked}
        >
          <Switch.Thumb className="SwitchThumb" />
        </Switch.Root>
      </Container>
    </SwitchContainer>
  );
}
