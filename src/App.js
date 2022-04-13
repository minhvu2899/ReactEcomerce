// import Header1 =React.lazy(()=>import('components/Header1';
// import Dashboard =React.lazy(()=>import("features/dashboard/Dashboard";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import LayoutAdmin from "./LayoutAdmin";
import LayoutAuth from "./LayoutAuth";
import LoadingLinear from "components/LoadingLinear";
// import {Suppen}/
const PrivateRoute = React.lazy(() => import("components/PrivateRoute"));
const Dashboard = React.lazy(() => import("features/dashboard/Dashboard"));

const ForgotPasswordPage = React.lazy(() =>
  import("./features/Auth/pages/ForgotPasswordPage")
);
const ResetPasswordPage = React.lazy(() =>
  import("./features/Auth/pages/ResetPasswordPage")
);
const LoginPage = React.lazy(() => import("./features/Auth/pages/LoginPage"));
const RegisterPage = React.lazy(() =>
  import("./features/Auth/pages/RegisterPage")
);
const CartFeature = React.lazy(() => import("./features/Cart/index"));
const HomePage = React.lazy(() => import("./features/Home/pages/HomePage"));
const OrderFeature = React.lazy(() => import("./features/Order/index"));
const ProductFeature = React.lazy(() => import("./features/Product/index"));
const UserFeature = React.lazy(() => import("./features/User/index"));
const NotFound = React.lazy(() => import("./components/NotFound/index"));

function App() {
  // const user = useSelector((state) => state.user);

  return (
    <Suspense fallback={<LoadingLinear />}>
      <Routes>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route path="*" element={<Dashboard />} />
          {/* <Route path="product/*" element={<ManageProductFeature />} /> */}
        </Route>
        <Route path="/auth" element={<LayoutAuth />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="resetPassword/:token" element={<ResetPasswordPage />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="product/*" element={<ProductFeature />} />
          <Route path="cart/*" element={<CartFeature />} />
          <Route path="blog/*" element={<ProductFeature />} />
          <Route path="promotion/*" element={<ProductFeature />} />
          <Route element={<PrivateRoute />}>
            <Route path="order/*" element={<OrderFeature />} />
            <Route path="user/*" element={<UserFeature />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* <Route>
        <Layout> */}
        {/* <Switch>
              <Route path="/" component={HomePage} exact></Route>
              <Route
                path="/forgot-password"
                component={ForgotPassWordPage}
              ></Route>
              <Route
                path="/reset-password"
                component={ResetPassWordPage}
              ></Route>
              <Route path="/products" component={ProductFeature}></Route>
              <Route path="/cart" component={CartFeature}></Route>
              <Route path="/order" component={OrderFeature}></Route>
              <Route path="/user" component={UserFeature}></Route>
              <PrivateRoute
                path="/profile"
                component={UserFeature}
              ></PrivateRoute>

              <Route component={NotFound}></Route>
            </Switch> */}
        {/* </Layout>
      </Route> */}
      </Routes>
    </Suspense>
  );
}

export default App;
