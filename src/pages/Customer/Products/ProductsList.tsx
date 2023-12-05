import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { IProductDTO } from "./dto/ProductDTO";
import { ButtonComponent } from "../../../components/Button/styles";
import { Grid, GridItem } from "../../../components/Grid/style";
import { ICartDTO } from "../CartRequests/dto/CartDTO";
import Layout from "../../../components/Layout/Layout";
import useQueryInfinite from "../../../services/queryInfinite";
import { useCart } from "../../../contexts/CartContext";
import {} from "../../../components/InputTextFloat/styles";
import InputTextFloat from "../../../components/InputTextFloat/InputTextFloat";
import { PageTitle } from "../../../components/Layout/styles";
import { Container } from "../../../styles/style";
import { formatCurrency } from "../../../utils/formatCurrency";
import { theme } from "../../../styles/theme";

const route = "/product";
const ProductsListPage = () => {
  // const { data } = await api.get('/user');
  // const {} = useQueryList<IProductDTO>({
  //   url: "/product",
  // });
  const { addProduct, refetchCart } = useCart();

  const [searchInput, setSearchInput] = useState<string | undefined>(undefined);

  // refetchCart();
  const { data, ref, refetch, isLoading } = useQueryInfinite<IProductDTO>({
    queryKey: ["product"],
    url: "/product",
    search: searchInput,
  });

  const [cart, setCart] = useState<ICartDTO>();
  const navigate = useNavigate();

  const handleSearch = async (search: string) => {
    console.log("search", search);
    if (search === "") {
      setSearchInput(undefined);
      return;
    }
    setSearchInput(search);
  };

  const handleSearchDebounce = debounce(handleSearch, 250);

  useEffect(() => {
    refetch();
  }, [searchInput]);

  return (
    <Layout>
      <Container>
        <PageTitle>Produtos</PageTitle>

        <div
          style={{
            marginBottom: "20px",
            width: "40%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <InputTextFloat
            label="Pesquisar"
            type="text"
            onChange={(e) =>
              e.target.value
                ? handleSearchDebounce(e.target.value)
                : handleSearch("")
            }
          />
          {/* <InputTextFloat label="Categoria" type="text" /> */}
        </div>

        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          <Grid>
            {data?.map((product, index) => (
              <GridItem id={String(index)}>
                <img
                  style={{
                    borderRadius: "10px",
                    // shadow
                    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
                  }}
                  src={product.image}
                  alt={product.name}
                  width="200"
                  height="200"
                />
                <span>{product.name}</span>
                {/* Adicione mais informações conforme necessário */}
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <ButtonComponent
                      onClick={async () => {
                        await addProduct(product.id);
                        refetch();
                        refetchCart();
                      }}
                    >
                      Comprar
                    </ButtonComponent>
                  </div>
                  <div>
                    <h4 style={{ color: theme.colors.primary }}>
                      Preço: {formatCurrency(product.price)}
                    </h4>
                    <p>Estoque: {product.stock_available}</p>
                  </div>
                </div>
                {/* <button onClick={() => handleDelete(product.id)}>Excluir</button> */}
              </GridItem>
            ))}
          </Grid>
        )}
        <div ref={ref} />
      </Container>
    </Layout>
  );
};

export default ProductsListPage;
