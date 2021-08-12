import { client } from "../utils/Shopify-client";
import Link from "next/link";
import { Heading, Text, Box, Stack, Link as link } from "@chakra-ui/layout";
import {
  Image,
  VStack,
  HStack,
  Flex,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";

import { useUser } from "@auth0/nextjs-auth0";
import Image1 from "./images/image1.jpg";

export default function Home({ products }: any) {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <Box>
      <Flex
        w={"full"}
        h={"100vh"}
        backgroundImage={`url(https://d2055dkvwltddz.cloudfront.net/wp-content/uploads/2021/06/slot-3-carosello-DSK-4-2-2-2.jpg)`}
        backgroundSize={"cover"}
        backgroundPosition={"center center"}
        marginBottom="1em"
      >
        <VStack
          w={"full"}
          justify={"center"}
          px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={"linear(to-r, blackAlpha.400, transparent)"}
        >
          <Stack maxW={"2xl"} align={"flex-start"} spacing={6}>
            <Text
              textTransform="uppercase"
              color={"white"}
              fontWeight={700}
              lineHeight={1.2}
              fontSize={useBreakpointValue({ base: "2xl", md: "3xl" })}
            >
              Collezione Autunno/Inverno 2021
            </Text>
            <Button
              rounded={"none"}
              bg={"whiteAlpha.300"}
              color={"white"}
              _hover={{ bg: "whiteAlpha.500" }}
              textTransform="uppercase"
              letterSpacing="0.5em"
            >
              Scopri
            </Button>
          </Stack>
        </VStack>
      </Flex>
      <Flex>
        <Stack
          direction={["column", "column", "row"]}
          w={"full"}
          justify={"center"}
          px={useBreakpointValue({ base: 4, md: 8 })}
          height={["700px", "600px", "400px"]}
          spacing="24px"
          marginRight="0.5em"
          marginLeft="0.5em"
          // margin="1em 1em 1em 0.5em"
        >
          <VStack
            bgImage="https://www.fabianafilippi.com/eshop/pub/media/Home_Page/FF-BANNER-NEW-WEBSITE13_7.jpg"
            w={useBreakpointValue({ base: "100%", md: "50%" })}
            h={useBreakpointValue({ base: "100%", md: "50%" })}
            backgroundSize={"cover"}
            backgroundPosition={"center center"}
            textAlign={"center"}
            justify={"center"}
          >
            <Button
              textTransform="uppercase"
              color={"white"}
              rounded={"none"}
              _hover={{ bg: "whiteAlpha.500" }}
              fontWeight={700}
              lineHeight={1.2}
              letterSpacing="0.5em"
              fontSize={"xl"}
            >
              Fabiana Filippi
            </Button>
          </VStack>
          <VStack
            bgImage="https://www.weill.com/modules/kwkboxdesign/views/uploads/2-27-C1.jpg"
            backgroundSize={"cover"}
            w={useBreakpointValue({ base: "100%", md: "50%" })}
            h={useBreakpointValue({ base: "100%", md: "50%" })}
            backgroundPosition={"center center"}
            justify={"center"}
            textAlign={"center"}
            // spacing={6}
          >
            <Button
              textTransform="uppercase"
              color={"white"}
              rounded={"none"}
              _hover={{ bg: "whiteAlpha.500" }}
              fontWeight={700}
              lineHeight={1.2}
              letterSpacing="0.5em"
              fontSize={"xl"}
            >
              Weill
            </Button>
          </VStack>
        </Stack>
      </Flex>
      <VStack
        margin="1em 1.5em 1em 1.5em"
        h={["300px", "200px"]}
        backgroundColor="#00D5E0"
        align="center"
        justify="center"
        padding="0.5em"
      >
        <Text
          textTransform="uppercase"
          color={"white"}
          rounded={"none"}
          fontWeight={700}
          lineHeight={1.8}
          letterSpacing="0.4em"
          fontSize={"xl"}
          textAlign="center"
        >
          Prenota una consulenza con noi
        </Text>
        <Button
          textTransform="uppercase"
          color={"white"}
          rounded={"none"}
          _hover={{ bg: "whiteAlpha.500" }}
          fontWeight={700}
          lineHeight={1.2}
          letterSpacing="0.2em"
          fontSize={"l"}
        >
          Scopri di piu`
        </Button>
      </VStack>
    </Box>
  );
}

export async function getServerSideProps() {
  const products = await client.product.fetchAll();
  return { props: { products: JSON.parse(JSON.stringify(products)) } };
}
