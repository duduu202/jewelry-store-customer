import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { useAuth } from '../hooks/useAuth';
import HomePage from '../pages/Home/Home';
import PrivateRoute from './RoutesPrivate';
import LoginPage from '../pages/Login/Login';
import UserListPage from '../pages/Customer/User/UserList';
import UserEditPage from '../pages/Customer/User/UserEditor';
import UserCreatePage from '../pages/Customer/User/UserCreate';
import ProductsListPage from '../pages/Customer/Products/ProductsList';
import CartsListPage from '../pages/Customer/CartRequests/CartsList';
import CartPage from '../pages/Customer/Cart/Cart';
import CardListPage from '../pages/Customer/Card/Card';
import AddressListPage from '../pages/Customer/Address/Address';
import CuponsListPage from '../pages/Customer/Cupons/Cupons';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/product" /> : <Navigate to="/login" />}
        />

        <Route element={<PrivateRoute />}>
          <Route path="/user" element={<UserListPage />} />
          <Route path="/product" element={<ProductsListPage />} />
          <Route path="/cartRequests" element={<CartsListPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment_card" element={<CardListPage />} />
          <Route path="/address" element={<AddressListPage />} />
          <Route path="/coupon" element={<CuponsListPage />} />
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
