
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IPaginatedResponse } from "../../../Interfaces/IPaginatedResponse";
import api from "../../../services/api";
import { PageContainer } from "../../Home/styles";
import Navbar from "../../../components/Navbar/Navbar";
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
import { Grid, GridItem } from "../../../components/Grid/style";
import { ICartDTO } from "../CartRequests/dto/CartDTO"; 


const route = '/product';

const ProductsListPage = () => {
    //const { data } = await api.get('/user');
    console.log('ProductsListPage')
    const [ data, setData ] = useState<IProductDTO[]>();
    const [ loading, setLoading ] = useState(true);
    const [ cart, setCart ] = useState<ICartDTO>();
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

    const handlerAddToCart = async (id: string) => {
      let currentCart = await api.get<ICartDTO>('/cart/current_cart');

      console.log("currentCart", currentCart.data);
    
      const cart = currentCart.data;

      await api.put('/cart/' + cart.id, {
        items: [
          ...cart.cart_items.map((item) => {
            return {
              product_id: item.product.id,
              quantity: item.quantity
            }
          }),
          {
            product_id: id,
            quantity: 1
          }
        ]
      });
      

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

        <h1>Produtos</h1>
        {loading ? (
        <p>Carregando...</p>
        ) : (
          <Grid>
            {data?.map((product) => (
              <GridItem>
                <img src={product.image} alt={product.name}  width="200" height="200"/>
                <h2>{product.name}</h2>
                <p>Preço: {product.price}</p>
                <p>Estoque: {product.stock}</p>
                {/* Adicione mais informações conforme necessário */}
                <ButtonComponent onClick={() => handlerAddToCart(product.id)}>Comprar</ButtonComponent>
                {/* <button onClick={() => handleDelete(product.id)}>Excluir</button> */}
              </GridItem>
            ))}
          </Grid>
        )}

      </PageContainer>
    );
}

export default ProductsListPage;
