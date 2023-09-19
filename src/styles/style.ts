import styled from "styled-components";


// generic list can have any type of list, with any number of items, and any number of columns

interface ColumnProps {
    columns: number;
}

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 0.1rem;
  list-style: none;
  padding: 0.1rem;
  margin: 0;
`;

const LineList = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    padding: 0.5rem;
    background-color: ${({ theme }) => theme.colors.primary};
    //box-shadow: 0 0 0.5rem ${({ theme }) => theme.colors.primary};
    transition: all 0.2s ease-in-out;
    color: ${({ theme }) => theme.colors.default};
`;

// generic column can have any number of items
interface ItemProps {
  size: string;
}

const Item = styled.li`
  display: flex;
  //flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.colors.background};
  //box-shadow: 0 0 0.5rem ${({ theme }) => theme.colors.primary};
  transition: all 0.2s ease-in-out;
  color: ${({ theme }) => theme.colors.default};
  cursor: pointer;
    &:hover {
        background-color: ${({ theme }) => theme.colors.dark_font};
        color: ${({ theme }) => theme.colors.default};
    }

`;

const Container = styled.div`
  width: 100%;
  padding: 0.5rem;

`;


export { List, Item, LineList, Container };