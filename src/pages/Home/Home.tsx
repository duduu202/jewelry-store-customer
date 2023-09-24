import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import { Container } from "../../styles/style";
import { PageContainer } from "./styles";

const HomePage = () => {
  return (
    <PageContainer>
      <Header />
      <Container></Container>
    </PageContainer>
  );
}

export default HomePage;
