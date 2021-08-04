import Cookies from "js-cookie";
import { client } from "./Shopify-client";

const addProductToCart = async (product) => {
  Cookies.remove("cart");
  let checkoutId = Cookies.get("checkoutId");
  if (checkoutId === "undefined") {
    checkoutId = await createCheckout();
  }
  Cookies.set("checkoutId", checkoutId);
  const cart = await client.checkout.addLineItems(checkoutId, product);
  console.log("CART", cart);
  await storeCart(cart);
};
const getCart = async () => {
  return JSON.parse(window.localStorage.getItem("cart"));
};

type Cart = {
  lineItems: string;
  totalPrice: string;
  totalPriceV2: string;
  TotalTax: string;
  id: string;
  currencyCode: string;
  subTotalPrice: string;
  webUrl: string;
};

const storeCart = async (cart: { cart: Cart }) => {
  const storage = window.localStorage;
  storage.setItem("cart", JSON.stringify(cart));
};
const createCheckout = async () => {
  const { id } = await client.checkout.create();
  return id;
};
export { addProductToCart, getCart, createCheckout, storeCart };
