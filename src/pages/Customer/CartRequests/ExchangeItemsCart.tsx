import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  BsArrowRight,
  BsFillArrowRightSquareFill,
  BsTrashFill,
} from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
import { ImArrowLeft, ImArrowRight } from "react-icons/im";
import api from "../../../services/api";
import { Container } from "../../../styles/style";

import { IPaginatedResponse } from "../../../Interfaces/IPaginatedResponse";

import { ButtonComponent } from "../../../components/Button/styles";
import Layout from "../../../components/Layout/Layout";
import GenericList from "../../../components/GenericList/GenericList";
import { GenericListCell } from "../../../components/GenericList/styles";
import {
  Button,
  ButtonIcon,
  CoupomCell,
  CoupomHead,
  CouponSection,
  Coupons,
  InputWrapper,
  SideDiv,
  SideToSideDiv,
} from "../PayCart/styles";

import handleError, { handleSuccess } from "../../../utils/message";
import { formatCurrency } from "../../../utils/formatCurrency";
import InputTextFloat from "../../../components/InputTextFloat/InputTextFloat";
import { ICoupon } from "../../../Interfaces/coupon";
import CouponSchema from "../../../validations/Coupon.validation";
import { ICartDTO, ICartExchangeDTO } from "./dto/CartDTO";

const route = "/cart";
type CoupomFormValue = {
  coupon: string;
};

interface IPostBody {
  items: [
    {
      product_id: string;
      quantity: number;
    }
  ];
}

const ExchangeItemsCartPage = (props: any) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState<ICartDTO>();
  const [dataExchange, setDataExchange] = useState<ICartExchangeDTO>();
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState<any>();
  const [cards, setCards] = useState<any>();
  const [selectedCards, setSelectedCards] = useState<any[]>([]);
  const [coupons, setCoupons] = useState<ICoupon[]>([]);

  const {
    register: couponRegister,
    formState: { errors: couponErrors },
    handleSubmit: couponHandleSubmit,
    setError: couponSetError,
    reset: couponReset,
  } = useForm<CoupomFormValue>({
    resolver: yupResolver(CouponSchema),
  });

  const handleAddItemToExchange = async (id: string) => {
    const itemA = data?.cart_items?.find((item) => item.id === id);
    if (!itemA) return;

    itemA.quantity -= 1;

    const itemExchange = dataExchange?.cart_items?.find(
      (item) => item?.product?.id === id
    );

    if (itemExchange?.quantity) {
      itemExchange.quantity++;
    } else {
      dataExchange?.cart_items?.push({
        product: itemA?.product,
        quantity: 1,
      });
    }

    setDataExchange({ ...dataExchange });
    setData({ ...data });
  };

  const handleMoveItem = async (
    from: ICartDTO | ICartExchangeDTO,
    to: ICartDTO | ICartExchangeDTO,
    id: string
  ) => {
    const itemA = from?.cart_items?.find((item) => item.id === id);
    if (!itemA) return;

    itemA.quantity -= 1;
    const itemExchange = to?.cart_items?.find((item) => item?.id === id);

    if (itemExchange?.quantity) {
      itemExchange.quantity++;
    } else {
      to?.cart_items?.push({
        id,
        product: itemA?.product,
        quantity: 1,
      });
    }

    if (itemA?.quantity <= 0) {
      from.cart_items = from.cart_items.filter((item) => item.id !== id);
    }

    if (from.id) {
      setData({ ...from });
    } else {
      setDataExchange({ ...from });
    }

    if (to.id) {
      setData({ ...to });
    } else {
      setDataExchange({ ...to });
    }
  };

  const handleRequestExchange = async () => {
    try {
      const { data: response } = await api.post<IPostBody>(
        `/cart/refund/${id}`,
        {
          items: dataExchange?.cart_items?.map((item) => {
            return {
              product_id: item?.product?.id,
              quantity: item.quantity,
            };
          }),
        }
      );

      handleSuccess("Troca solicitada com sucesso");
      navigate("/cartRequests");
    } catch (err) {
      handleError(err);
    }
  };

  const discountedTotalPrice =
    (data?.total_price || 0) -
    coupons.reduce((prev, coupon) => prev + coupon.discount, 0);

  useEffect(() => {
    const fetchData = async () => {
      const { data: fetch } = await api.get<ICartDTO>(`/cart/${id}`);
      setData(fetch);
      const datasExchange: ICartExchangeDTO = {
        cart_id: fetch.id,
        cart_items: [],
      };
      setDataExchange(datasExchange);
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <Layout>
      <Container>
        <SideToSideDiv>
          <div>
            <h1>Carrinho Atual</h1>
            <GenericList
              column_names={["name", "preço", "quantidade", "ações"]}
              data={data?.cart_items?.map((item) => {
                return {
                  id: item.id,
                  items: [
                    item.product.name,
                    item.product.price * item.quantity,
                    item.quantity,
                    <div>
                      <ButtonComponent
                        onClick={() =>
                          handleMoveItem(data, dataExchange, item?.id)
                        }
                      >
                        <ImArrowRight />
                      </ButtonComponent>
                    </div>,
                  ],
                };
              })}
            />
          </div>
          <ButtonComponent onClick={() => handleRequestExchange()}>
            Solicitar Troca
          </ButtonComponent>
        </SideToSideDiv>
        <SideToSideDiv>
          <div>
            <h1>Itens para trocar</h1>
            <GenericList
              column_names={["ações", "name", "preço", "quantidade"]}
              data={dataExchange?.cart_items?.map((item) => {
                return {
                  id: item.id,
                  items: [
                    <div>
                      <ButtonComponent
                        onClick={() =>
                          handleMoveItem(dataExchange, data, item?.id)
                        }
                      >
                        <ImArrowLeft />
                      </ButtonComponent>
                    </div>,
                    item.product?.name,
                    item.product?.price * item?.quantity,
                    item.quantity,
                  ],
                };
              })}
            />
          </div>
        </SideToSideDiv>
      </Container>
    </Layout>
  );
};

export default ExchangeItemsCartPage;
