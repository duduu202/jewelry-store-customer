
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IPaginatedResponse } from "../../../Interfaces/IPaginatedResponse";
import api from "../../../services/api";
import { PageContainer } from "../../Home/styles";
import Navbar from "../../../components/Navbar/Navbar";
import { Container } from "../../../styles/style";
import GenericList from "../../../components/GenericList/GenericList";
import { User } from "../../../hooks/useAuth";
import { Modal } from "../../../components/Modal/Modal";
import { ModalContent } from "../../../components/Modal/styles";
import handleError from "../../../utils/message";
import UserEditor from "../User/UserEditor";
import { IProductDTO } from "./dto/ProductDTO";
import { ButtonComponent } from "../../../components/Button/styles";
import ProductEditor from "./ProductEditor";
import ListPage from "../../../components/GenericEditor/ListEditor";
import ListEditor from "../../../components/GenericEditor/ListEditor";


const route = '/product';

const ProductsListPage = () => {
    //const { data } = await api.get('/user');
    console.log('ProductsListPage')
    const [ data, setData ] = useState<IProductDTO[]>();
    const [ loading, setLoading ] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await api.get<IPaginatedResponse<IProductDTO>>(route);
            console.log("data", data.results);
            setData(data.results);
            setLoading(false);
        }
        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        await api.delete(route + `/${id}`);
        const { data } = await api.get(route);
        setData(data.results);
    }

    const handleSave = async (user: IProductDTO) => {
        const { price, stock, name, description, ...rest } = user;
        console.log("product",user)
        try{
            if(user.id){
                await api.put(route + `/${user.id}`, {price, stock, name, description});
            }
            else{
                await api.post(route, {price, stock, name, description});
            }
        } catch (error) {
            handleError(error);
        }
        
        const { data } = await api.get(route);
        setData(data.results);
        setIsOpenModal(false);
    }


    const [editingUserId, setEditingUserId] = useState<string | undefined>(undefined);
    const [ isOpenModal, setIsOpenModal ] = useState(false);

    const handleEdit = (id: string) => {
        // Set the ID of the user being edited in the state
        //navigate(`/users/edit/${id}`);
        setEditingUserId(id);
        setIsOpenModal(true);
      };

      const handleCreate = () => {
        // Set the ID of the user being edited in the state
        //navigate(`/users/create/`);
        setEditingUserId(undefined);
        setIsOpenModal(true);
      };


    return (
      <PageContainer>
        <Navbar />
        <Container>
        <h1>Produtos</h1>
            <ListEditor route={route} objectKeys={{
                name: "Nome",
                stock: "Estoque",
                image: "Imagem",
                price: "Preço",
            }} ></ListEditor>
        {/* {loading ? (
            <p>Carregando...</p>
            ) : (
                <div>
                    <GenericList column_names={['Nome', "Estoque", "Imagem", "Preço" ,"Ações"]} data={data?.map((item) =>{
                        return {
                            id: item.id,
                            items: [item.name, item.stock, item.image ? <img src={item.image} alt="imagem" width="100px" height="100px"/> : <></>, item.price ? item.price : <></>,
                                <div>
                                    <ButtonComponent onClick={() => handleDelete(item.id)}>Excluir</ButtonComponent>
                                    <ButtonComponent onClick={() => handleEdit(item.id)}>Editar</ButtonComponent>
                                </div>

                        ]
                        }
                    })}/>
                    <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
                        <ModalContent>
                            <ProductEditor handleSave={handleSave} id={editingUserId}/>
                        </ModalContent>
                    </Modal>

                    <ButtonComponent onClick={() => handleCreate()}>Criar</ButtonComponent>
                </div>
            )} */}

        </Container>
      </PageContainer>
    );
}

//const ProductsListPage = async () => {
//    const { data } = await api.get('/user');
//    console.log("data",data.results)
//    return (
//      <PageContainer>
//        
//          <h1>Lista de usuários</h1>
//          <ul>
//              {data.results.map((user) => (
//                  <li key={user.id}>{user.name}</li>
//              ))}
//    
//          </ul>
//                
//                
//      </PageContainer>
//    );
//}

export default ProductsListPage;
