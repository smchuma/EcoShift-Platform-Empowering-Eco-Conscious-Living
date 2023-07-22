/* eslint-disable react/no-unescaped-entities */
import { Stack, Text } from "@chakra-ui/react";

const WhyUs = () => {
  return (
    <Stack bg="#008872" w="100%" h={{ base: "auto", lg: "60vh" }}>
      <Text
        px="50px"
        fontSize="40px"
        color="white"
        fontWeight="600"
        mb="10px"
        pt="80px"
      >
        Why Choose Us
      </Text>
      <Text
        px={{ base: "20px", md: "120px" }}
        color="white"
        fontSize="23px"
        textAlign={{ base: "center", md: "justify" }}
        pb={{ base: "50px", lg: "0px" }}
      >
        "Here at EcoShift, we are dedicated to fostering a global community of
        individuals committed to sustainable living. Our platform provides a
        safe and inclusive space for everyone to share ideas, collaborate, and
        celebrate progress. We believe that sustainability is a collective
        journey, and together, we can create a brighter, cleaner, and healthier
        future for our planet."
      </Text>
    </Stack>
  );
};

export default WhyUs;
