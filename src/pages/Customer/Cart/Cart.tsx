
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import api from "../../../services/api";
import { Container } from "../../../styles/style";
import { PageContainer } from "./styles";
import { IPaginatedResponse } from "../../../Interfaces/IPaginatedResponse";
import { IProductDTO } from "../Products/dto/ProductDTO";
import { ICartDTO } from "../CartRequests/dto/CartDTO";
import { ButtonComponent } from "../../../components/Button/styles";

const route = '/cart';
const CartPage = () => {
  const [ data, setData ] = useState<ICartDTO>();
  const [ loading, setLoading ] = useState(true);
  const handleRemoveItem = async (id: string) => {
    let currentCart = await api.get<ICartDTO>('/cart/current_cart');

    console.log("currentCart", currentCart.data);
  
    const cart = currentCart.data;

    const items = cart.cart_items.filter((item) => {
      return item.id !== id && item.quantity > 0;
    } );

    await api.put('/cart/' + cart.id, {
      items: items.map((item) => {
        return {
          product_id: item.product.id,
          quantity: item.quantity
        }
      }
      )
      
    });
    
    window.location.reload();
  }
  useEffect(() => {
    const fetchData = async () => {
        const { data } = await api.get<ICartDTO>('/cart/current_cart');
        console.log("data", data);
        setData(data);
        setLoading(false);
    }
    fetchData();



}, []);
  return (
    <PageContainer>
      <Navbar />
      <Container>
        <h1>Carrinho</h1>
        <div>
          <div>
            {data?.cart_items.map((item) => {
              return (
                <div>
                  <h1>produto: </h1>  <h3>{item.product.name}</h3>
                  <h1>descrição: </h1> <h3>{item.product.description}</h3>
                  <h1>preço: </h1> <h3>{item.product.price}</h3>
                  <h1>quantidade: </h1> <h3>{item.quantity}</h3>
                  <ButtonComponent onClick={() => handleRemoveItem(item.id)}>remover</ButtonComponent>
                  <h1>_________________</h1>
                </div>
              )
            })}
          </div>
        </div>

      </Container>
    </PageContainer>
  );
}

export default CartPage;
