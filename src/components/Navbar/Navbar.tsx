import { useState } from "react";
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

import { FaHeadphones, FaChartPie, FaPlug, FaBook, FaUserAlt, FaSitemap, FaShoppingBag, FaShoppingCart } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { ImArrowLeft2 } from "react-icons/im";
import { ImArrowRight2 } from "react-icons/im";
import { BsFillFileEarmarkBarGraphFill } from "react-icons/bs";

import logo from "../../assets/logo.svg";
import user from "../../assets/user.png";
import { ButtonComponent } from "../Button/styles";
import { useAuth } from "../../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";


const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { signOut } = useAuth();
  const navigate = useNavigate();
  return (
    <NavbarContainer isOpen={isExpanded}>
      <div>
        <NavbarHeader>
          <NavbarLogo isOpen={isExpanded} src={logo} alt="logotipo fale mais voip" />
        </NavbarHeader>

        <Icon type="button" onClick={() => setIsExpanded(props => !props)} isOpen={isExpanded}>
          {isExpanded ? <ImArrowLeft2 className="arrow" size={12} /> : <ImArrowRight2 className="arrow" size={12} />}
        </Icon>

        <NavbarMenu>
          <NavbarMenuItem to="/dashboard" isOpen={isExpanded}>
            <FaChartPie className="icon" size={18} />
            <span>Dashboard</span>
          </NavbarMenuItem>

          <NavbarMenuItem to="/user" isOpen={isExpanded}>
            <FaUserAlt className="icon" size={18} />
            <span>Usuarios</span>
          </NavbarMenuItem>

          
          <NavbarMenuItem to="/product" isOpen={isExpanded}>
            <FaShoppingBag className="icon" size={18} />
            <span>Produtos</span>
          </NavbarMenuItem>

          <NavbarMenuItem to="/cart" isOpen={isExpanded}>
            <FaShoppingCart className="icon" size={18} />
            <span>Pedidos</span>
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
          
        </NavbarMenu>
      </div>

      {/* <NavbarMenu> */}
        {/* <NavbarMenuItem to="/settings" isOpen={isExpanded}> */}
          {/* <IoSettingsSharp className="icon" size={18} /> */}
          {/* {isExpanded && <span>Configurações</span>} */}
        {/* </NavbarMenuItem> */}
      {/* </NavbarMenu> */}

      <NavbarFooter>
        <ProfileImage src={user} alt="imagem profile" isOpen={isExpanded} />

        <ProfileContainer isOpen={isExpanded}>
          <ProfileName>Duduu202 FullStack :D</ProfileName>
          <ProfileOccupation>Administrador</ProfileOccupation>
          <ButtonComponent
          type="button"
          onClick={() => {
            signOut();
            navigate('/login');
          }}
        >
          logout
        </ButtonComponent>
        </ProfileContainer>
      </NavbarFooter>
    </NavbarContainer>
  );
}

export default Navbar;
