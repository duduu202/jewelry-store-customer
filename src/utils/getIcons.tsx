
import { ImPriceTag } from 'react-icons/im';
import { MdPerson, MdEmail, MdLock, MdLocationPin, MdLocalOffer, MdOutlineCreditCard, MdContacts, MdPhone, MdOutlineCalendarToday, MdShoppingBasket, MdShortText } from 'react-icons/md';

function Icon(props: any) {
  const { iconType } = props;

  let iconComponent;

  switch (iconType) {
    case 'user': // usar no nome do usuário
      iconComponent = <MdPerson color={props.color} size={18} />;
      break;
    case 'email': // usar para o email
      iconComponent = <MdEmail color={props.color} size={18}/>;
      break;
    case 'cpf': // usar para CPF
      iconComponent = <MdContacts color={props.color} size={18}/>;
      break;
    case 'phone': // usar para telefone
      iconComponent = <MdPhone color={props.color} size={18}/>;
      break;
    case 'date': // usar para campos de datas (nascimento, validado do cartão,...)
      iconComponent = <MdOutlineCalendarToday color={props.color} size={18}/>;
      break;
    case 'password': // usar para senha
      iconComponent = <MdLock color={props.color} size={18}/>;
      break;
    case 'pin': // usar para campos de endereço (CEP, Rua, estado,...)
      iconComponent = <MdLocationPin color={props.color} size={18}/>;
      break;
    case 'coupon': // usar para código do cupom
      iconComponent = <MdLocalOffer color={props.color} size={18}/>;
      break;
    case 'card': // usar para os campos do cartão
      iconComponent = <MdOutlineCreditCard color={props.color} size={18}/>;
      break;
    case 'price':
      iconComponent = <ImPriceTag color={props.color} size={18}/>;
      break;
    case 'product': // usar para os campos do cadastro de produtos
      iconComponent = <MdShoppingBasket color={props.color} size={18}/>;
      break;
    case 'text': // usar para os campos de textos (reclamações, observações, ...)
      iconComponent = <MdShortText color={props.color} size={18}/>;
      break;
    default:
      iconComponent = null;
  }

  return iconComponent;
}

export default Icon;
