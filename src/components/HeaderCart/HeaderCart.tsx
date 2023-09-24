import { FaShoppingCart } from "react-icons/fa";
import { NavLinkProps } from "react-router-dom";
import { CartWrapper, Index } from "./styles";

interface Props extends NavLinkProps {
  quantity?: number;
}
const HeaderCart = ({ quantity, ...rest }: Props) => {
  return (
    <CartWrapper {...rest}>
      <FaShoppingCart />
      <Index>{quantity || 0}</Index>
    </CartWrapper>
  );
};

export default HeaderCart;
