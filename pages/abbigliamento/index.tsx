import { client } from "../../utils/Shopify-client";
import Link from "next/link";
import { Heading, Box, Image, Text } from "@chakra-ui/react";
import { Product } from "../../types";
import Navbar from "../../components/navBar";
export default function Home({ products }: any) {
  return (
    <Box>
      <Navbar />
      {products.map(({ title, id, images, variants, vendor }: Product) => {
        return (
          <Box key={id}>
            <Link href={`/abbigliamento/${id}`}>
              <a>
                <Image
                  boxSize="150px"
                  objectFit="cover"
                  src={images[0].src}
                ></Image>
                <Heading size="sm">{vendor}</Heading>
                <Text>{title}</Text>
                <Text>{variants[0].price}</Text>
              </a>
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
