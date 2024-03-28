import React from "react";
import { ChevronDown, ChevronUp } from "../icons";
import { useDispatch } from "react-redux";
import { removeItem, toggleAmount } from "../features/cart/cartSlice";

const CartItem = ({ id, img, title, price, amount }) => {
  const dispatch = useDispatch();

  return (
    <article className="cart-item">
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className="item-price">${price}</h4>
        <button
          type="button"
          className="remove-btn"
          onClick={() => dispatch(removeItem(id))}
        >
          remove
        </button>
      </div>
      <div>
        <button
          type="button"
          className="amount-btn"
          onClick={() => dispatch(toggleAmount({ id, type: "inc" }))}
        >
          <ChevronUp />
        </button>
        <p className="amount">{amount}</p>
        <button
          type="button"
          className="amount-btn"
          onClick={() => {
            if (amount > 1) {
              dispatch(toggleAmount({ id, type: "dec" }));
            } else {
              dispatch(removeItem(id));
            }
          }}
        >
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};

export default CartItem;