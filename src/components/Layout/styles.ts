import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.grayBackground};
`;
export const ChildrenContainer = styled.div`
  padding: 1rem 2rem;
`;

export const PageTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.dark_font};
  margin-bottom: 1rem;
`;
