import { Box } from "@chakra-ui/react";
import {
  CallToAction,
  Features,
  Hero,
  Introduction,
  Navbar,
  WhyUs,
} from "../../components";
const Home = () => {
  return (
    <>
      <Navbar />
      <Box mt="70px">
        <Hero />
        <Introduction />
        <Features />
        <WhyUs />
        <CallToAction />
      </Box>
    </>
  );
};

export default Home;
