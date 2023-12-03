import { PropsWithChildren, createContext, useContext, useMemo } from "react";
import { ICart } from "../Interfaces/cart";
import useQueryGet from "../services/queryGet";
import handleError from "../utils/message";
import api from "../services/api";

interface CartContextData {
  cart: ICart | undefined;
  addProduct: (productId: string) => Promise<void>;
  changeProductQuantity: (productId: string, quantity: number) => Promise<void>;
  removeProduct: (productId: string) => Promise<void>;
  refetchCart: () => void;
}
export enum Cart_status {
  EM_PROCESSAMENTO = "EM_PROCESSAMENTO",
  EM_TRANSITO = "EM_TRANSITO",
  ENTREGUE = "ENTREGUE",
  EM_TROCA = "EM_TROCA",
  TROCA_AUTORIZADA = "TROCA_AUTORIZADA",
  REPROVADA = "REPROVADA",
  APROVADA = "APROVADA",
}

const cartContext = createContext<CartContextData>({} as CartContextData);

const CartProvider = ({ children }: PropsWithChildren) => {
  const { data: cart, refetch: refetchCart } = useQueryGet<ICart>({
    queryKey: ["cart"],
    url: "/cart/current_cart",
  });
  const addProduct = async (productId: string) => {
    console.log("productId", productId);
    if (!cart) return;
    try {
      const alreadyExists = cart?.cart_items
        ? cart?.cart_items.some((item) => item.product.id === productId)
        : false;
      if (alreadyExists) {
        console.log("cart", cart);
        await api.put(`/cart/${cart.id}`, {
          items: [
            ...cart.cart_items.map((item) => {
              return {
                product_id: item.product.id,
                quantity:
                  item.product.id === productId
                    ? item.quantity + 1
                    : item.quantity,
              };
            }),
          ],
        });
      } else {
        await api.put(`/cart/${cart.id}`, {
          items: [
            ...(cart?.cart_items || []).map((item) => {
              return {
                product_id: item.product.id,
                quantity: item.quantity,
              };
            }),
            {
              product_id: productId,
              quantity: 1,
            },
          ],
        });
      }

      refetchCart();
    } catch (error) {
      handleError(error);
    }
  };
  const changeProductQuantity = async (productId: string, quantity: number) => {
    if (!cart) return;
    try {
      await api.put(`/cart/${cart.id}`, {
        items: [
          ...cart.cart_items.map((item) => {
            return {
              product_id: item.product.id,
              quantity: item.id === productId ? quantity : item.quantity,
            };
          }),
        ],
      });
      refetchCart();
    } catch (error) {
      handleError(error);
    }
  };
  const removeProduct = async (productId: string) => {
    if (!cart) return;
    const items = cart.cart_items.filter((item) => {
      return item.id !== productId && item.quantity > 0;
    });
    try {
      await api.put(`/cart/${cart.id}`, {
        items: items.map((item) => {
          return {
            product_id: item.product.id,
            quantity: item.quantity,
          };
        }),
      });
    } catch (error) {
      handleError(error);
    }

    refetchCart();
  };
  const memo = useMemo(
    () => ({
      cart,
      addProduct,
      removeProduct,
      changeProductQuantity,
      refetchCart,
    }),
    [cart]
  );
  return <cartContext.Provider value={memo}>{children}</cartContext.Provider>;
};
export default CartProvider;
export const useCart = () => useContext(cartContext);
