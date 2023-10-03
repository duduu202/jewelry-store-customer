import { PropsWithChildren, createContext, useContext, useMemo } from "react";
import { ICart } from "../Interfaces/cart";
import useQueryGet from "../services/queryGet";
import handleError from "../utils/message";
import api from "../services/api";

interface CartContextData {
  cart: ICart | undefined;
  addProduct: (productId: string) => Promise<void>;
  removeProduct: (productId: string) => Promise<void>;
}

const cartContext = createContext<CartContextData>({} as CartContextData);

const CartProvider = ({ children }: PropsWithChildren) => {
  const { data: cart, refetch: refetchCart } = useQueryGet<ICart>({
    queryKey: ["cart"],
    url: "/cart/current_cart",
  });
  const addProduct = async (productId: string) => {
    if (!cart) return;
    try {
      await api.put(`/cart/${cart.id}`, {
        items: [
          ...cart.cart_items.map((item) => {
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
    await api.put(`/cart/${cart.id}`, {
      items: items.map((item) => {
        return {
          product_id: item.product.id,
          quantity: item.quantity,
        };
      }),
    });
    refetchCart();
  };
  const memo = useMemo(
    () => ({
      cart,
      addProduct,
      removeProduct,
    }),
    [cart]
  );
  return <cartContext.Provider value={memo}>{children}</cartContext.Provider>;
};
export default CartProvider;
export const useCart = () => useContext(cartContext);
