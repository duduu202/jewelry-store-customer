import * as Yup from 'yup';

export type ChargeForm = Yup.InferType<typeof LoginSchema>;

export const LoginSchema = Yup.object({
  email: Yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  password: Yup.string().required('Senha obrigatória'),
  remember: Yup.boolean(),
});
