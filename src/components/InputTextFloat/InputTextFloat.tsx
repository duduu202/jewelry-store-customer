import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";
import {
  InputComponent,
  LabelText,
  WrapperInput,
  WrapperLabel,
} from "./styles";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const InputTextFloat = forwardRef(
  ({ label, error, ...rest }: Props, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <WrapperLabel>
        <WrapperInput>
          <InputComponent
            type="text"
            {...rest}
            ref={ref}
            placeholder="."
            error={!!error}
          />
          <LabelText>{label}</LabelText>
        </WrapperInput>
        <ErrorMessage error={error} />
      </WrapperLabel>
    );
  }
);

export default InputTextFloat;
