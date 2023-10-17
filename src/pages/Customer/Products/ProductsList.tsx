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
import Header from "../../../components/Header/Header";
import Layout from "../../../components/Layout/Layout";
import useQueryList from "../../../services/queryList";
import useQueryInfinite from "../../../services/queryInfinite";
import { useCart } from "../../../contexts/CartContext";

const route = "/product";

const ProductsListPage = () => {
  // const { data } = await api.get('/user');
  console.log("ProductsListPage");
  // const {} = useQueryList<IProductDTO>({
  //   url: "/product",
  // });
  const { addProduct, refetchCart } = useCart();
  const { data, ref, refetch, isLoading } = useQueryInfinite<IProductDTO>({
    queryKey: ["product"],
    url: "/product",
  });
  const [cart, setCart] = useState<ICartDTO>();
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    await api.delete(`${route}/${id}`);
    refetch();
  };

  const handlerAddToCart = async (id: string) => {
    try {
      const currentCart = await api.get<ICartDTO>("/cart/current_cart");

      console.log("currentCart", currentCart.data);

      const cart = currentCart.data;

      await api.put(`/cart/${cart.id}`, {
        items: [
          ...cart.cart_items.map((item) => {
            return {
              product_id: item.product.id,
              quantity: item.quantity,
            };
          }),
          {
            product_id: id,
            quantity: 1,
          },
        ],
      });
    } catch (error) {
      handleError(error);
    }
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
    <Layout>
      <h1>Produtos</h1>
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <Grid>
          {data?.map((product) => (
            <GridItem>
              <img
                src={product.image}
                alt={product.name}
                width="200"
                height="200"
              />
              <h2>{product.name}</h2>
              <p>Preço: {product.price}</p>
              <p>Estoque: {product.stock_available}</p>
              {/* Adicione mais informações conforme necessário */}
              <ButtonComponent
                onClick={async () => {
                  await addProduct(product.id);
                  refetch();
                  refetchCart();
                }}
              >
                Comprar
              </ButtonComponent>
              {/* <button onClick={() => handleDelete(product.id)}>Excluir</button> */}
            </GridItem>
          ))}
        </Grid>
      )}
      <div ref={ref} />
    </Layout>
  );
};

export default ProductsListPage;
