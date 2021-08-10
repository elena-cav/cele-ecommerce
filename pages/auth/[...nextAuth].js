import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  providers: [
    // {
    //   id: "shopify",
    //   name: "Shopify",
    //   type: "oauth",
    //   version: "2.0",
    //   scope: "write_orders,read_customers",
    //   params: { grant_type: "authorization_code" },
    //   accessTokenUrl:
    //     "https://cele-alghero.myshopify.com/admin/oauth/access_token",
    //   authorizationUrl:
    //     "https://cele-alghero.myshopify.com/admin/oauth/authorize",
    //   profileUrl:
    //     "https://cele-alghero.myshopify.com/admin/api/2021-04/users/current.json",
    //   async profile(profile) {
    //     return {
    //       id: profile.id,
    //       name: `${profile.first_name} ${profile.last_name}`,
    //       email: profile.email,
    //     };
    //   },
    //   clientId: process.env.SHOPIFY_CLIENT_ID,
    //   clientSecret: process.env.SHOPIFY_CLIENT_SECRET,
    // },
    Providers.Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  database: {
    type: "sqlite",
    database: ":memory:",
    sync: true,
  },
};
export default (req, res) => NextAuth(req, res, options);
