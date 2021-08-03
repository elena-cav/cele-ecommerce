import { Flex, Spacer, Box, Text, Image } from "@chakra-ui/react";
import SwiperCore, { Pagination } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import { Product, Img } from "../types";

{
  /* <Pick.Product 'Img'> */
}
// export default function Carousel({images} : {images: Product['images']}) {

export default function Carousel({ images }: { images: Img[] }) {
  return (
    <Box maxW={["320px", "480px"]}>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        pagination={{ clickable: true, dynamicBullets: true }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {images.map((image: Img) => {
          return (
            <SwiperSlide key={image.id}>
              <Image src={image.src}></Image>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
}
