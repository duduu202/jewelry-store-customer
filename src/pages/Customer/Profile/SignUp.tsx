import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChartPie } from "react-icons/fa";
import { IPaginatedResponse } from "../../../Interfaces/IPaginatedResponse";
import api from "../../../services/api";
import { PageContainer } from "../../Home/styles";
import Navbar from "../../../components/Navbar/Navbar";
import { Container } from "../../../styles/style";
import GenericList from "../../../components/GenericList/GenericList";
import { User } from "../../../hooks/useAuth";
import { Modal } from "../../../components/Modal/Modal";
import UserEditPage from "./UserEditor";
import UserEditor from "./UserEditor";
import { ModalContent } from "../../../components/Modal/styles";
import handleError from "../../../utils/message";
import { ButtonComponent } from "../../../components/Button/styles";
import { InputComponent } from "../../../components/InputTextFloat/styles";
import InputTextFloat from "../../../components/InputTextFloat/InputTextFloat";
import { PageTitle } from "../../../components/Layout/styles";

interface IRequest {
  name: string;
  email: string;
  password: string;
  CPF: string;
  phone: string;
}

const route = "/user";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();

  const handleSignUp = async (data: IRequest) => {
    try {
      console.log(data);
      await api.post(route, data);
      navigate("/login");
    } catch (error) {
      handleError(error);
    }
  };

  const handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <PageContainer>
      <Container>
        <div style={{ width: "50%", margin: "auto", marginTop: "10%" }}>
          <PageTitle>Cadastro</PageTitle>
          <InputTextFloat label="Nome" name="name" onChange={handleChanges} />
          <InputTextFloat
            label="E-mail"
            name="email"
            onChange={handleChanges}
          />
          <InputTextFloat label="CPF" name="CPF" onChange={handleChanges} />
          <InputTextFloat
            label="Telefone"
            name="phone"
            onChange={handleChanges}
          />
          <InputTextFloat
            label="Senha"
            name="password"
            onChange={handleChanges}
            type="password"
          />
          <ButtonComponent onClick={() => handleSignUp(user as IRequest)}>
            Cadastrar
          </ButtonComponent>
        </div>
      </Container>
    </PageContainer>
  );
};

export default SignUpPage;
