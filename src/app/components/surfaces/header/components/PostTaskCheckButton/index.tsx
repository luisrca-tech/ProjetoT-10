import { RiCheckFill } from "react-icons/ri";
import { Container } from "./styles";

interface PostTaskCheckButton {
  onTaskPost: () => Promise<void>;
}

export default function PostTaskCheckButton({
  onTaskPost,
}: PostTaskCheckButton) {
  return (
    <Container onClick={onTaskPost}>
      <RiCheckFill size={24} />
    </Container>
  );
}
