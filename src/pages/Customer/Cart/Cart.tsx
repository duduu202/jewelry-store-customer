import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import api from "../../../services/api";
import { Container } from "../../../styles/style";
import { PageContainer } from "./styles";
import { IPaginatedResponse } from "../../../Interfaces/IPaginatedResponse";
import { IProductDTO } from "../Products/dto/ProductDTO";
import { ICartDTO } from "../CartRequests/dto/CartDTO";
import { ButtonComponent } from "../../../components/Button/styles";
import Layout from "../../../components/Layout/Layout";

import useQueryList from "../../../services/queryList";
import useQueryGet from "../../../services/queryGet";
import GenericList from "../../../components/GenericList/GenericList";
import { GenericListCell } from "../../../components/GenericList/styles";
import { useCart } from "../../../contexts/CartContext";
import { formatCurrency } from "../../../utils/formatCurrency";
import { PageTitle } from "../../../components/Layout/styles";

const route = "/cart";
const CartPage = () => {
  const navigate = useNavigate();

  const { cart, changeProductQuantity, removeProduct, refetchCart } = useCart();

  const { data, isFetching } = useQueryGet<ICartDTO>({
    queryKey: ["cart"],
    url: "/cart/current_cart",
  });
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
  return (
    <Layout>
      <PageTitle>Carrinho</PageTitle>
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
            data={cart?.cart_items?.map((item) => {
              return {
                id: item.id,
                items: [
                  item.product.name,
                  formatCurrency(item.product.price * item.quantity),
                  item.quantity,
                  <div>
                    <ButtonComponent
                      onClick={() =>
                        changeProductQuantity(item.id, item.quantity + 1)
                      }
                    >
                      +1
                    </ButtonComponent>
                    <ButtonComponent
                      onClick={() =>
                        changeProductQuantity(item.id, item.quantity - 1)
                      }
                    >
                      -1
                    </ButtonComponent>
                    <ButtonComponent onClick={() => removeProduct(item.id)}>
                      Remover
                    </ButtonComponent>
                  </div>,
                ],
              };
            })}
          />
          <GenericListCell>
            Total: {formatCurrency(data?.total_price)}
          </GenericListCell>
          <ButtonComponent onClick={() => navigate("/cart/pay")}>
            Finalizar Compra
          </ButtonComponent>
        </div>
      </Container>
    </Layout>
  );
};

export default CartPage;
