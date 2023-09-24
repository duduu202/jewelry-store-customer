import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Column, LogoutButton, UserImg, UserName, Wrapper } from "./styles";
import userImg from "../../assets/user.png";

const HeaderProfile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const onLogout = () => {
    signOut();
    navigate("/login");
  };
  return (
    <Wrapper>
      <UserImg src={userImg} />
      <Column>
        <UserName>{user?.user?.name || "Teste"}</UserName>
        <LogoutButton type="button" onClick={onLogout}>
          Deslogar
        </LogoutButton>
      </Column>
    </Wrapper>
  );
};

export default HeaderProfile;
