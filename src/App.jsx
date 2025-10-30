import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Auth from "./auth/Auth";
import PublicLayout from "./components/layout/PublicLayout";
import PrivateLayout from "./components/layout/PrivateLayout";
import Homepage from "./pages/Homepage/Homepage";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import { getCustomerDetail } from "./features/customer/customerAction";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import { fetchAllCategoriesAction } from "./features/category/categoryAction";

import Category from "./pages/Category/Category";
import Checkout from "./pages/Checkout";
import ThankYou from "./pages/ThankYou";
import Verify from "./pages/Verify/Verify";
import Order from "./pages/Order";
import UserProfile from "./pages/UserProfile/UserProfile";
import { fetchAllProductsAction } from "./features/product/productAction";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RecentPurchase from "./pages/RecentPurchase";
import NotFound from "./pages/NotFound";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustomerDetail());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllCategoriesAction());
    dispatch(fetchAllProductsAction());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Homepage />} />
          <Route path="product/:slug" element={<ProductDetail />} />
          <Route path="auth" element={<AuthPage />} />

          {/* Instead of creating multiple static routes (listing each routes), creating a dynamic route which handles all the categories  */}

          <Route
            path="/category/:category/:subCategory"
            element={<Category />}
          />

          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="cart" element={<Cart />} />
          <Route path="verify" element={<Verify />} />
        </Route>

        <Route
          element={
            <Auth>
              <PrivateLayout />
            </Auth>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="manage-account" element={<UserProfile />} />
          <Route path="orders" element={<Order />} />
          <Route path="recent-purchases" element={<RecentPurchase />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="thank-you" element={<ThankYou />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer
        position="top-right"
        theme="light"
        autoClose={2000}
        closeOnClick
        newestOnTop
        draggable
      />
    </>
  );
}

export default App;
