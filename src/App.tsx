import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";

const Cart = lazy(() => import(/* webpackChunkName: "Cart" */ "./pages/Cart"));
const CreamDetails = lazy(
  () => import(/* webpackChunkName: "CreamDetails" */ "./pages/CreamDetails")
);
const NotFound = lazy(
  () => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound")
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="/cream/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <CreamDetails />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
