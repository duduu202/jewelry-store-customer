import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import api from "../../../services/api";
import { Container } from "../../../styles/style";
import { PageContainer } from "./styles";
import { IPaginatedResponse } from "../../../Interfaces/IPaginatedResponse";
import { IProductDTO } from "../Products/dto/ProductDTO";
import { ICartDTO } from "../CartRequests/dto/CartDTO";
import { ButtonComponent } from "../../../components/Button/styles";
import Layout from "../../../components/Layout/Layout";
import GenericList from "../../../components/GenericList/GenericList";
import ListEditor from "../../../components/GenericEditor/ListEditor";
import { GenericListCell } from "../../../components/GenericList/styles";
import { useNavigate } from "react-router-dom";

const route = "/cart";
const CartPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<ICartDTO>();
  const [loading, setLoading] = useState(true);
  const handleRemoveItem = async (id: string) => {
    const currentCart = await api.get<ICartDTO>("/cart/current_cart");

    console.log("currentCart", currentCart.data);

    const cart = currentCart.data;

    const items = cart.cart_items.filter((item) => {
      return item.id !== id && item.quantity > 0;
    });

    await api.put(`/cart/${cart.id}`, {
      items: items.map((item) => {
        return {
          product_id: item.product.id,
          quantity: item.quantity,
        };
      }),
    });

    window.location.reload();
  };
  const handleAddItem = async (id: string) => {
    const currentCart = await api.get<ICartDTO>("/cart/current_cart");

    console.log("currentCart", currentCart.data);

    const cart = currentCart.data;

    const items = cart.cart_items?.map((item) => {
      if (item.id === id) {
        return {
          product_id: item.product.id,
          quantity: item.quantity + 1,
        };
      }
      return {
        product_id: item.product.id,
        quantity: item.quantity,
      };
    });

    await api.put(`/cart/${cart.id}`, {
      items: items.map((item) => {
        return {
          product_id: item.product_id,
          quantity: item.quantity,
        };
      }),
    });

    window.location.reload();
  };

  const handleRemoveOneItem = async (id: string) => {
    const currentCart = await api.get<ICartDTO>("/cart/current_cart");

    console.log("currentCart", currentCart.data);

    const cart = currentCart.data;

    const items = cart.cart_items?.map((item) => {
      if (item.id === id) {
        return {
          product_id: item.product.id,
          quantity: item.quantity - 1,
        };
      }
      return {
        product_id: item.product.id,
        quantity: item.quantity,
      };
    });

    await api.put(`/cart/${cart.id}`, {
      items: items.map((item) => {
        return {
          product_id: item.product_id,
          quantity: item.quantity,
        };
      }),
    });

    window.location.reload();
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get<ICartDTO>("/cart/current_cart");
      console.log("data", data);
      setData(data);
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <Layout>
      <h1>Carrinho</h1>
      <Container>
        <div>
          {/* <GenericList
              column_names={["name", "price", "quantity"]}
              data={data?.cart_items.map((item) => {
                return {
                  id: item.id,
                  items: [item.product.name, item.product.price, item.quantity],
                };
              })}
            /> */}
          <GenericList
            column_names={["name", "price", "quantity", "ações"]}
            data={data?.cart_items?.map((item) => {
              return {
                id: item.id,
                items: [
                  item.product.name,
                  item.product.price * item.quantity,
                  item.quantity,
                  <div>
                    <ButtonComponent onClick={() => handleAddItem(item.id)}>
                      +1
                    </ButtonComponent>
                    <ButtonComponent
                      onClick={() => handleRemoveOneItem(item.id)}
                    >
                      -1
                    </ButtonComponent>
                    <ButtonComponent onClick={() => handleRemoveItem(item.id)}>
                      Remover
                    </ButtonComponent>
                  </div>,
                ],
              };
            })}
          />
          <GenericListCell>Total: {data?.total_price}</GenericListCell>
          <ButtonComponent onClick={() => navigate("/cart/pay")}>
            Finalizar Compra
          </ButtonComponent>
        </div>
      </Container>
    </Layout>
  );
};

export default CartPage;
