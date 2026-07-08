/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useReducer } from "react";
import { getProductId } from "../utils/formatters";

const CartContext = createContext(null);

const initialState = {
  items: JSON.parse(localStorage.getItem("rajendra_store_cart") || "[]"),
};

const persist = (items) => {
  localStorage.setItem("rajendra_store_cart", JSON.stringify(items));
  return items;
};

const cartReducer = (state, action) => {
  if (action.type === "add") {
    const productId = getProductId(action.product);
    const existing = state.items.find((item) => getProductId(item.product) === productId);
    const items = existing
      ? state.items.map((item) =>
          getProductId(item.product) === productId
            ? { ...item, quantity: item.quantity + action.quantity }
            : item,
        )
      : [...state.items, { product: action.product, quantity: action.quantity }];

    return { items: persist(items) };
  }

  if (action.type === "update") {
    const items = state.items
      .map((item) =>
        getProductId(item.product) === action.productId
          ? { ...item, quantity: Math.max(1, action.quantity) }
          : item,
      )
      .filter((item) => item.quantity > 0);

    return { items: persist(items) };
  }

  if (action.type === "remove") {
    return {
      items: persist(state.items.filter((item) => getProductId(item.product) !== action.productId)),
    };
  }

  if (action.type === "clear") {
    return { items: persist([]) };
  }

  return state;
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const value = useMemo(() => {
    const count = state.items.reduce((sum, item) => sum + item.quantity, 0);
    const total = state.items.reduce(
      (sum, item) => sum + Number(item.product?.price || 0) * item.quantity,
      0,
    );

    return {
      addItem: (product, quantity = 1) => dispatch({ product, quantity, type: "add" }),
      clearCart: () => dispatch({ type: "clear" }),
      count,
      items: state.items,
      removeItem: (productId) => dispatch({ productId, type: "remove" }),
      total,
      updateItem: (productId, quantity) => dispatch({ productId, quantity, type: "update" }),
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};
