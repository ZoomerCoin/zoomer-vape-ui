import { Box, Button, Flex, Heading, Spacer, useColorMode } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const NavBar = () => {
  return (
    <Box h="40px">
      <Flex>
        <Box>
          <Heading size={"lg"}>
            <a href="https://zoomer.money">/TAKE_ME_HOME</a>
          </Heading>
        </Box>
        <Spacer />
        {/* <Button>Color Mode</Button> */}
        <Box>
          <ConnectButton />
        </Box>
      </Flex>
    </Box>
  );
};
