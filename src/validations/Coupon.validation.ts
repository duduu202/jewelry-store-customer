import * as yup from "yup";

const CouponSchema = yup.object().shape({
  coupon: yup.string().required("O cupom está vazio"),
});

export default CouponSchema;
