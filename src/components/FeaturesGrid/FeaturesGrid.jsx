import { Grid, GridItem, Box, Text } from "@chakra-ui/react";
import { FaGem, FaRegLightbulb, FaTasks, FaUserFriends } from "react-icons/fa";

const objectives = [
  {
    id: 1,
    icon: <FaRegLightbulb />,
    text: "Share Your Wisdom: Post Blogs and Videos",
    desc: "Contribute to our knowledge hub by sharing your eco-friendly practices, DIY recycling tips, and other sustainable living ideas. Inspire others and gain recognition for your efforts.",
  },
  {
    id: 2,
    icon: <FaGem />,
    text: "Discover Green Gems: Explore Eco-Conscious Content",
    desc: "Dive into a treasure trove of informative articles, how-to guides, and eye-opening videos created by our passionate community. Learn new ways to reduce your carbon footprint and adopt eco-conscious habits.",
  },
  {
    id: 3,
    icon: <FaTasks />,
    text: "Join Green Challenges: Embrace Sustainable Challenges",
    desc: " Participate in fun and impactful challenges that encourage greener living. From 'Waste-Free Wednesdays' to 'Eco-Friendly Gardening,' every challenge you take on earns you points and recognition.",
  },
  {
    id: 4,
    icon: <FaUserFriends />,
    text: "Connect and Collaborate: Find Like-Minded Souls",
    desc: "Connect with like-minded eco-warriors, join groups, and collaborate on eco-projects. Together, we can amplify our impact and create a greener world.",
  },
];

const FeaturesGrid = () => {
  return (
    <Grid
      templateColumns={{
        sm: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
        lg: "repeat(2, 1fr)",
        xl: "repeat(2, 1fr)",
      }}
      gap={12}
    >
      {objectives.map((objective, index) => (
        <GridItem
          key={index}
          boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px"
          p="20px"
        >
          <Box d="flex" fontSize="50px" mb="30px" mt="20px" color="#025951">
            {objective.icon}
          </Box>
          <Text color="#025951" mb="20px" fontSize="20px">
            {objective.text}
          </Text>
          <Text mb="50px" fontSize="15px">
            {objective.desc}
          </Text>
        </GridItem>
      ))}
    </Grid>
  );
};

export default FeaturesGrid;
