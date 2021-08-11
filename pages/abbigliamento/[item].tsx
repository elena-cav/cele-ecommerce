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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import Carousel from "../../components/carousel";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Product, Img } from "../../types";
import { client } from "../../utils/Shopify-client";
import { GetServerSideProps } from "next";
import { addProductToCart } from "../../utils/Cart";
import * as api from "../../utils/api";

export default function ProductPage({
  products,
  otherProducts,
}: {
  products: Product;
  otherProducts: any;
}) {
  const { description, images, title, variants, vendor } = products;
  console.log(variants);
  interface ColorPair {
    color: string;
    src: string;
  }
  interface SizePair {
    size: string;
    id: string;
  }
  const colorsImgs: ColorPair[] = [];
  const sizes: SizePair[] = [];
  const [selectedSize, setSize] = useState("");
  const [selectedId, setId] = useState("");
  const [alert, toggleAlert] = useState(false);
  variants.forEach((v) => {
    const selectedOptions = v.selectedOptions;
    const isColor = (e: any) => e.name === "Colore";
    const index = selectedOptions.findIndex(isColor);
    const color = v.selectedOptions[index].value;
    const src = v.image.src;
    if (!colorsImgs.some((e) => e.color === color)) {
      colorsImgs.push({ color, src });
    }
  });
  const [selectedColor, setColor] = useState({
    color: colorsImgs[0].color,
    src: colorsImgs[0].src,
  });
  let hasSize = true;
  variants.forEach((v) => {
    if (v.selectedOptions.length <= 1) {
      hasSize = false;
    }
  });
  if (variants.length === 1 || !hasSize) {
    return (
      <Box>
        <Text>Questo propotto non e' disponibile</Text>
      </Box>
    );
  }

  const addToCart = async () => {
    if (selectedSize === "") {
      toggleAlert(true);
      return;
    }
    try {
      console.log("Fired");
      console.log(window.localStorage);
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

  variants.forEach((v) => {
    const selectedOptions = v.selectedOptions;
    const isColor = (e: any) => e.name === "Colore";
    const CIndex = selectedOptions.findIndex(isColor);
    const isSize = (e: any) => e.name === "Taglia" || e.name === "Misura";
    const SIndex = selectedOptions.findIndex(isSize);
    const color = selectedOptions[CIndex].value;
    const size = selectedOptions[SIndex].value;
    const id = v.id;
    if (color === selectedColor.color) sizes.push({ size, id });
  });
  console.log("OTHER", otherProducts);
  return (
    // <Text>Hi</Text>
    <Box>
      <Carousel images={images} selectedColor={selectedColor} />
      <Stack direction="row">
        {colorsImgs.map((c) => {
          return (
            <Image
              key={c.src}
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
      {alert && (
        <Alert status="error">
          <AlertIcon boxSize="15px" />
          <AlertDescription fontSize="sm">
            Seleziona una taglia prima di effettuare l'acquisto
          </AlertDescription>
          <CloseButton
            onClick={() => {
              toggleAlert(false);
            }}
            position="absolute"
            right="8px"
            top="4px"
          />
        </Alert>
      )}
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const products = await client.product.fetch(query.item);
  const otherProducts = await api.fetchProducts();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      otherProducts,
    },
  };
};
