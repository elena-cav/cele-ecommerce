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

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Flex>
      <Box bg="gray">
        <Button onClick={onToggle} mr="4">
          Donna
        </Button>
        <Button mr="4">Accessori</Button>
        <Spacer />
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
  );
}
