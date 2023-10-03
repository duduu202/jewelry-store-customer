import { PropsWithChildren } from "react";
import Header from "../Header/Header";
import { ChildrenContainer, PageContainer } from "./styles";

interface Props extends PropsWithChildren {}
const Layout = ({ children }: Props) => {
  return (
    <PageContainer>
      <Header />
      <ChildrenContainer>{children}</ChildrenContainer>
    </PageContainer>
  );
};

export default Layout;
