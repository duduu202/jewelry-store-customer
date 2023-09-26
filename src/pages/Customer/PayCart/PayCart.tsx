import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import api from "../../../services/api";
import { Container } from "../../../styles/style";

import { IPaginatedResponse } from "../../../Interfaces/IPaginatedResponse";
import { IProductDTO } from "../Products/dto/ProductDTO";
import { ICartDTO } from "../CartRequests/dto/CartDTO";
import { ButtonComponent } from "../../../components/Button/styles";
import Layout from "../../../components/Layout/Layout";
import GenericList from "../../../components/GenericList/GenericList";
import ListEditor from "../../../components/GenericEditor/ListEditor";
import { GenericListCell } from "../../../components/GenericList/styles";
import { useNavigate } from "react-router-dom";
import { SideDiv } from "./styles";
import handleError from "../../../utils/message";

const route = "/cart";
const PayCartPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<ICartDTO>();
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState<any>();
  const [cards, setCards] = useState<any>();
  const [selectedAddress, setSelectedAddress] = useState<any>();
  const [selectedCards, setSelectedCards] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get<IPaginatedResponse<any>>("/address");
      console.log("data", data.results);
      setAddress(data.results);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get<IPaginatedResponse<any>>("/payment_card");
      console.log("data", data.results);
      setCards(data.results);
    };
    fetchData();
  }, []);

  const addCard = (id: string, percentage?: number) => {
    // verify if card exists in selectedCards
    console.log("addCard", id, percentage);

    const card = selectedCards.find((item) => item.id === id);

    // remove
    if (card && !percentage) {
      const newCards = selectedCards?.filter((item) => item.id !== id);
      console.log("newCards", newCards, id);
      setSelectedCards(newCards);
      console.log("selectedCards", selectedCards);
      return;
    }

    //edit
    if (card && percentage) {
      const newCards = selectedCards?.map((item) => {
        if (item.id === id) {
          return {
            id,
            percentage,
          };
        }
        return item;
      });
      setSelectedCards(newCards);
      console.log("selectedCards", selectedCards);
      return;
    }

    // add
    setSelectedCards([
      ...selectedCards,
      {
        id,
        percentage: percentage,
      },
    ]);
    console.log("selectedCards", selectedCards);
  };

  const setPercentagePerCard = (id: string, percentage: number) => {
    console.log("setPercentagePerCard");

    // verify if card exists in selectedCards
    // if not, add it

    // if exists, update percentage

    const card = cards?.find((item) => item.id === id);

    if (!card) {
      const card = {
        id,
        percentage,
      };

      setCards([...cards, card]);
    } else {
      card.percentage = percentage;
    }
    console.log(selectedCards);
  };

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

    const items = cart.cart_items.map((item) => {
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

    const items = cart.cart_items.map((item) => {
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

  const PayCart = async () => {
    try {
      console.log("selectedAddress", selectedAddress, !selectedCards);
      if (!selectedAddress) {
        throw new Error("Selecione um endereço");
      }
      const currentCart = await api.get<any>("/cart/current_cart");
      const address = await api.get<any>(`/address/${selectedAddress}`);
      const payment_cards = selectedCards?.map((item) => {
        return {
          payment_card_id: item.id,
          percentage: item.percentage,
        };
      });

      const postObject = {
        address_id: address.data.id,
        payment_cards,
      };

      console.log("postObject", postObject);

      const result = await api.post(
        "/cart/pay/" + currentCart.data.id,
        postObject
      );
    } catch (error) {
      handleError(error);
    }
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
      <Container>
        <SideDiv>
          <div>
            <h1>Carrinho</h1>
            <GenericList
              column_names={["name", "preço", "quantidade", "ações"]}
              data={data?.cart_items.map((item) => {
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
                      <ButtonComponent
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remover
                      </ButtonComponent>
                    </div>,
                  ],
                };
              })}
            />
          </div>
          <div>
            <h1>Selecione o Endereço</h1>
            <GenericList
              column_names={[
                "rua",
                "numero",
                "cidade",
                "estado",
                "cep",
                "Ações",
              ]}
              data={address?.map((item) => {
                return {
                  id: item.id,
                  highlight: item.id === selectedAddress,
                  items: [
                    item.street,
                    item.number,
                    item.city,
                    item.state,
                    item.zip_code,
                    <ButtonComponent
                      onClick={() => setSelectedAddress(item.id)}
                    >
                      Selecionar
                    </ButtonComponent>,
                  ],
                };
              })}
            />
            <h1>Selecione os Cartões</h1>
            <GenericList
              column_names={[
                "Primeiros 4 digitos",
                "Últimos 4 digitos",
                "Bandeira",
                "Titular do cartão",
                "Ações",
                "Porcentagem",
              ]}
              data={cards?.map((item) => {
                return {
                  id: item.id,
                  highlight: selectedCards?.find((card) => card.id === item.id),
                  items: [
                    item.first_four_digits,
                    item.last_four_digits,
                    item.brand,
                    item.holder_name,
                    <ButtonComponent onClick={() => addCard(item.id)}>
                      Selecionar
                    </ButtonComponent>,
                    <input
                      type="number"
                      value={item.percentage}
                      onChange={(e) => {
                        const percentage = Number(e.target.value);
                        if (percentage > 100 || percentage < 0) {
                          return;
                        }
                        addCard(item.id, percentage);
                      }}
                    />,
                  ],
                };
              })}
            />
          </div>
        </SideDiv>
        <GenericListCell>Total: {data?.total_price}</GenericListCell>
        <div>
          cupons
          <input type="text" />
        </div>
        <ButtonComponent onClick={() => PayCart()}>Pagar</ButtonComponent>
      </Container>
    </Layout>
  );
};

export default PayCartPage;