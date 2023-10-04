export interface ICoupon {
  id: string;
  user_id: string;
  type: string;
  code: string;
  quantity: number;
  discount: number;
  expires_at: null;
  created_at: string;
  updated_at: string;
}
