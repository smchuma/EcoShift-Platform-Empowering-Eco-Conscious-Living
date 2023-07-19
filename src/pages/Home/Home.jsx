import { Box } from "@chakra-ui/react";
import { Hero, Introduction, Navbar } from "../../components";
const Home = () => {
  return (
    <>
      <Navbar />
      <Box mt="70px">
        <Hero />
        <Introduction />
      </Box>
    </>
  );
};

export default Home;
