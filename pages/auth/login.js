import React from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth";
import { Box, Text, Button } from "@chakra-ui/react";
export default function Login() {
  const [session, loading] = useSession();
  return (
    <Box>
      {!session && (
        <Box>
          <Text>Not signed in </Text>
          <Button onClick={signIn}>Sign in</Button>
        </Box>
      )}
      {session && (
        <Box>
          <Text>Signed in as {session.user.email} </Text>
          <Button>
            <Link href="/secret">To the secret</Link>
          </Button>
          <Button onClick={signOut}>Sign out</Button>
        </Box>
      )}
    </Box>
  );
}
