import { poppins } from "@/app/fonts";
import { Container } from "./styles";
import classnames from "classnames";
import LoadingIndicator from "@/app/components/widgets/LoadingIndicator";
import { ButtonRegistrationType } from "@/app/types/componentsTypes/type";
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
          [rest.className as string]: true,
        })}
      >
        {!!loading ? <LoadingIndicator /> : text}
      </button>
    </Container>
  );
}
