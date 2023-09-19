import styled, { keyframes } from 'styled-components';
import { NavLink } from 'react-router-dom';

interface NavbarProps {
  isOpen: boolean;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const NavbarContainer = styled.div<NavbarProps>`
  width: ${({ isOpen }) => isOpen ? '17.8rem' : '4.5rem'};
  height: 100vh;
  background-color: ${(props) => props.theme.colors.background};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s ease-in-out;
`;

export const Icon = styled.button<NavbarProps>`
  position: absolute;
  top: 5rem;
  left: ${({ isOpen }) => isOpen ? '14.3rem' : '3.85rem'};
  width: 1.4rem;
  height: 1.4rem;
  padding: 2px;
  background-color: white;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.secondary };
  color: ${({ theme }) => theme.colors.secondary };
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.default };
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary };
    color: ${({ theme }) => theme.colors.default };
    border-color: ${({ theme }) => theme.colors.default };
  }
`

export const NavbarHeader = styled.div`
  width: 100%;
  padding: 35px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NavbarLogo = styled.img<NavbarProps>`
  width: ${({ isOpen }) => isOpen ? '123px' : '55px'};
  height: 53.15px;
  transition: all 0.3s ease-in-out;
`;

export const NavbarMenu = styled.div`
  width: 100%;
`;

export const NavbarMenuItem = styled(NavLink)<NavbarProps>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.4rem;
  text-decoration: none;
  height: 3.5rem;

  .icon {
    color: ${({ theme }) => theme.colors.secondary };
  }

  span {
    display: ${({ isOpen }) => isOpen ? 'flex' : 'none'};
    font-family: 'Exo', sans-serif;
    font-size: 13pt;
    color: ${({ theme }) => theme.colors.secondary };
    animation: ${fadeIn} 2s;
  }

  &.active {
    border-left: ${({ theme }) => `5px solid ${theme.colors.primary}`};
    background-color: #F5F5F53B;
    .icon {
      color: ${({ theme }) => theme.colors.primary };
    }
    span {
      color: ${({ theme }) => theme.colors.primary };
    }
    &::before {
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const NavbarFooter = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 2rem;
`;

export const ProfileContainer = styled.div<NavbarProps>`
  display: ${({ isOpen }) => isOpen ? 'flex' : 'none'};
  flex-direction: column;
  margin-left: 0.8rem;
  animation: ${fadeIn} 2s;
`;

export const ProfileImage = styled.img<NavbarProps>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: ${({ isOpen, theme }) => !isOpen ? '1.5px solid #0BA25E' : `1.5px solid ${theme.colors.secondary}`};
  padding: 1.2px;
  object-fit: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProfileName = styled.span`
  font-family: 'Exo', sans-serif;
  font-size: 12pt;
  color: ${({ theme }) => theme.colors.light_font };
  font-weight: bold;
  white-space: nowrap;
  overflow:hidden;
  text-overflow: ellipsis;
  max-width: 145px;
`;

export const ProfileOccupation = styled.span`
  font-family: 'Exo', sans-serif;
  font-size: 12pt;
  color: ${({ theme }) => theme.colors.secondary };
  white-space: nowrap;
  overflow:hidden;
  text-overflow: ellipsis;
  max-width: 145px;
`;


