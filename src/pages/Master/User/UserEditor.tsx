import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Address, User } from "../../../hooks/useAuth";
import { PageContainer } from "../../Home/styles";
import Navbar from "../../../components/Navbar/Navbar";
import { Container } from "../../../styles/style";
import GenericEdit from "../../../components/GenericEdit/GenericEdit";
import api from "../../../services/api";
import { Input } from "../../../components/Input/Input";
import handleError from "../../../utils/message";
import { ButtonComponent } from "../../../components/Button/styles";


interface IProps {
  handleSave: (user: User) => void;
  id?: string;
}

const UserEditor = (props: IProps) => {
  const { id } = props;
  const [userData, setUserData] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if(!id){
        setUserData(undefined);
      }
      try {
        const { data: userData } = await api.get<User>('/user/' + id);
        setUserData(userData);

        console.log("userData", userData);

        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    console.log("event.target.placeholder", event.target.placeholder);
    setUserData({ ...userData, [event.target.placeholder]: event.target.value });

  }

  const handleSave = async () => {
    if(!userData){
      return;
    }
    try {
      props.handleSave(userData);
    } catch (error) {
      handleError(error);
    }
  }

  if (loading) {
    return <div>Carregando...</div>;
  }
  
  return (
    <div>
        <h2>{id? 'Editar' : 'Criar'} usuário</h2>
        <Input type="text" label="Nome" iconName="user" placeholder="name" value={userData? userData.name : ''} onChange={e => handleChange(e)} />
        <Input type="text" label="Email" iconName="email" placeholder="email" value={userData? userData.email : ''} onChange={e => handleChange(e)} />
        <Input type="text" label="CPF" iconName="cpf" placeholder="CPF" value={userData? userData.CPF : ''} onChange={e => handleChange(e)} />
        <Input type="text" label="phone" iconName="phone" placeholder="phone" value={userData? userData.phone : ''} onChange={e => handleChange(e)} />
        <Input type="text" label="password" iconName="password" placeholder="password" value={userData?.password? userData.password : ''} onChange={e => handleChange(e)} />
        <ButtonComponent onClick={() => handleSave()}>Salvar</ButtonComponent>

    </div>

  );
};

export default UserEditor;
