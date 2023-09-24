import { PropsWithChildren } from "react";
import Header from "../Header/Header";
import { PageContainer } from "./styles";

interface Props extends PropsWithChildren {}
const Layout = ({ children }: Props) => {
  return (
    <PageContainer>
      <Header />
      {children}
    </PageContainer>
  );
};

export default Layout;
