import { VStack, Button, createIcon, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { Product } from "../types";
import { useState } from "react";
export default function ProductCard({
  title,
  id,
  images,
  vendor,
  variants,
}: {
  title: Product["title"];
  vendor: Product["vendor"];
  id: Product["id"];
  images: Product["images"];
  variants: Product["variants"];
}) {
  const HeartIcon = createIcon({
    displayName: "HeartIcon",
    viewBox: "-1 -1 40 30",
    d: "M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z",
  });
  const [wishlist, toggleWishlist] = useState(false);
  const updateWishlist = (id: string) => {
    console.log("ID", id);
  };
  return (
    <VStack key={id}>
      <Link href={`/abbigliamento/${id}`}>
        <a>
          <VStack
            marginBottom="0.5em"
            boxSize={["150px", "200px", "250px"]}
            objectFit="cover"
            backgroundImage={images[0].src}
            backgroundSize={"cover"}
            backgroundPosition={"center center"}
            align="flex-end"
            justify="flex-end"
          >
            <Button
              ringColor="none"
              outline={0}
              boxShadow="none"
              onClick={(e) => {
                e.preventDefault();
                updateWishlist(id);
                toggleWishlist(!wishlist);
              }}
            >
              <HeartIcon
                w={6}
                h={6}
                color={wishlist ? "red" : "white"}
                stroke="red"
                _hover={{ color: wishlist ? "red" : "white" }}
              />
            </Button>
          </VStack>
          <VStack marginBottom="0.5em" lineHeight="0.6em">
            <Heading fontSize="sm" textTransform="uppercase" size="sm">
              {vendor}
            </Heading>
            <Text fontSize="sm">{title}</Text>
            <Text fontWeight="600" fontSize="sm">
              € {variants[0].price}
            </Text>
          </VStack>
        </a>
      </Link>
    </VStack>
  );
}
