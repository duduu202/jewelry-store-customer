import { IProductDTO } from "../../Products/dto/ProductDTO";

export interface ICartItemDTO {
  id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  product: IProductDTO;
}

export interface ICartDTO {
  id: string;
  user_id: string;
  status: string;
  created_at: string;
  updated_at: string;
  paid_status: string;
  expires_at: string;
  is_current: boolean;

  cupom_id: string | undefined;
  address_id: string | undefined;
  delivery_fee: number;
  cupom: any | undefined;
  cart_items: ICartItemDTO[];
  products_price: number;
  discount: number;
  total_price: number;
}

export interface ICartExchangeDTO {
  cart_id: string;
  cart_items: Partial<ICartItemDTO>[];
}
