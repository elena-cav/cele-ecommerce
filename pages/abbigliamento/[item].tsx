import { Flex, Spacer, Box, Text, Image } from "@chakra-ui/react";
import Navbar from "../../components/navBar";
import SwiperCore, { Pagination } from "swiper/core";
import { useState } from "react";
import Carousel from "../../components/carousel";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Product, Img } from "../../types";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import { client } from "../../utils/Shopify-client";
import { GetServerSideProps } from "next";

export default function ProductPage(props: any) {
  console.log("PROPS", props);
  const {
    products: { description, images, title, variants, vendor },
  } = props;
  SwiperCore.use([Pagination]);
  const measures = console.log(images);
  return (
    <Box>
      <Navbar />
      <Carousel images={images} />

      <Menu>
        <MenuButton
          px={4}
          py={2}
          transition="all 0.2s"
          borderRadius="none"
          borderWidth="1px"
          _hover={{ bg: "gray.400" }}
          _expanded={{ bg: "blue.400" }}
          _focus={{ boxShadow: "outline" }}
        >
          Taglie <ChevronDownIcon />
        </MenuButton>
        <MenuList borderRadius="none">
          {variants.map((variant: any) => {
            return <MenuItem>{variant.selectedOptions[1].value}</MenuItem>;
          })}
        </MenuList>
      </Menu>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const products = await client.product.fetch(query.item);
  return { props: { products: JSON.parse(JSON.stringify(products)) } };
};
