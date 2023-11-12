"use client";

import {
  VStack,
  Box,
  Flex,
  Spacer,
  Button,
  LinkOverlay,
  LinkBox,
  Image,
  Center,
  useColorMode,
} from "@chakra-ui/react";
import { NavBar } from "../components/NavBar";
import { GameUI } from "../components/GameUI";

const BUY_ZOOMER_LINK =
  "https://app.uniswap.org/#/tokens/ethereum/0x0d505c03d30e65f6e9b4ef88855a47a89e4b7676";

const Page = () => {
  const { colorMode } = useColorMode();
  return (
    <VStack
      spacing={4}
      align="stretch"
      p={4}
      backgroundColor={colorMode === "light" ? "#FEFC52" : "black"}
      textColor={colorMode === "light" ? "black" : "#FEFC52"}
    >
      <NavBar />
      <Center>
        <Image boxSize="100px" src="/zoomer.png" alt="zoomer" />
      </Center>
      <Flex>
        <Spacer />
        <Box width={{ base: "100%", md: "640px" }}>
          <GameUI />
          <LinkBox>
            <Button
              width="100%"
              backgroundColor={colorMode === "light" ? "black" : "#FEFC52"}
              color={colorMode === "light" ? "#FEFC52" : "black"}
              mt={4}
            >
              <LinkOverlay href={BUY_ZOOMER_LINK} isExternal>
                BUY ZOOMER
              </LinkOverlay>
            </Button>
            <Flex direction={"row"}>
              <Spacer />
              {colorMode === "dark" ? (
                <Image boxSize="400px" src="/vape_lady.png" alt="take a hit" />
              ) : (
                <Image boxSize="400px" src="/vaper.webp" alt="take a hit" />
              )}
            </Flex>
          </LinkBox>
        </Box>
        <Spacer />
      </Flex>
      <Flex>
        <Spacer />
      </Flex>
    </VStack>
  );
};

export default Page;
