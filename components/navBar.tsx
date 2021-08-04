import {
  Flex,
  Spacer,
  Box,
  Text,
  Heading,
  Slide,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { getCart } from "../utils/Cart";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

export default function Navbar(props) {
  const { isOpen, onToggle } = useDisclosure();
  const router = useRouter();
  const [isNavBarOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isNavBarOpen);

  return (
    <Box>
      <Box display={{ base: "block", md: "none" }} onClick={toggle}>
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </Box>

      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        mb={8}
        p={8}
        bg={["primary.500", "primary.500", "transparent", "transparent"]}
        color={["white", "white", "primary.700", "primary.700"]}
        {...props}
      >
        <GiHamburgerMenu
          w="100px"
          color={["white", "white", "primary.500", "primary.500"]}
        />
        <Box display={{ base: "block", md: "none" }} onClick={toggle}>
          {isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
        </Box>

        <Box bg="gray">
          <Button onClick={onToggle} mr="4">
            Donna
          </Button>
          <Button mr="4">Accessori</Button>
          <Spacer />
          <Button
            onClick={async () => {
              const { webUrl } = await getCart();
              router.replace(webUrl);
            }}
          >
            checkout
          </Button>

          <Button>Log in</Button>
        </Box>
        <Slide direction="bottom" in={isOpen} style={{ zIndex: 10 }}>
          <Box p="40px" mt="4" bg="gray" shadow="md">
            <Button mr="4">Designer</Button>
            <Link href={`/abbigliamento`}>
              <Button mr="4">Abbigliamento</Button>
            </Link>
          </Box>
        </Slide>
      </Flex>
    </Box>
  );
}
