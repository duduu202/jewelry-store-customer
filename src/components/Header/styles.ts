import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.header`
  background-color: ${(props) => props.theme.colors.background};
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const Logo = styled.img``;
export const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;
export const Navbar = styled.nav``;
export const NavList = styled.ul`
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;
export const NavItem = styled.li`
  list-style: none;
`;
export const NavbarLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${(props) => props.theme.colors.default};
  text-decoration: none;

  .icon {
    font-size: 1.25rem;
  }

  &.active {
    color: ${(props) => props.theme.colors.primary};
  }
`;
