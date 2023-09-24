import * as Yup from "yup";

export type LoginFormType = Yup.InferType<typeof LoginSchema>;

export const LoginSchema = Yup.object({
  email: Yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: Yup.string().required("Senha obrigatória"),
  remember: Yup.boolean(),
});
