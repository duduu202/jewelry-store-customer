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

const route = "/user";

const UserListPage = () => {
  // const { data } = await api.get(route);
  console.log("UserListPage");
  const [data, setData] = useState<User[]>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get<IPaginatedResponse<User>>(route);
      console.log("data", data.results);
      setData(data.results);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    await api.delete(`${route}/${id}`);
    const { data } = await api.get(route);
    setData(data.results);
  };

  const handleSave = async (user: User) => {
    const { id, role, created_at, updated_at, address, ...rest } = user;
    try {
      if (user.id) {
        await api.put(`${route}/${user.id}`, rest);
      } else {
        await api.post(route, rest);
      }
    } catch (error) {
      handleError(error);
    }

    const { data } = await api.get(route);
    setData(data.results);
    setIsOpenModal(false);
  };

  const [editingUserId, setEditingUserId] = useState<string | undefined>(
    undefined
  );
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleEdit = (id: string) => {
    // Set the ID of the user being edited in the state
    // navigate(`/users/edit/${id}`);
    setEditingUserId(id);
    setIsOpenModal(true);
  };

  const handleCreate = () => {
    // Set the ID of the user being edited in the state
    // navigate(`/users/create/`);
    setEditingUserId(undefined);
    setIsOpenModal(true);
  };

  return (
    <PageContainer>
      <Navbar />
      <Container>
        <h1>Usuários</h1>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div>
            <GenericList
              column_names={["Nome", "E-mail", "CPF", "Ações"]}
              data={data?.map((item) => {
                return {
                  id: item.id,
                  items: [
                    item.name,
                    item.email,
                    item.CPF
                      ? `${item.CPF.slice(0, 3)}.${item.CPF.slice(
                          3,
                          6
                        )}.${item.CPF.slice(6, 9)}-${item.CPF.slice(9, 11)}`
                      : "Não informado",
                    <div>
                      <ButtonComponent onClick={() => handleDelete(item.id)}>
                        Excluir
                      </ButtonComponent>
                      <ButtonComponent onClick={() => handleEdit(item.id)}>
                        Editar
                      </ButtonComponent>
                    </div>,
                  ],
                };
              })}
            />
            <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
              <ModalContent>
                <UserEditor handleSave={handleSave} id={editingUserId} />
              </ModalContent>
            </Modal>

            <ButtonComponent onClick={() => handleCreate()}>
              Criar
            </ButtonComponent>
          </div>
        )}
      </Container>
    </PageContainer>
  );
};

export default UserListPage;
