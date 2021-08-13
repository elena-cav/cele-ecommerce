import { client } from "../../utils/Shopify-client";
import Link from "next/link";
import { useState } from "react";
import {
  HStack,
  Link as Clink,
  VStack,
  createIcon,
  useBreakpointValue,
} from "@chakra-ui/react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import ProductCard from "../../components/ProductCard";
import { Product } from "../../types";
export default function Home({ products }: any) {
  return (
    <HStack
      w={"full"}
      justify={"center"}
      mx={useBreakpointValue({ base: 4, md: 8 })}
      spacing="24px"
      flexWrap="wrap"
      marginRight="0.5em"
      marginLeft="0.5em"
    >
      {products.map(({ title, id, images, variants, vendor }: Product) => {
        return (
          <ProductCard
            title={title}
            key={id}
            id={id}
            images={images}
            variants={variants}
            vendor={vendor}
          />
        );
      })}
    </HStack>
  );
}

export async function getServerSideProps() {
  const products = await client.product.fetchAll();
  return { props: { products: JSON.parse(JSON.stringify(products)) } };
}
