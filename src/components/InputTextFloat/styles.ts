import styled, { css } from "styled-components";

export const WrapperLabel = styled.div`
  width: 100%;
`;
export const WrapperInput = styled.label`
  position: relative;
  width: inherit;
`;
interface InputProps {
  error: boolean;
}
export const InputComponent = styled.input<InputProps>`
  border: 1px solid #ccc;
  height: 2.5rem;
  border-radius: 0.25rem;
  padding: 0 0.5rem;
  outline: none;
  width: inherit;

  transition: border-color ease 0.2s;

  &:focus {
    border-color: #333;
  }
  &::placeholder {
    color: transparent;
  }

  ${({ error, theme }) =>
    error &&
    css`
      border-color: ${theme.colors.error} !important;
    `}
`;
export const LabelText = styled.span`
  position: absolute;
  top: 50%;
  left: 0rem;
  transform: translateY(-50%);
  padding: 0 0.5rem;

  transition: all ease 0.2s;

  ${InputComponent}:focus ~ &,
  ${InputComponent}:not(:placeholder-shown) ~ & {
    top: 0%;
    transform: translateY(-80%) scale(0.8);
    background-color: #fff;
  }
`;
