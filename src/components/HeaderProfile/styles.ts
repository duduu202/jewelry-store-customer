import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
export const UserImg = styled.img`
  block-size: 2.5rem;
  border-radius: 50%;
`;
export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;
export const UserName = styled.span`
  color: ${({ theme }) => theme.colors.white};
  font-size: 1rem;
`;
export const LogoutButton = styled.button`
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.light_font};
  font-size: 0.875rem;

  transition: color ease 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
