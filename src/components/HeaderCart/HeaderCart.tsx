import { FaShoppingCart } from "react-icons/fa";
import { NavLinkProps } from "react-router-dom";
import { CartWrapper, Index } from "./styles";
import { useCart } from "../../contexts/cart";

interface Props extends NavLinkProps {}
const HeaderCart = ({ ...rest }: Props) => {
  const { cart } = useCart();
  const quantity = cart?.cart_items?.length;
  return (
    <CartWrapper {...rest}>
      <FaShoppingCart />
      <Index>{quantity || 0}</Index>
    </CartWrapper>
  );
};

export default HeaderCart;
