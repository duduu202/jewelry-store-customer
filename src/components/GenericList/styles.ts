import styled, { keyframes } from 'styled-components';
import { NavLink } from 'react-router-dom';

export const GenericListTable = styled.table`
  font-family: Arial, Helvetica, sans-serif;

  border-radius: 5px;
  width: 100%;
`;

export const GenericListCell = styled.td`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 8px;
`;

export const GenericListHeaderCell = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.light_font};
  border-radius: 5px;
`;

export const GenericListRow= styled.tr`
  background-color: ${(props) => props.theme.colors.secondary};
`;

