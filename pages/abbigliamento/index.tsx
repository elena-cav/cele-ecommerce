import { client } from "../../utils/Shopify-client";
import Link from "next/link";
import {
  Heading,
  Box,
  Image,
  Text,
  HStack,
  Icon,
  Button,
  Flex,
  Link as Clink,
  VStack,
  createIcon,
  useBreakpointValue,
} from "@chakra-ui/react";
import { BsHeart, BsHeartFill } from "react-icons/bs";

import { Product } from "../../types";
export default function Home({ products }: any) {
  const HeartIcon = createIcon({
    displayName: "HeartIcon",
    viewBox: "-1 -1 40 30",
    d: "M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z",
  });

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
          <VStack key={id}>
            <Link href={`/abbigliamento/${id}`}>
              <a>
                <VStack
                  height={["500px", "400px", "400px", "500px", "500px"]}
                  boxSize="150px"
                  objectFit="cover"
                  backgroundImage={images[0].src}
                  backgroundSize={"cover"}
                  backgroundPosition={"center center"}
                  align="flex-end"
                  justify="flex-end"
                >
                  <Button outline="none">
                    <HeartIcon
                      w={6}
                      h={6}
                      color="pink"
                      stroke="red"
                      _hover={{ color: "red" }}
                    />
                  </Button>
                </VStack>
                <Heading size="sm">{vendor}</Heading>
                <Text>{title}</Text>
                <Text>{variants[0].price}</Text>
              </a>
            </Link>
          </VStack>
        );
      })}
    </HStack>
  );
}

export async function getServerSideProps() {
  const products = await client.product.fetchAll();
  return { props: { products: JSON.parse(JSON.stringify(products)) } };
}
