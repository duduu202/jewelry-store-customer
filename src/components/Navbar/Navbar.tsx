import { useState } from "react";

import {
  FaHeadphones,
  FaChartPie,
  FaPlug,
  FaBook,
  FaUserAlt,
  FaSitemap,
  FaShoppingBag,
  FaShoppingCart,
  FaHistory,
  FaCreditCard,
  FaMoneyBill,
} from "react-icons/fa";
import { GrHistory } from "react-icons/gr";
import { IoSettingsSharp } from "react-icons/io5";
import { ImArrowLeft2 } from "react-icons/im";
import { ImArrowRight2 } from "react-icons/im";
import { BsFillFileEarmarkBarGraphFill } from "react-icons/bs";

import { Navigate, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import user from "../../assets/user.png";
import { ButtonComponent } from "../Button/styles";
import { useAuth } from "../../hooks/useAuth";
import {
  NavbarContainer,
  NavbarHeader,
  NavbarLogo,
  NavbarMenuItem,
  NavbarMenu,
  NavbarFooter,
  ProfileContainer,
  ProfileImage,
  ProfileName,
  ProfileOccupation,
  Icon,
} from "./styles";

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { signOut, getUser } = useAuth();
  const navigate = useNavigate();
  return (
    <NavbarContainer isOpen={isExpanded}>
      <div>
        <NavbarMenu>
          <NavbarHeader>
            <NavbarLogo
              isOpen={isExpanded}
              src={logo}
              alt="logotipo fale mais voip"
            />
          </NavbarHeader>

          <NavbarMenuItem to="/product" isOpen={isExpanded}>
            <FaShoppingBag className="icon" size={18} />
            <span>Produtos</span>
          </NavbarMenuItem>

          <NavbarMenuItem to="/cartRequests" isOpen={isExpanded}>
            <FaHistory className="icon" size={18} />
            <span>Historico de Compras</span>
          </NavbarMenuItem>

          <NavbarMenuItem to="/payment_card" isOpen={isExpanded}>
            <FaCreditCard className="icon" size={18} />
            <span>Cartões</span>
          </NavbarMenuItem>

          <NavbarMenuItem to="/address" isOpen={isExpanded}>
            <FaCreditCard className="icon" size={18} />
            <span>Endereços</span>
          </NavbarMenuItem>

          <NavbarMenuItem to="/coupon" isOpen={isExpanded}>
            <FaMoneyBill className="icon" size={18} />
            <span>Cupons</span>
          </NavbarMenuItem>

          {/*  */}
          {/* <NavbarMenuItem to="/reports" isOpen={isExpanded}> */}
          {/* <BsFillFileEarmarkBarGraphFill className="icon" size={18} /> */}
          {/* <span>Relatórios</span> */}
          {/* </NavbarMenuItem> */}
          {/*  */}
          {/* <NavbarMenuItem to="/rules" isOpen={isExpanded}> */}
          {/* <FaBook className="icon" size={18} /> */}
          {/* <span>Termos de Uso</span> */}
          {/* </NavbarMenuItem> */}
          {/*  */}
          {/* <NavbarMenuItem to="/contacts" isOpen={isExpanded}> */}
          {/* <FaUserAlt className="icon" size={18} /> */}
          {/* <span>Contatos</span> */}
          {/* </NavbarMenuItem> */}

          <NavbarFooter>
            <NavbarMenuItem to="/cart" isOpen={isExpanded}>
              <FaShoppingCart className="icon" size={18} />
              <span>Carrinho</span>
            </NavbarMenuItem>
            <ProfileImage src={user} alt="imagem profile" isOpen={isExpanded} />

            <ProfileContainer isOpen={isExpanded}>
              <ProfileName>{getUser().user.name}</ProfileName>
              {/* <ProfileOccupation>Administrador</ProfileOccupation> */}
              <ButtonComponent
                type="button"
                onClick={() => {
                  signOut();
                  navigate("/login");
                }}
              >
                logout
              </ButtonComponent>
            </ProfileContainer>
          </NavbarFooter>
        </NavbarMenu>
      </div>

      {/* <NavbarMenu> */}
      {/* <NavbarMenuItem to="/settings" isOpen={isExpanded}> */}
      {/* <IoSettingsSharp className="icon" size={18} /> */}
      {/* {isExpanded && <span>Configurações</span>} */}
      {/* </NavbarMenuItem> */}
      {/* </NavbarMenu> */}
    </NavbarContainer>
  );
};

export default Navbar;
