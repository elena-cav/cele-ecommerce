import { client } from "../utils/Shopify-client";
import Link from "next/link";
import { Heading, Text, Box, Link as link } from "@chakra-ui/layout";
import { useUser } from "@auth0/nextjs-auth0";

export default function Home({ products }: any) {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <Box>
      <Heading> Cele Alghero</Heading>
      <Box>
        {user ? (
          <Text>BentornatƏ {user.name}</Text>
        ) : (
          <Text>BenvenutƏ da Cele Alghero</Text>
        )}
      </Box>
      <Link href="/api/auth/logout">Logout</Link>

      <Link href="/api/auth/login">Login</Link>
    </Box>
  );
}

export async function getServerSideProps() {
  const products = await client.product.fetchAll();
  return { props: { products: JSON.parse(JSON.stringify(products)) } };
}
