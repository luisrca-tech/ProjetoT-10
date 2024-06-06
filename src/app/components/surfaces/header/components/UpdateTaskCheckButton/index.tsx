import { RiCheckFill } from "react-icons/ri";
import { Container } from "./styles";

interface PostTaskCheckButton {
  onTaskUpdate: () => Promise<void>;
}

export default function UpdateTaskCheckButton({
  onTaskUpdate,
}: PostTaskCheckButton) {
  return (
    <Container onClick={onTaskUpdate}>
      <RiCheckFill size={24} />
    </Container>
  );
}
