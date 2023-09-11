"use client";

import { VStack, Box, Flex, Spacer } from "@chakra-ui/react";
import { NavBar } from "../components/NavBar";
import { GameUI } from "../components/GameUI";

const Page = () => {
  return (
    <>
      <VStack spacing={4} align="stretch" p={4}>
        <NavBar />
        <Flex>
          <Spacer />
          <Box width={640}>
            <GameUI />
          </Box>
          <Spacer />
        </Flex>
      </VStack>
    </>
  );
};

export default Page;
