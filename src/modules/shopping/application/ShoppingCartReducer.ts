import {
  addItem,
  Cart,
  CartItem,
  removeItem,
  updateCartValues,
} from "../domain/Cart";

type ShoppingCartAction =
  | { type: "ADD_ITEM"; item: CartItem }
  | { type: "REMOVE_ITEM"; item: CartItem };

const shoppingCartReducer = (state: Cart, action: ShoppingCartAction): Cart => {
  switch (action.type) {
    case "ADD_ITEM":
      const nextItemsAdd = addItem(action.item, state.items);
      return updateCartValues({
        ...state,
        quantity: state.quantity + action.item.quantity,
        items: nextItemsAdd,
      });
    case "REMOVE_ITEM":
      const nextItemsRemove = removeItem(action.item, state.items);
      return updateCartValues({
        ...state,
        quantity: state.quantity - 1,
        items: nextItemsRemove,
      });
    default:
      throw new Error("Unsupported action type");
  }
};

export default shoppingCartReducer;
