import {
  Flex,
  Spacer,
  Box,
  Text,
  Image,
  Stack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import NavBar from "../../components/Header";
import { useState } from "react";
import Carousel from "../../components/carousel";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Product, Img } from "../../types";
import { client } from "../../utils/Shopify-client";
import { GetServerSideProps } from "next";
import { addProductToCart } from "../../utils/Cart";
export default function ProductPage({ products }: { products: Product }) {
  const { description, images, title, variants, vendor } = products;
  const addToCart = async () => {
    try {
      console.log("Fired");
      addProductToCart([
        {
          variantId: selectedId,
          quantity: 1,
        },
      ]);
    } catch (e) {
      console.log("ERROR", e);
    }
  };

  interface ColorPair {
    color: string;
    src: string;
  }
  interface SizePair {
    size: string;
    id: string;
  }
  const colorsImgs: ColorPair[] = [];
  variants.forEach((v) => {
    const color = v.selectedOptions[0].value;
    const src = v.image.src;

    if (!colorsImgs.some((e) => e.color === color)) {
      colorsImgs.push({ color, src });
    }
  });

  const [selectedColor, setColor] = useState({
    color: colorsImgs[0].color,
    src: colorsImgs[0].src,
  });
  const [selectedSize, setSize] = useState("");
  const [selectedId, setId] = useState("");
  const sizes: SizePair[] = [];
  variants.forEach((v) => {
    const color = v.selectedOptions[0].value;
    const size = v.selectedOptions[1].value;
    const id = v.id;
    if (color === selectedColor.color) sizes.push({ size, id });
  });
  return (
    <Box>
      <NavBar />
      <Carousel images={images} selectedColor={selectedColor} />
      <Stack direction="row">
        {colorsImgs.map((c) => {
          return (
            <Image
              boxSize="70px"
              objectFit="cover"
              src={c.src}
              alt={`${title}, ${c.color}`}
              onClick={() => {
                setColor({ color: c.color, src: c.src });
                setSize("");
              }}
              cursor="pointer"
            />
          );
        })}
      </Stack>

      <Menu>
        <MenuButton
          px={4}
          py={2}
          transition="all 0.2s"
          borderRadius="none"
          borderWidth="1px"
          width="200px"
          _hover={{ bg: "gray" }}
          _expanded={{ bg: "gray" }}
        >
          {selectedSize === "" ? (
            <Text fontSize="sm">
              Seleziona una taglia <ChevronDownIcon />
            </Text>
          ) : (
            <Text fontSize="sm">{selectedSize}</Text>
          )}
        </MenuButton>
        <MenuList borderRadius="none">
          {sizes.map((s) => {
            return (
              <MenuItem
                _hover={{ bg: "gray" }}
                transition="all 0.2s"
                fontSize="sm"
                onClick={() => {
                  setSize(s.size);
                  setId(s.id);
                }}
                key={s.id}
              >
                {s.size}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
      <Button onClick={addToCart}>Acquista</Button>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const products = await client.product.fetch(query.item);
  return { props: { products: JSON.parse(JSON.stringify(products)) } };
};
