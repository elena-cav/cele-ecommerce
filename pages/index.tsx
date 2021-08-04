import { client } from "../utils/Shopify-client";
import Link from "next/link";
import { Heading, Box, Link as link } from "@chakra-ui/layout";
import { Product } from "../types";

import NavBar from "../components/Header";
export default function Home({ products }: any) {
  return (
    <Box>
      <NavBar />
      <Heading> Cele Alghero</Heading>
    </Box>
  );
}

export async function getServerSideProps() {
  const products = await client.product.fetchAll();
  return { props: { products: JSON.parse(JSON.stringify(products)) } };
}
