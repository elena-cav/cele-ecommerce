import axios from "axios";
const request = axios.create({
  baseURL:
    "https://d0d730242e23db6e1f42d8c7d0d6c526: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@cele-alghero.myshopify.com/admin/api/2021-07",

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

export const fetchProductsByKeyword = (keyword) => {
  return request.get(`/products/${keyword}`).then(({ data }) => {
    return data.products;
  });
};

// POST /admin/api/2021-07/customers.json
// {
//   "customer": {
//     "first_name": "Steve",
//     "last_name": "Lastnameson",
//     "email": "steve.lastnameson@example.com",
//     "phone": "+15142546011",
//     "verified_email": true,
//     "addresses": [
//       {
//         "address1": "123 Oak St",
//         "city": "Ottawa",
//         "province": "ON",
//         "phone": "555-1212",
//         "zip": "123 ABC",
//         "last_name": "Lastnameson",
//         "first_name": "Mother",
//         "country": "CA"
//       }
//     ],
//     "password": "newpass",
//     "password_confirmation": "newpass",
//     "send_email_welcome": false
//   }
// }
