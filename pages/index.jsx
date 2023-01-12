import { Box } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";
import Navbar from "../components/Users/Navbar";
import WrapperUser from "../components/Users/WrapperUser";

export default function Home() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return (
      <Box>
        <p>Access Denied</p>
        <button onClick={() => signIn()}>Login</button>
      </Box>
    );
  }

  return (
    <Box>
      <Navbar signOut={signOut} />
      <Box>
        <p> {session.user.name} </p>
        <button onClick={() => signOut()}>Sign Out</button>
      </Box>
      <WrapperUser sessionUser={session.user} />
    </Box>
  );
}
