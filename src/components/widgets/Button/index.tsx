import { poppins } from "~/assets/fonts/fonts";
import { Container } from "./styles";
import classnames from "classnames";
import LoadingIndicator from "../LoadingIndicator";

type ButtonRegistrationType = {
  text: string;
  loading?: boolean;
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  text,
  loading,

  ...rest
}: ButtonRegistrationType) {
  const pLoading = typeof loading !== "boolean" ? false : loading;

  return (
    <Container className={poppins.className}>
      <button
        type="button"
        {...rest}
        className={classnames({
          loading: pLoading,
          [rest.className!]: true,
        })}
      >
        {!!loading ? <LoadingIndicator /> : text}
      </button>
    </Container>
  );
}
