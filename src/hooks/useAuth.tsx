import { createContext, useContext, useState } from "react";

export interface IUser {
  user: User;
  access_token: string;
}

export interface Address {
  id?: string;
  user_id?: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  zip_code: string;
  created_at?: string;
  updated_at?: string;
}

export interface User {
  id: string;
  phone: string;
  name: string;
  CPF: string;
  email: string;
  password?: string;
  role: string;
  address?: Address[];
  created_at: string ;
  updated_at: string;
}

interface IAuthContextProps {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  signIn: (user: IUser) => void;
  signOut: () => void;
  getUser: () => IUser;
  isAuthenticated: boolean;
}

interface ChildrenProps {
  children: React.ReactNode;
}

const AuthContext = createContext({} as IAuthContextProps);

export function AuthProvider({ children }: ChildrenProps) {
  const [user, setUser] = useState<IUser>(() => {
    const user = localStorage.getItem("@token:user");

    if (user) {
      return JSON.parse(user);
    }

    return null;
  });

  const isAuthenticated = !!user;

  console.log(isAuthenticated, user);

  const signIn = (user: IUser) => {
    localStorage.setItem("@token:user", JSON.stringify(user));
    localStorage.setItem("@token:accessToken", user.access_token);
    localStorage.setItem("@token:refreshToken", user.access_token);
    setUser(user);
  }

  const getUser = () => {
    const user = localStorage.getItem("@token:user");

    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  const signOut = () => {
    localStorage.removeItem("@token:user");
    localStorage.removeItem('@token:accessToken');
    localStorage.removeItem('@token:refreshToken');
    setUser({} as IUser);
  }

  return (
    <AuthContext.Provider value={{ user, setUser, signIn, signOut, isAuthenticated, getUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

export const useAuth = () => useContext(AuthContext);
