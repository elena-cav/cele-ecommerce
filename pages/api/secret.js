import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";

export default function Secret() {
  const [session, loading] = useSession();
  const [content, setContent] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/secret");
      const json = await res.json();
      if (json.content) {
        setContent(json.content);
      }
    };
    fetchData();
  }, [session]);
  if (typeof window !== "undefined" && loading) return null;
  if (!session) {
    return (
      <Box>
        <Text>You aren't signed in, please sign in first</Text>
      </Box>
    );
  }
  return (
    <Box>
      <Text>Protected page</Text>
      <Text>{content}</Text>
    </Box>
  );
}
