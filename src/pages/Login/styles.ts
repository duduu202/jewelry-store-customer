import styled from "styled-components";
import { ButtonModel } from "../../components/ButtonModel/ButtonModel";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100dvh;
`;
export const FormContainer = styled.div``;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 20rem;
`;
export const ButtonSubmit = styled(ButtonModel)``;
