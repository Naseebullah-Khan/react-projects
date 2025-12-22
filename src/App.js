import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { calculateTotals, getCartItems } from "./features/cart/cartSlice";

import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import Modal from "./components/Modal";

// const url = "https://course-api.com/react-useReducer-cart-project";

function App() {
  const { cartItems, isLoading } = useSelector((state) => state.cart);
  const { isModalOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const calculateTotalsUseCallback = useCallback(() => {
    dispatch(calculateTotals());
  }, [dispatch]);

  useEffect(() => {
    calculateTotalsUseCallback();
  }, [calculateTotalsUseCallback, cartItems]);

  const getCartItemsUseCallback = useCallback(() => {
    dispatch(getCartItems("/.netlify/functions/fetch-cart-products"));
  }, [dispatch]);

  useEffect(() => {
    getCartItemsUseCallback();
  }, [getCartItemsUseCallback]);

  if (isLoading) {
    return (
      <div className="loading">
        <h1>loading...</h1>
      </div>
    );
  }

  return (
    <main>
      {isModalOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
