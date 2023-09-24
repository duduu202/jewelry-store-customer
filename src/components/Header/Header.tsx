import {
  Container,
  Logo,
  NavItem,
  NavList,
  Navbar,
  NavbarLink,
  RightSide,
} from "./styles";
import logo from "../../assets/logo.svg";
import headerOptions from "./Header.options";
import { useAuth } from "../../hooks/useAuth";
import userImg from "../../assets/user.png";
import HeaderProfile from "../HeaderProfile/HeaderProfile";
import HeaderCart from "../HeaderCart/HeaderCart";

const Header = () => {
  const { user } = useAuth();
  return (
    <Container>
      <Logo src={logo} alt="logotipo fale mais voip" />
      <RightSide>
        <Navbar>
          <NavList>
            {headerOptions.map((option) => (
              <NavItem key={option.path}>
                <NavbarLink to={option.path}>
                  <option.icon className="icon" />
                  {option.label}
                </NavbarLink>
              </NavItem>
            ))}
          </NavList>
        </Navbar>
        <HeaderCart to="/cart" />
        <HeaderProfile />
      </RightSide>
    </Container>
  );
};

export default Header;
