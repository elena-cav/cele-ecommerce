import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import Router from "next/router";
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";

import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { BsHeart, BsBag } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { getCart } from "../utils/Cart";
export default function NavBar() {
  const [numberOfItemsInCart, setNumberOfItemsInCart] = useState(-1);
  const { isOpen, onToggle } = useDisclosure();
  const { user, error, isLoading } = useUser();

  const getCartItems = async () => {
    const cart = await getCart();
    if (cart) {
      setNumberOfItemsInCart(cart.lineItems.length);
    }
  };

  if (numberOfItemsInCart === -1) {
    getCartItems();
  }
  const userLink = user ? "/cliente/profilo" : "/api/auth/login";
  return (
    <Box>
      {isLoading ? (
        <div>Loading</div>
      ) : error ? (
        <div>{error.message}</div>
      ) : (
        <Box>
          <Flex
            bg={"white"}
            color={"black"}
            minH={"60px"}
            py={{ base: 2 }}
            px={{ base: 4 }}
            borderBottom={1}
            borderStyle={"solid"}
            borderColor={"gray"}
            align={"center"}
          >
            <Flex
              flex={{ base: 1, md: "auto" }}
              ml={{ base: -2 }}
              display={{ base: "flex", md: "none" }}
            >
              <IconButton
                onClick={onToggle}
                icon={
                  isOpen ? (
                    <CloseIcon w={3} h={3} />
                  ) : (
                    <HamburgerIcon w={5} h={5} />
                  )
                }
                variant={"ghost"}
                aria-label={"Toggle Navigation"}
              />
            </Flex>
            <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
              <Text
                // textAlign={useBreakpointValue({ base: "center", md: "left" })}
                fontFamily={"heading"}
                color={"black"}
              >
                Logo
              </Text>

              <Flex display={{ base: "none", md: "flex" }} ml={10}>
                <DesktopNav />
              </Flex>
            </Flex>

            <Stack
              flex={{ base: 1, md: 0 }}
              justify={"flex-end"}
              direction={"row"}
              spacing={6}
            >
              <Link as={"a"} fontSize={"xl"} variant={"link"} href={userLink}>
                <AiOutlineUser />
              </Link>
              <Link as={"a"} fontSize={"xl"} variant={"link"} href={"#"}>
                <BsHeart />
              </Link>
              <Link
                onClick={async () => {
                  const cart = await getCart();
                  console.log(cart);
                  //   const { webUrl } = await getCart();
                  //   Router.replace(webUrl);
                }}
                as={"a"}
                fontSize={"xl"}
                variant={"link"}
                href={"#"}
              >
                {numberOfItemsInCart !== -1 && (
                  <Text>{numberOfItemsInCart}</Text>
                )}
                <BsBag />
              </Link>

              {/* <Button
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"pink.400"}
            href={"#"}
            _hover={{
              bg: "pink.300",
            }}
          >
            Sign Up
          </Button> */}
            </Stack>
          </Flex>

          <Collapse in={isOpen} animateOpacity>
            <MobileNav />
          </Collapse>
        </Box>
      )}
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = "black";
  const linkHoverColor = "gray";
  const popoverContentBgColor = "gray";

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                borderRadius="none"
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      _hover={{ bg: "#00D5E0" }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "gray" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"gray"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack bg={"white"} p={4} display={{ md: "none" }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text fontWeight={600} color={"black"}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={"gray"}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Donna",
    children: [
      {
        label: "Designer",
        // subLabel: "Trending Design to inspire you",
        href: "#",
      },
      {
        label: "Abbigliamento",
        // subLabel: "Up-and-coming Designers",
        href: "/abbigliamento",
      },
    ],
  },
  {
    label: "Accessori",
  },
  {
    label: "Scarpe",
    href: "#",
  },
];
