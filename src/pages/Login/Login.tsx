import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../hooks/useAuth";
import api from "../../services/api";
import handleError from "../../utils/message";
import InputTextFloat from "../../components/InputTextFloat/InputTextFloat";
import { ButtonSubmit, Container, Form, FormContainer } from "./styles";
import { LoginFormType, LoginSchema } from "../../validations/Login.validation";

const loginRoute = "/user/session";
type FieldValues = {
  email: string;
  password: string;
  remember?: boolean;
};
const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<FieldValues>({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: "Eduardoliveira154@gmail.com",
      password: "12345678",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (value) => {
    try {
      const { data } = await api.post(loginRoute, {
        email: value.email,
        password: value.password,
        remember_me: true,
      });
      console.log(data);
      signIn(data);
      navigate("/");
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <Container>
      <h2>Login</h2>
      <FormContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputTextFloat
            label="Email"
            type="email"
            {...register("email")}
            error={errors.email?.message?.toString()}
          />
          <InputTextFloat
            type="password"
            label="Senha"
            {...register("password")}
            error={errors.password?.message?.toString()}
          />

          <ButtonSubmit type="submit" disabled={isSubmitting}>
            Login
          </ButtonSubmit>
        </Form>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </FormContainer>
    </Container>
  );
};

export default Login;
