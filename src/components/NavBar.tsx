import { Box, Flex, Heading, Spacer } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const NavBar = () => {
  return (
    <Box h="40px" bg="#FEFC52">
      <Flex>
        <Box>
          <Heading size={"lg"}>
            <a href="https://zoomer.money">/TAKE_ME_HOME</a>
          </Heading>
        </Box>
        <Spacer />
        <Box>
          <ConnectButton />
        </Box>
      </Flex>
    </Box>
  );
};
