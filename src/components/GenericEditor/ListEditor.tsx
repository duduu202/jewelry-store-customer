/* eslint-disable no-restricted-syntax */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { IPaginatedResponse } from "../../Interfaces/IPaginatedResponse";
import handleError from "../../utils/message";
import { PageContainer } from "../../pages/Home/styles";
import Navbar from "../Navbar/Navbar";
import { Container } from "../Input/styles";
import GenericList from "../GenericList/GenericList";
import { ButtonComponent } from "../Button/styles";
import { Modal } from "../Modal/Modal";
import { ModalContent } from "../Modal/styles";
import Editor from "./Editor";
import isIsoDate from "../../utils/checkIsoDate";

interface IProps {
  route: string;
  preloadedData?: any[];
  /**
   * Object keys to be displayed on the editor
   *
   * @example
   * objectKeys: {
   * name: 'Nome',
   * stock: 'Estoque',
   * price: 'Preço',
   * description: 'Descrição'
   * }
   */
  objectKeys: {
    [key: string]: string;
  };

  actions?: {
    name: string;
    onClick: (obj: any) => void;
  }[];
  onSave?: (obj: any) => void;

  disableActions?: boolean;
  disableCreate?: boolean;
}

const ListEditor = ({ actions = [], ...props }: IProps) => {
  // const { data } = await api.get('/object');
  const { route } = props;
  let { preloadedData } = props;
  if (props.disableActions) {
    actions = [];
  }

  const [data, setData] = useState<any[]>(preloadedData || []);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (preloadedData) {
        setData(preloadedData);
        setLoading(false);
        setIsOpenModal(false);
        return;
      }
      const { data } = await api.get<IPaginatedResponse<any>>(route);
      setData(data.results);
      setLoading(false);
      setIsOpenModal(false);
    };
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    await api.delete(`${route}/${id}`);
    const { data } = await api.get(route);
    preloadedData = data.results;
    setData(data.results);
  };

  const handleSave = async (object: any) => {
    // we can only save the keys that are in the objectKeys

    const result: any = {};

    for (const key in props.objectKeys) {
      if (Object.prototype.hasOwnProperty.call(props.objectKeys, key)) {
        const element = props.objectKeys[key];
        result[key] = object[key];
      }
    }

    try {
      if (object.id) {
        await api.put(`${route}/${object.id}`, result);
      } else {
        await api.post(route, result);
      }
    } catch (error) {
      handleError(error);
    }

    const { data } = await api.get(route);
    preloadedData = data.results;
    setData(data.results);
    setIsOpenModal(false);
    if (props.onSave) {
      props.onSave(object);
    }
  };

  const [editingUserId, setEditingUserId] = useState<string | undefined>(
    undefined
  );
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleEdit = (id: string) => {
    // Set the ID of the object being edited in the state
    // navigate(`/objects/edit/${id}`);
    setEditingUserId(id);
    setIsOpenModal(true);
  };

  const handleCreate = () => {
    // Set the ID of the object being edited in the state
    // navigate(`/objects/create/`);
    setEditingUserId(undefined);
    setIsOpenModal(true);
  };

  return (
    <div>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div>
          {/* <GenericList column_names={['Nome', "Estoque", "Imagem", "Preço" ,"Ações"]} data={data?.map((item) =>{ */}
          <GenericList
            column_names={Object.values(props.objectKeys).concat(
              props.disableActions ? [] : "Ações"
            )}
            data={data?.map((item) => {
              return {
                id: item.id,
                highlight: item.highlight,
                // items: [item.name, item.stock, item.image ? <img src={item.image} alt="imagem" width="100px" height="100px"/> : <></>, item.price ? item.price : <></>,
                items: Object.keys(props.objectKeys)
                  .map((key) => {
                    if (key === "image") {
                      return item.image ? (
                        <img
                          src={item.image}
                          alt="imagem"
                          width="100px"
                          height="100px"
                        />
                      ) : (
                        <></>
                      );
                    }
                    if (isIsoDate(item[key])) {
                      const date = new Date(item[key]);
                      return date.toLocaleDateString("pt-BR");
                    }
                    return item[key];
                  })
                  .concat(
                    props.disableActions
                      ? []
                      : [
                          actions
                            .map((action) => {
                              return (
                                <ButtonComponent
                                  onClick={() => action.onClick(item)}
                                >
                                  {action.name}
                                </ButtonComponent>
                              );
                            })
                            .concat(
                              <ButtonComponent
                                onClick={() => handleDelete(item.id)}
                              >
                                Excluir
                              </ButtonComponent>,
                              <ButtonComponent
                                onClick={() => handleEdit(item.id)}
                              >
                                Editar
                              </ButtonComponent>
                            ),
                        ]
                  ),
              };
            })}
          />
          <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
            <ModalContent>
              <Editor
                handleSave={handleSave}
                id={editingUserId}
                route={route}
                objectKeys={props.objectKeys}
              />
            </ModalContent>
          </Modal>

          {props.disableCreate ? (
            <></>
          ) : (
            <ButtonComponent onClick={() => handleCreate()}>
              Criar
            </ButtonComponent>
          )}
        </div>
      )}
    </div>
  );
};

// const ListPage = async () => {
//    const { data } = await api.get('/object');
//    console.log("data",data.results)
//    return (
//      <PageContainer>
//
//          <h1>Lista de usuários</h1>
//          <ul>
//              {data.results.map((object) => (
//                  <li key={object.id}>{object.name}</li>
//              ))}
//
//          </ul>
//
//
//      </PageContainer>
//    );
// }

export default ListEditor;
