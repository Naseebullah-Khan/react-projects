import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;

    const tempItem = state.cart.find((item) => item.id === id + color);
    if (tempItem) {
      const tempCart = state.cart.map((item) => {
        if (item.id === id + color) {
          let newAmount = item.amount + amount;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          return { ...item, amount: newAmount };
        } else {
          return item;
        }
      });
      return { ...state, cart: tempCart };
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.image,
        price: product.price,
        max: product.stock,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }

  if (action.type === REMOVE_CART_ITEM) {
    return {
      ...state,
      cart: state.cart.filter((item) => item.id !== action.payload),
    };
  }

  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    // let tempCart;
    // if (value === "increase") {
    //   tempCart = state.cart.map((item) => {
    //     if (item.id === id) {
    //       item.amount + 1 > item.max
    //         ? (item.amount = item.max)
    //         : (item.amount += 1);
    //     }
    //     return item;
    //   });
    // }
    // if (value === "decrease") {
    //   tempCart = state.cart.map((item) => {
    //     if (item.id === id) {
    //       item.amount - 1 < 1 ? (item.amount = 1) : (item.amount -= 1);
    //     }
    //     return item;
    //   });
    // }
    const tempCart = state.cart.map((item) => {
      let newAmount;
      if (item.id === id) {
        if (value === "increase") {
          newAmount = item.amount + 1;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
        }
        if (value === "decrease") {
          newAmount = item.amount - 1;
          if (newAmount < 1) {
            newAmount = 1;
          }
        }
        return { ...item, amount: newAmount };
      } else {
        return item;
      }
    });

    return { ...state, cart: tempCart };
  }

  if (action.type === COUNT_CART_TOTALS) {
    const { totalAmount, totalItems } = state.cart.reduce(
      (acc, curr) => {
        acc.totalItems += curr.amount;
        acc.totalAmount += curr.amount * curr.price;
        return acc;
      },
      { totalAmount: 0, totalItems: 0 }
    );

    return {
      ...state,
      totalItems,
      totalAmount,
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
