import {
  FaCreditCard,
  FaHistory,
  FaMoneyBill,
  FaShoppingBag,
} from "react-icons/fa";

const headerOptions = [
  {
    label: "Produtos",
    path: "/product",
    icon: FaShoppingBag,
  },
  {
    label: "Historico de Compras",
    path: "/cartRequests",
    icon: FaHistory,
  },
  {
    label: "Cartões",
    path: "/payment_card",
    icon: FaCreditCard,
  },
  {
    label: "Endereços",
    path: "/address",
    icon: FaShoppingBag,
  },
  {
    label: "Cupons",
    path: "/coupon",
    icon: FaMoneyBill,
  },
];
export default headerOptions;
