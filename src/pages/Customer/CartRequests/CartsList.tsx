import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IPaginatedResponse } from "../../../Interfaces/IPaginatedResponse";
import api from "../../../services/api";
import { Container } from "../../../styles/style";
import GenericList from "../../../components/GenericList/GenericList";
import { ICartDTO } from "./dto/CartDTO";
import isIsoDate from "../../../utils/checkIsoDate";
import Layout from "../../../components/Layout/Layout";
import { Cart_status } from "../../../contexts/CartContext";

const route = "/cart";

const CartsListPage = () => {
  // const { data } = await api.get('/user');
  const [datas, setDatas] = useState<ICartDTO[]>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get<IPaginatedResponse<ICartDTO>>(route);
      console.log("data", data.results);
      setDatas(data.results);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <Container>
        <h1>Pedidos</h1>
        <div>
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <div>
              <GenericList
                column_names={[
                  "Items",
                  "Status",
                  "Valor Total",
                  "Data",
                  "Trocar Item",
                ]}
                data={datas?.map((item) => {
                  return {
                    id: item.id,
                    items: [
                      item.cart_items
                        ?.map((itm) => itm.product.name)
                        .join(", ") || "",
                      item.is_current ? "Carrinho Atual" : item?.status || "",
                      item.total_price,
                      isIsoDate(item.updated_at)
                        ? new Date(item.updated_at).toLocaleDateString()
                        : "",
                      item.status == Cart_status.ENTREGUE ? (
                        <button
                          type="button"
                          onClick={() => {
                            navigate(`/cartRequests/exchange/${item.id}`);
                          }}
                        >
                          Trocar Item
                        </button>
                      ) : (
                        ""
                      ),
                    ],
                    highlight: item.is_current,
                  };
                })}
              />
            </div>
          )}
        </div>
      </Container>
    </Layout>
  );
};

export default CartsListPage;
