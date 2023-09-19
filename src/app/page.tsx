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
} from "@chakra-ui/react";
import { NavBar } from "../components/NavBar";
import { GameUI } from "../components/GameUI";

const BUY_ZOOMER_LINK =
  "https://app.uniswap.org/#/tokens/ethereum/0x0d505c03d30e65f6e9b4ef88855a47a89e4b7676";

const Page = () => {
  return (
    <>
      <VStack spacing={4} align="stretch" p={4}>
        <NavBar />
        <Center><Image boxSize='100px' src="/zoomer.jpg" alt="zoomer" /></Center>
        <Flex>
          <Spacer />
          <Box width={640}>
            <GameUI />
            <LinkBox>
              <Button
                width="100%"
                backgroundColor="black"
                color="#FEFC52"
                mt={4}
              >
                <LinkOverlay href={BUY_ZOOMER_LINK} isExternal>
                  BUY ZOOMER
                </LinkOverlay>
              </Button>
            </LinkBox>
          </Box>
          <Spacer />
        </Flex>
        <Flex>
          <Spacer />
          <Image src="/vaper.webp" alt="take a hit" />
        </Flex>
      </VStack>
    </>
  );
};

export default Page;
