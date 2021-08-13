import axios from "axios";
const request = axios.create({
  baseURL:
    "https://5926a255671519b4bb0562e47eadd063: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@cele-boutique-alghero.myshopify.com/admin/api/2021-07",

  //   headers: {
  //     'Content-Type': 'application/json',
  //     'X-Shopify-Access-Token': '90acfe9b17a451bc9164d499f90f2e6d'
  //   }
});
export const fetchProducts = () => {
  return request.get("/products.json").then(({ data }) => {
    return data.products;
  });
};
export const fetchCustomers = () => {
  return request.get("/customers.json").then(({ data }) => {
    return data.customers;
  });
};
export const postCostumer = (body) => {
  return request.post("/customers.json", body).then(({ data }) => {
    return data.customers;
  });
};
