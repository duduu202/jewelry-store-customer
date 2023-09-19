import styled from "styled-components";

export const Container = styled.div`
  width: 100%;//20rem;
  height: 2.813rem;

  margin: 0.85rem 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 0.75rem;
  border: 2px solid ${({ theme }) => theme.colors.primary};

  outline: none;
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary_dark};
  }
  background-color: ${({ theme }) => theme.colors.grayBackground};

`;

export const InputComponent = styled.input`
  width: 85%;
  height: 100%;

  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.dark_font};

  border: none;
  outline: none;
  border-radius: 0 0.75rem 0.75rem 0;

  padding-left: .8rem;

  background-color: ${({ theme }) => theme.colors.grayBackground};
  `;

export const InputWrapper = styled.div`
    width: 15%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 0.75rem 0 0 0.75rem;
    background-color: ${({theme}) => theme.colors.grayBackground};
  `;
