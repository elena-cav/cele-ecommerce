import { client } from "../utils/Shopify-client";
import Link from "next/link";
import { Heading, Box, Link as link } from "@chakra-ui/layout";
import { Product } from "../types";
import Navbar from "../components/navBar";
export default function Home({ products }: any) {
  return (
    <Box>
      <Navbar />
      Hello
      {products.map(({ title, id }: Product) => {
        return (
          <Box>
            <Link href={`/${title}`}>
              <Heading as="h1">{title}</Heading>
            </Link>
          </Box>
        );
      })}
    </Box>
  );
}

export async function getServerSideProps() {
  const products = await client.product.fetchAll();
  return { props: { products: JSON.parse(JSON.stringify(products)) } };
}
