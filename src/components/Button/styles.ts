import styled from "styled-components";

export const ButtonComponent = styled.button`
  width: 4rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.2rem;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.dark_font};
  outline: none;
  background-color: ${({ theme }) => theme.colors.primary};
  transition: all 0.1s ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary_dark};
    color: ${({ theme }) => theme.colors.grayBackground};
    border-color: ${({ theme }) => theme.colors.grayBackground};
  }
`;
