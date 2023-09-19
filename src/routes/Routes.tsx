import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { useAuth } from '../hooks/useAuth';
import HomePage from '../pages/Home/Home';
import PrivateRoute from './RoutesPrivate';
import LoginPage from '../pages/Login/Login';
import UserListPage from '../pages/Master/User/UserList';
import UserEditPage from '../pages/Master/User/UserEditor';
import UserCreatePage from '../pages/Master/User/UserCreate';
import ProductsListPage from '../pages/Master/Products/ProductsList';
import CartsListPage from '../pages/Master/Carts/CartsList';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
        />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/user" element={<UserListPage />} />
          <Route path="/product" element={<ProductsListPage />} />
          <Route path="/cart" element={<CartsListPage />} />
          {/* <Route path="/users/edit/:id" element={<UserEditPage />} /> */}
          {/* <Route path="/users/create" element={<UserCreatePage />} /> */}
        </Route>

        <Route path="/login" element={<LoginPage />} />

      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default AppRoutes;
