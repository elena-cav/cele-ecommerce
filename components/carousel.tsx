import { Flex, Spacer, Box, Text, Image } from "@chakra-ui/react";

import { Product, Img } from "../types";
import { useState } from "react";
import { createIcon } from "@chakra-ui/react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

type Color = {
  src: string;
};

export default function Carousel({
  images,
  selectedColor,
}: {
  images: Img[];
  selectedColor: Color;
}) {
  return <Image h={["200px", "400px"]} src={selectedColor.src}></Image>;
}
