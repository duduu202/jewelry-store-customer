import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BsTrashFill } from "react-icons/bs";
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
import {
  GenericListCell,
  GenericListCell2,
} from "../../../components/GenericList/styles";
import {
  BasicCells,
  Button,
  ButtonIcon,
  CoupomCell,
  CoupomHead,
  CouponSection,
  Coupons,
  InputWrapper,
  SideDiv,
} from "./styles";
import handleError, { handleSuccess } from "../../../utils/message";
import { formatCurrency } from "../../../utils/formatCurrency";
import InputTextFloat from "../../../components/InputTextFloat/InputTextFloat";
import { ICoupon } from "../../../Interfaces/coupon";
import CouponSchema from "../../../validations/Coupon.validation";
import { useCart } from "../../../contexts/CartContext";
import { PageTitle } from "../../../components/Layout/styles";
import { Address, IPaymentCard } from "../../../hooks/useAuth";
import { Modal } from "../../../components/Modal/Modal";
import { ModalContent } from "../../../components/Modal/styles";
import Editor from "../../../components/GenericEditor/Editor";

const routeCart = "/cart";
const routeAddress = "/address";
const routePaymentCard = "/payment_card";
type CoupomFormValue = {
  coupon: string;
};
const PayCartPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<ICartDTO>();
  const [addresses, setAddresses] = useState<Address[]>();
  const [cards, setCards] = useState<any[]>();

  const [deliveryAddress, setdeliveryAddress] = useState<Address | undefined>();
  const [chargeAddress, setChargeAddress] = useState<Address | undefined>();
  const [selectedCards, setSelectedCards] = useState<any[]>([]);
  const [chargeAddressIsSame, setChargeAddressIsSame] = useState<boolean>(true);
  const [coupomInput, setCoupomInput] = useState<string>("");
  const [coupons, setCoupons] = useState<ICoupon[]>([]);
  const { refetchCart } = useCart();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const {
    register: couponRegister,
    formState: { errors: couponErrors },
    handleSubmit: couponHandleSubmit,
    setError: couponSetError,
    reset: couponReset,
  } = useForm<CoupomFormValue>({
    resolver: yupResolver(CouponSchema),
  });

  const setAddressAndHighlight = (item: Address) => {
    if (deliveryAddress) {
      Object.assign(deliveryAddress, { highlight: false });
    }
    Object.assign(item, { highlight: true });
    setdeliveryAddress(item);
    return item;
  };

  const setChargeAddressAndHighlight = (item: Address) => {
    if (chargeAddress) {
      Object.assign(chargeAddress, { highlight: false });
    }
    Object.assign(item, { highlight: true });
    setChargeAddress(item);
    return item;
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data: fetch } = await api.get<IPaginatedResponse<Address>>(
        routeAddress
      );
      setAddresses(fetch.results);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data: fetch } = await api.get<IPaginatedResponse<any>>(
        routePaymentCard
      );
      setCards(fetch.results);
    };
    fetchData();
  }, []);

  const addCard = (id: string, percentage?: number) => {
    const card = selectedCards.find((item) => item.id === id);
    // remove
    if (card && !percentage) {
      const newCards = selectedCards?.filter((item) => item.id !== id);
      console.log("newCards", newCards, id);
      setSelectedCards(newCards);
      console.log("selectedCards", selectedCards);
      return;
    }

    // edit
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
      return;
    }

    // add
    setSelectedCards([
      ...selectedCards,
      {
        id,
        percentage,
      },
    ]);
    console.log("selectedCards", selectedCards);
  };

  const getPercentageValue = (percentage = 0) => {
    console.log("getPercentageValue", percentage, data?.total_price);
    return (data?.total_price * percentage) / 100;
  };

  const handleRemoveItem = async (id: string) => {
    const currentCart = await api.get<ICartDTO>("/cart/current_cart");

    console.log("currentCart", currentCart.data);

    const cart = currentCart.data;

    const items = cart.cart_items.filter((item) => {
      return item.id !== id && item.quantity > 0;
    });

    await api.put(`/cart/${cart.id}`, {
      items: items?.map((item) => {
        return {
          product_id: item.product.id,
          quantity: item.quantity,
        };
      }),
    });
    const currentRefetch = await api.get<ICartDTO>("/cart/current_cart");
    setData(currentRefetch.data);
    // window.location.reload();
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
      items: items?.map((item) => {
        return {
          product_id: item.product_id,
          quantity: item.quantity,
        };
      }),
    });

    const currentRefetch = await api.get<ICartDTO>("/cart/current_cart");
    setData(currentRefetch.data);
    // window.location.reload();
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
      items: items?.map((item) => {
        return {
          product_id: item.product_id,
          quantity: item.quantity,
        };
      }),
    });

    const currentRefetch = await api.get<ICartDTO>("/cart/current_cart");
    setData(currentRefetch.data);
    // window.location.reload();
  };

  const handleAddCoupom = couponHandleSubmit(async (value: CoupomFormValue) => {
    try {
      const { data: resData } = await api.get<ICoupon>(
        `/coupon/${value.coupon}`
      );
      console.log(resData);

      // if (coupons.find((item) => item.id === resData.id)) {
      //  return;
      // }
      console.log(resData.quantity);

      if (resData.quantity <= 0) {
        couponSetError("coupon", {
          message: "Cupom esgotado",
          type: "value",
        });
        return;
      }
      setCoupons((prev) => [...prev, resData]);
      couponReset({
        coupon: "",
      });
    } catch (error) {
      couponSetError("coupon", {
        message: "Cupom inválido",
        type: "value",
      });
    }
  });
  const handleRemoveCoupon = (id: string) => {
    setCoupons((prev) => prev.filter((o) => o.id !== id));
  };

  const discountedTotalPrice =
    (data?.total_price || 0) -
    coupons.reduce((prev, coupon) => prev + coupon.discount, 0);

  const delivery_fee = data?.delivery_fee || 0;

  const [products_price, setProducts_price] = useState<number>(0);

  const PayCart = async () => {
    try {
      console.log("deliveryAddress", deliveryAddress, !!deliveryAddress);
      console.log("chargeAddress", chargeAddress, !!chargeAddress);
      console.log("chargeAddressIsSame", chargeAddressIsSame);
      if (!deliveryAddress) {
        throw new Error("Selecione um endereço de entrega");
      }
      if (!chargeAddressIsSame && !chargeAddress) {
        throw new Error("Selecione um endereço de cobrança");
      }
      const currentCart = await api.get<any>("/cart/current_cart");
      const payment_cards = selectedCards?.map((item) => {
        return {
          payment_card_id: item.id,
          percentage: item.percentage,
        };
      });

      const postObject = {
        delivery_address_id: deliveryAddress.id,
        charge_address_id: chargeAddressIsSame
          ? deliveryAddress.id
          : chargeAddress!.id,
        payment_cards,
        coupon_codes: coupons.map((o) => o.id),
      };

      console.log("postObject", postObject);

      const result = await api.post(
        `/cart/pay/${currentCart.data.id}`,
        postObject
      );
      handleSuccess("Compra realizada com sucesso");
      navigate("/cartRequests");
      refetchCart();
    } catch (error) {
      handleError(error);
    }
  };

  const handleSavePaymentCard = async (card: IPaymentCard) => {
    if (card.id) {
      await api.put(`${routePaymentCard}/${card.id}`, card);
    } else {
      await api.post(`${routePaymentCard}`, card);
    }
    setIsOpenModal(false);
    const { data: fetch } = await api.get<IPaginatedResponse<any>>(
      routePaymentCard
    );
    setCards(fetch.results);
    window.location.reload();
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get<ICartDTO>("/cart/current_cart");
      console.log(data);
      setProducts_price(data.products_price);
      setData(data);
    };
    fetchData();
  }, []);
  return (
    <Layout>
      <Container>
        <SideDiv>
          <div>
            <PageTitle>Carrinho</PageTitle>
            <GenericList
              column_names={["nome", "preço", "quantidade", "ações"]}
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
            <PageTitle>Selecione um endereço de entrega</PageTitle>
            <ListEditor
              route={routeAddress}
              preloadedData={addresses}
              actions={[
                {
                  name: "Selecionar",
                  onClick: (obj) => {
                    setAddressAndHighlight(obj);
                  },
                },
              ]}
              disableActions={false}
              objectKeys={{
                name: "nome",
                street: "rua",
                number: "número",
                district: "bairro",
                city: "cidade",
                state: "estado",
                zip_code: "CEP",
              }}
            />
            <div>
              <input
                type="checkbox"
                defaultChecked
                onChange={() => {
                  setChargeAddressIsSame(!chargeAddressIsSame);
                  if (chargeAddressIsSame) {
                    setChargeAddress(deliveryAddress);
                  } else {
                    setChargeAddress(undefined);
                  }
                }}
              />
              <span>Endereço de cobrança é o mesmo de entrega</span>
            </div>
            {!chargeAddressIsSame && (
              <>
                <PageTitle>Selecione um endereço de cobrança</PageTitle>
                <ListEditor
                  route={routeAddress}
                  preloadedData={addresses}
                  actions={[
                    {
                      name: "Selecionar",
                      onClick: (obj) => {
                        setChargeAddressAndHighlight(obj);
                      },
                    },
                  ]}
                  disableActions={false}
                  objectKeys={{
                    street: "rua",
                    number: "número",
                    district: "bairro",
                    city: "cidade",
                    state: "estado",
                    zip_code: "CEP",
                  }}
                />
              </>
            )}
          </div>
          <div>
            <PageTitle>Selecione os Cartões</PageTitle>
            <GenericList
              column_names={[
                "primeiros 4 digitos",
                "últimos 4 digitos",
                "bandeira",
                "titular do cartão",
                "ações",
                "porcentagem",
                "valor a ser pago",
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
                        item.percentage = percentage;
                        addCard(item.id, percentage);
                      }}
                    />,
                    formatCurrency(getPercentageValue(item.percentage)),
                  ],
                };
              })}
            />
            <ButtonComponent onClick={() => setIsOpenModal(true)}>
              Adicionar cartão
            </ButtonComponent>
            <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
              <ModalContent>
                <Editor
                  route={routePaymentCard}
                  objectKeys={{
                    first_four_digits: "primeiros 4 digitos",
                    last_four_digits: "últimos 4 digitos",
                    brand: "bandeira",
                    holder_name: "titular do cartão",
                    external_id: "ID externo",
                  }}
                  handleSave={handleSavePaymentCard}
                />
              </ModalContent>
            </Modal>
          </div>
          <CouponSection>
            <h1>Cupons</h1>
            <InputWrapper onSubmit={handleAddCoupom}>
              <InputTextFloat
                label="Inserir cupom"
                {...couponRegister("coupon")}
                error={couponErrors.coupon?.message}
              />
              <Button>Adicionar</Button>
            </InputWrapper>
            {coupons.length > 0 && (
              <Coupons>
                <CoupomHead>Código</CoupomHead>
                <CoupomHead>Valor aplicado</CoupomHead>
                <CoupomHead />
                {coupons.map((item) => (
                  <>
                    <CoupomCell>{item.code}</CoupomCell>
                    <CoupomCell>{formatCurrency(-item.discount)}</CoupomCell>
                    <ButtonIcon onClick={() => handleRemoveCoupon(item.id)}>
                      <BsTrashFill />
                    </ButtonIcon>
                  </>
                ))}
              </Coupons>
            )}
          </CouponSection>
        </SideDiv>
        <BasicCells>
          <GenericListCell>
            Valor dos produtos: +{formatCurrency(products_price)}
          </GenericListCell>
          <GenericListCell>
            Frete: +{formatCurrency(delivery_fee)}
          </GenericListCell>
          <GenericListCell>
            {discountedTotalPrice < 0 ? (
              <div>
                <span style={{ color: "red" }}>
                  Total: {formatCurrency(discountedTotalPrice)}
                </span>
              </div>
            ) : (
              <div>Total: {formatCurrency(discountedTotalPrice)}</div>
            )}
          </GenericListCell>
          {discountedTotalPrice < 0 && (
            <GenericListCell>
              <span style={{ color: "red" }}>
                Observação: Um cupom sera gerado com o valor restante
              </span>
            </GenericListCell>
          )}
        </BasicCells>

        <ButtonComponent onClick={() => PayCart()}>Pagar</ButtonComponent>
      </Container>
    </Layout>
  );
};

export default PayCartPage;
