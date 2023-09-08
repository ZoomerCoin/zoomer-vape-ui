import {
  Button,
  Center,
  Flex,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  VStack,
} from "@chakra-ui/react";
import {
  usePrepareVapeTokenPayMyDividend,
  useVapeTokenGetMyDividend,
  useVapeTokenIsPaused,
  useVapeTokenLastPurchasedAddress,
  useVapeTokenLastPurchasedTime,
  useVapeTokenMinInvest,
  useVapeTokenPayMyDividend,
  useVapeTokenPotValueEth,
  useVapeTokenTakeAVapeHit,
} from "../generated";
import { formatEther } from "viem";
import { useAccount } from "wagmi";

export const GameUI = () => {
  const { address } = useAccount();
  console.log("address: ", address);
  return (
    <VStack align={"stretch"}>
      <Center pb={4}>
        <Heading>/VAPE_FOMO</Heading>
      </Center>
      <Flex>
        <CurrentWinner />
      </Flex>
      <Flex>
        <Jackpot />
        <TimeLeft />
      </Flex>
      <Flex>
        <BuyIn />
      </Flex>
      <Flex>{address ? <Dividend address={address} /> : <></>}</Flex>
    </VStack>
  );
};

const CurrentWinner = () => {
  const { data, isSuccess } = useVapeTokenLastPurchasedAddress();

  return (
    <Stat>
      <StatLabel>Current Winner</StatLabel>
      <StatNumber>{isSuccess ? data : "..."}</StatNumber>
    </Stat>
  );
};

const Jackpot = () => {
  const { data, isSuccess } = useVapeTokenPotValueEth();

  return (
    <Stat>
      <StatLabel>Current Jackpot</StatLabel>
      <StatNumber>{isSuccess ? formatEther(data!) + " ETH" : "..."}</StatNumber>
    </Stat>
  );
};

const TimeLeft = () => {
  const { data, isSuccess } = useVapeTokenLastPurchasedTime();

  const toHHMMSS = (secNum: number): string => {
    let hours = Math.floor(secNum / 3600).toString();
    let minutes = Math.floor((secNum - parseInt(hours) * 3600) / 60).toString();
    let seconds = (
      secNum -
      parseInt(hours) * 3600 -
      parseInt(minutes) * 60
    ).toString();

    return hours + " hours " + minutes + " minutes " + seconds + " seconds";
  };

  const formatData = (data: bigint): string => {
    const winningTime = data + BigInt(86400);
    const now = Math.floor(Date.now() / 1000);
    let timeLeft = winningTime - BigInt(now);
    console.log("last purchased time: ", data);
    console.log("timeLeft: ", timeLeft);
    if (timeLeft < 0) {
      timeLeft = BigInt(0);
    }

    return toHHMMSS(parseInt(timeLeft.toString()));
  };

  return (
    <Stat>
      <StatLabel>Time Until Jackpot</StatLabel>
      <StatNumber>{isSuccess ? formatData(data!) : "..."}</StatNumber>
    </Stat>
  );
};

const BuyIn = () => {
  const { data: isPaused } = useVapeTokenIsPaused();
  const { data: minInvest, isSuccess } = useVapeTokenMinInvest();
  const { write } = useVapeTokenTakeAVapeHit();
  return (
    <>
      <Stat>
        <StatLabel>Ticket Price</StatLabel>
        <StatNumber>
          {isSuccess ? formatEther(minInvest!) + " ETH" : "..."}
        </StatNumber>
      </Stat>
      <Center width={"50%"}>
        <Button
          colorScheme="pink"
          width="100%"
          isDisabled={!write || !minInvest || isPaused}
          onClick={() => write({ value: minInvest })}
        >
          Take a Hit
        </Button>
      </Center>
    </>
  );
};

type DividendProps = {
  address: `0x${string}`;
};

const Dividend = ({ address }: DividendProps) => {
  const { data: myDividend, isSuccess } = useVapeTokenGetMyDividend({
    args: [address],
  });
  const { config } = usePrepareVapeTokenPayMyDividend();
  const { write } = useVapeTokenPayMyDividend(config);

  return (
    <>
      <Stat>
        <StatLabel>My Dividend</StatLabel>
        <StatNumber>
          {isSuccess ? formatEther(myDividend!) + " ETH" : "..."}
        </StatNumber>
      </Stat>
      <Center width={"50%"}>
        <Button
          colorScheme="blue"
          width={"100%"}
          isDisabled={!write || myDividend === BigInt(0)}
          onClick={() => write?.()}
        >
          Get My Dividend
        </Button>
      </Center>
    </>
  );
};
