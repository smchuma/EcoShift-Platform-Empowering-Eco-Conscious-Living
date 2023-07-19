import { Box } from "@chakra-ui/react";
import { Features, Hero, Introduction, Navbar } from "../../components";
const Home = () => {
  return (
    <>
      <Navbar />
      <Box mt="70px">
        <Hero />
        <Introduction />
        <Features />
      </Box>
    </>
  );
};

export default Home;
