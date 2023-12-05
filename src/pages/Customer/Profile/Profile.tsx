import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { Container } from "../../../styles/style";
import { User, useAuth } from "../../../hooks/useAuth";
import handleError, { handleSuccess } from "../../../utils/message";
import { ButtonComponent } from "../../../components/Button/styles";
import InputTextFloat from "../../../components/InputTextFloat/InputTextFloat";
import { PageTitle } from "../../../components/Layout/styles";
import Layout from "../../../components/Layout/Layout";

interface IRequest {
  name: string;
  email: string;
  password: string;
  CPF: string;
  phone: string;
}

const route = "/user";
const routePassowrd = "user/password";

const ProfilePage = () => {
  const [user, setUser] = useState<User>();
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { user: profile, setUser: userData } = useAuth();

  const handleSave = async (data: IRequest) => {
    try {
      await api.put(`${route}/${profile?.user?.id}`, data);
      handleSuccess("Dados atualizados com sucesso!");
      userData({
        access_token: profile?.access_token,
        user: {
          ...profile?.user,
          name: data.name || profile?.user?.name,
          email: data.email || profile?.user?.email,
          CPF: data.CPF || profile?.user?.CPF,
          phone: data.phone || profile?.user?.phone,
        },
      });
    } catch (error) {
      handleError(error);
    }
  };

  const handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
  };

  const handleNewPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setNewPassword(value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setConfirmPassword(value);
  };

  const handleSavePassword = async () => {
    try {
      await api.put(`${routePassowrd}/change/${profile?.user?.id}`, {
        old_password: password,
        new_password: newPassword,
        new_confirm: confirmPassword,
      });
      handleSuccess("Senha atualizada com sucesso!");
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Layout>
      <Container>
        <div style={{ width: "50%", margin: "auto", marginTop: "10%" }}>
          <PageTitle>Editar Dados Pessoais</PageTitle>
          <InputTextFloat
            label="Nome"
            name="name"
            onChange={handleChanges}
            defaultValue={profile?.user?.name}
          />
          <InputTextFloat
            label="E-mail"
            name="email"
            onChange={handleChanges}
            defaultValue={profile?.user?.email}
          />
          <InputTextFloat
            label="CPF"
            name="CPF"
            onChange={handleChanges}
            defaultValue={profile?.user?.CPF}
          />
          <InputTextFloat
            label="Telefone"
            name="phone"
            onChange={handleChanges}
            defaultValue={profile?.user?.phone}
          />
          <ButtonComponent
            onClick={() => {
              handleSave(user as IRequest);
            }}
          >
            Salvar
          </ButtonComponent>
          <InputTextFloat
            label="Senha Atual"
            name="password"
            onChange={handlePasswordChange}
            type="password"
          />
          <InputTextFloat
            label="Senha Nova"
            name="password"
            onChange={handleNewPasswordChange}
            type="password"
          />
          <InputTextFloat
            label="Confirmar Senha Nova"
            name="password"
            onChange={handleConfirmPasswordChange}
            type="password"
          />
          <ButtonComponent
            onClick={() => {
              handleSavePassword();
            }}
          >
            Atualizar Senha
          </ButtonComponent>
        </div>
      </Container>
    </Layout>
  );
};

export default ProfilePage;
