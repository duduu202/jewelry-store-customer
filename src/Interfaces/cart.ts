import { IProduct } from "./products";

export interface ICart {
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
  cart_items: ICartItem[];
  products_price: number;
  discount: number;
  total_price: number;
}

export interface ICartItem {
  id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  product: IProduct;
}
