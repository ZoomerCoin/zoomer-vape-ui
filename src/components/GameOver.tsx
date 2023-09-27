import React from "react";
import {
  Center,
  Flex,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Link,
  useMediaQuery,
  Box,
} from "@chakra-ui/react";
import { mainnet } from "wagmi/chains";

import {
  useVapeGameFinalLottoValueEth,
  useVapeGameFinalLottoWinner,
  useVapeGameFinalPotValueEth,
  useVapeGameLastPurchasedAddress,
} from "../generated";
import { formatAddress } from "../utils/formatAddress";
import { formatEther } from "viem";

export const GameOver = () => {
  return (
    <>
      <Center pt={4}>
        <Heading>GAME OVER!!!</Heading>
      </Center>
      <Flex pt={4}>
        <Winner />
      </Flex>
      <Flex pt={4}>
        <LuckyWinner />
      </Flex>
      <Flex>
        <Flex>
          <video autoPlay loop src={require("../../public/floss.mp4")} />
        </Flex>
        <Flex>
          <video autoPlay loop src={require("../../public/floss.mp4")} />
        </Flex>
        <Flex>
          <video autoPlay loop src={require("../../public/floss.mp4")} />
        </Flex>
      </Flex>
    </>
  );
};

const Winner = () => {
  const { data: lastPurchased, isSuccess: lastPurchasedIsSuccess } =
    useVapeGameLastPurchasedAddress();
  const { data: finalPot, isSuccess: finalPotIsSuccess } =
    useVapeGameFinalPotValueEth();
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  return (
    <Stat>
      <StatLabel>Bussin WINNER</StatLabel>
      <StatNumber>
        {lastPurchasedIsSuccess ? (
          <Link
            href={`${mainnet.blockExplorers.etherscan.url}/address/${lastPurchased}`}
            isExternal
            color="teal.500"
          >
            {isLargerThan800 ? lastPurchased : formatAddress(lastPurchased!)}
          </Link>
        ) : (
          "..."
        )}
      </StatNumber>
      <StatHelpText>
        Won {finalPotIsSuccess ? formatEther(finalPot!) : "..."} ETH
      </StatHelpText>
    </Stat>
  );
};

const LuckyWinner = () => {
  const { data: lastPurchased, isSuccess: lastPurchasedIsSuccess } =
    useVapeGameFinalLottoWinner();
  const { data: finalPot, isSuccess: finalPotIsSuccess } =
    useVapeGameFinalLottoValueEth();
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  return (
    <Stat>
      <StatLabel>Lucky WINNER</StatLabel>
      <StatNumber>
        {lastPurchasedIsSuccess ? (
          <Link
            href={`${mainnet.blockExplorers.etherscan.url}/address/${lastPurchased}`}
            isExternal
            color="teal.500"
          >
            {isLargerThan800 ? lastPurchased : formatAddress(lastPurchased!)}
          </Link>
        ) : (
          "..."
        )}
      </StatNumber>
      <StatHelpText>
        Won {finalPotIsSuccess ? formatEther(finalPot!) : "..."} ETH
      </StatHelpText>
    </Stat>
  );
};
