import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const CartWrapper = styled(NavLink)`
  position: relative;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.5rem;
`;
export const Index = styled.span`
  position: absolute;
  left: -0.5rem;
  bottom: 0rem;
  font-size: 0.875rem;
  height: 1.25rem;
  min-width: 1.25rem;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  background-color: ${({ theme }) => theme.colors.primary};
`;
