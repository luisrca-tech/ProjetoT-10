"use client";

import { forwardRef, useState, type ComponentProps } from "react";
import { FaUnlockAlt, FaLock } from "react-icons/fa";
import { Container } from "./styles";

type Props = ComponentProps<"input"> & {
  isPassword?: boolean;
  type: string;
  label?: string;
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ isPassword, type, ...rest }, ref) => {
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);

    return (
      <Container type={type}>
        <div>
          <input
            ref={ref}
            {...rest}
            type={passwordIsVisible ? "text" : type}
          ></input>
          {!!isPassword && (
            <button
              type="button"
              onClick={() => setPasswordIsVisible(!passwordIsVisible)}
            >
              <div>
                {!!passwordIsVisible ? (
                  <FaUnlockAlt size={22} />
                ) : (
                  <FaLock size={22} />
                )}
              </div>
            </button>
          )}
        </div>
      </Container>
    );
  }
);

Input.displayName = "Input";

export default Input;
