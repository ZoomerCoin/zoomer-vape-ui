import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  Heading,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
  useColorMode,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { Address, formatEther } from "viem";
import { useAccount, useWalletClient } from "wagmi";
import { goerli, mainnet } from "wagmi/chains";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { useState } from "react";

import {
  usePrepareVapeGamePayMyDividend,
  useVapeGameGameTime,
  useVapeGameGetMyDividend,
  useVapeGameHasEnoughZoomer,
  useVapeGameIsPaused,
  useVapeGameLastPurchasedAddress,
  useVapeGameLastPurchasedTime,
  useVapeGameLottoValueEth,
  useVapeGameMinInvest,
  useVapeGameMinZoomer,
  useVapeGameNumHits,
  useVapeGamePayMyDividend,
  useVapeGamePotValueEth,
  useVapeGameTakeAVapeHit,
  useZoomerCoinBalanceOf,
  vapeGameAddress,
} from "../generated";
import { formatAddress } from "../utils/formatAddress";

import { GameOver } from "./GameOver";

const BUY_ZOOMER_LINK =
  "https://app.uniswap.org/#/tokens/ethereum/0x0d505c03d30e65f6e9b4ef88855a47a89e4b7676";

export const GameUI = () => {
  const { address } = useAccount();
  const { data: isPaused } = useVapeGameIsPaused();
  const { colorMode } = useColorMode();
  console.log("colorMode: ", colorMode);
  return (
    <Card bg={colorMode === "light" ? "#FEFC52" : "black"} mt={4}>
      <CardBody>
        <VStack align={"stretch"}>
          <Center>
            <Heading>$VAPE</Heading>
          </Center>
          <Center>
            <Heading as="h4" size="md">
              we str8 vapin belee dat
            </Heading>
          </Center>
          <GameDescription />
          {isPaused ? (
            <GameOver />
          ) : (
            <Game address={address} isPaused={isPaused} />
          )}
        </VStack>
      </CardBody>
    </Card>
  );
};

type GameProps = {
  address?: Address;
  isPaused?: boolean;
};

const Game = ({ address, isPaused }: GameProps) => {
  return (
    <>
      <Flex pt={4}>
        <CurrentWinner />
      </Flex>
      <Flex>
        <Jackpot />
        <TimeLeft />
      </Flex>
      <Flex>
        <RandomWinner />
      </Flex>
      {address ? (
        <>
          <Flex pt={4}>
            <TakeAHit address={address} isPaused={isPaused} />
          </Flex>
          <Flex>
            <Dividend address={address} />
          </Flex>
        </>
      ) : (
        <Heading pt={6}>CONNECT YOUR WALLET TO PLAY</Heading>
      )}
    </>
  );
};

const CurrentWinner = () => {
  const { data: lastPurchased, isSuccess: lastPurchasedIsSuccess } =
    useVapeGameLastPurchasedAddress({ watch: true });
  const { data: numHits, isSuccess: numHitsIsSuccess } = useVapeGameNumHits({
    watch: true,
  });
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  console.log("isLargerThan800: ", isLargerThan800);
  const need = (
    <>
      , you need{" "}
      <Link href={BUY_ZOOMER_LINK} isExternal color="teal.500">
        $ZOOMER
      </Link>{" "}
      to take a hit
    </>
  );
  return (
    <Stat>
      <StatLabel>Last $VAPE Hit By</StatLabel>
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
        {numHitsIsSuccess ? numHits?.toString() : "..."} hits taken
        {numHitsIsSuccess ?? numHits! < 50 ? need : ""}
      </StatHelpText>
    </Stat>
  );
};

const RandomWinner = () => {
  const { data: lottoValue, isSuccess: lottoIsSuccess } =
    useVapeGameLottoValueEth({ watch: true });
  return (
    <Stat>
      <StatLabel>Bussin Jackpot</StatLabel>
      <StatNumber>
        {lottoIsSuccess ? formatEther(lottoValue!) + " ETH" : "..."}
      </StatNumber>
      <StatHelpText>do you feel lucky?? you win wen game ends...</StatHelpText>
    </Stat>
  );
};

const Jackpot = () => {
  const { data, isSuccess } = useVapeGamePotValueEth({ watch: true });

  return (
    <Stat>
      <StatLabel>Bussin Oil Value</StatLabel>
      <StatNumber>{isSuccess ? formatEther(data!) + " ETH" : "..."}</StatNumber>
    </Stat>
  );
};

const TimeLeft = () => {
  const { data: lastPurchasedTime, isSuccess: lastPurchaseIsSuccess } =
    useVapeGameLastPurchasedTime({ watch: true });
  const { data: gameTime, isSuccess: gameTimeIsSuccess } =
    useVapeGameGameTime();

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

  const formatData = (data: bigint, gameTime: bigint): string => {
    const winningTime = data + gameTime;
    const now = Math.floor(Date.now() / 1000);
    let timeLeft = winningTime - BigInt(now);
    if (timeLeft < 0) {
      timeLeft = BigInt(0);
    }

    return toHHMMSS(parseInt(timeLeft.toString()));
  };

  return (
    <Stat>
      <StatLabel>Time Until Battery Dies</StatLabel>
      <StatNumber>
        {lastPurchaseIsSuccess && gameTimeIsSuccess
          ? formatData(lastPurchasedTime!, gameTime!)
          : "..."}
      </StatNumber>
    </Stat>
  );
};

type TakeAHitProps = {
  address: Address;
  isPaused?: boolean;
};

const TakeAHit = ({ address, isPaused }: TakeAHitProps) => {
  const { data: minInvest, isSuccess: isSuccessMinInvest } =
    useVapeGameMinInvest({ watch: true });
  const { writeAsync, isLoading: isLoadingTakeAHit } =
    useVapeGameTakeAVapeHit();
  const { data: hasEnough, isSuccess: isSuccessHasEnough } =
    useVapeGameHasEnoughZoomer({ args: [address], watch: true });
  const { data: balance, isSuccess: isSuccessBalance } = useZoomerCoinBalanceOf(
    { args: [address], watch: true }
  );
  const { data: minZoomer, isSuccess: isSuccessMinZoomer } =
    useVapeGameMinZoomer();
  const addRecentTransaction = useAddRecentTransaction();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [txHash, setTxHash] = useState("");

  return (
    <>
      <Stat>
        <StatLabel>Hit Price</StatLabel>
        <StatNumber>
          {isSuccessMinInvest ? formatEther(minInvest!) + " ETH" : "..."}
        </StatNumber>
      </Stat>
      <Center width={"50%"}>
        {isSuccessHasEnough && hasEnough ? (
          <Button
            colorScheme="pink"
            width="100%"
            isDisabled={!writeAsync || !minInvest || isPaused}
            isLoading={isLoadingTakeAHit}
            onClick={async () => {
              const res = await writeAsync({ value: minInvest });
              addRecentTransaction({
                hash: res.hash,
                description: "Take a Hit",
              });
              setTxHash(res.hash);
              onOpen();
            }}
          >
            TAKE A HIT
          </Button>
        ) : (
          <VStack>
            <Text as="b">
              not enough $ZOOMER! you need{" "}
              {isSuccessMinZoomer ? formatEther(minZoomer!) : "..."}, you have{" "}
              {isSuccessBalance ? formatEther(balance!) : "..."}!{" "}
              <Link href={BUY_ZOOMER_LINK} isExternal color="teal.500">
                BUY SOME!
              </Link>
            </Text>
          </VStack>
        )}
      </Center>
      <HitTakenModal isOpen={isOpen} onClose={onClose} txHash={txHash} />
    </>
  );
};

type TxModalProps = {
  isOpen: boolean;
  onClose: () => void;
  txHash: string;
};

const HitTakenModal = ({ isOpen, onClose, txHash }: TxModalProps) => {
  const { data: wallet } = useWalletClient();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent backgroundColor="#FEFC52">
        <ModalHeader>YOU TOOK A FAT HIT</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <video autoPlay loop src={require("../../public/vape.mp4")} />
        </ModalBody>
        <ModalFooter>
          <Link
            href={`${wallet?.chain.blockExplorers?.etherscan?.url}/tx/${txHash}`}
            isExternal
          >
            Check Tx
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

type DividendProps = {
  address: Address;
};

const Dividend = ({ address }: DividendProps) => {
  const { data: myDividend, isSuccess } = useVapeGameGetMyDividend({
    args: [address],
    watch: true,
  });
  const { config } = usePrepareVapeGamePayMyDividend();
  const { writeAsync, isLoading } = useVapeGamePayMyDividend(config);
  const addRecentTransaction = useAddRecentTransaction();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [txHash, setTxHash] = useState("");

  return (
    <>
      <Stat>
        <StatLabel>My Free Hits</StatLabel>
        <StatNumber>
          {isSuccess
            ? (formatEther(myDividend!).split(".")[1]?.length > 6
                ? [
                    formatEther(myDividend!).split(".")[0],
                    formatEther(myDividend!).split(".")[1].slice(0, 6) + "...",
                  ].join(".")
                : formatEther(myDividend!)) + " ETH"
            : "..."}
        </StatNumber>
      </Stat>
      <Center width={"50%"}>
        <Button
          colorScheme="blue"
          width={"100%"}
          isDisabled={!writeAsync || myDividend === BigInt(0)}
          isLoading={isLoading}
          onClick={async () => {
            const res = await writeAsync?.();
            if (res) {
              addRecentTransaction({
                hash: res.hash,
                description: "Get My Dividend",
              });
              setTxHash(res.hash);
            }
            onOpen();
          }}
        >
          GET MY FREE HITS
        </Button>
      </Center>
      <DividendModal isOpen={isOpen} onClose={onClose} txHash={txHash} />
    </>
  );
};

const DividendModal = ({ isOpen, onClose, txHash }: TxModalProps) => {
  const { data: wallet } = useWalletClient();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent backgroundColor="#FEFC52">
        <ModalHeader>YOU GOT YOUR FREE HITS</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <video autoPlay loop src={require("../../public/dance.mp4")} />
        </ModalBody>
        <ModalFooter>
          <Link
            href={`${wallet?.chain.blockExplorers?.etherscan?.url}/tx/${txHash}`}
            isExternal
          >
            Check Tx
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const GameDescription = () => {
  const { data: wallet } = useWalletClient();
  return (
    <Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton width="100%">
            <Box as="span" flex="1" textAlign="left">
              <Text as="b">how does this work??</Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Text as="b">
            {"it's"} smooth af:
            <br />
            <br />
            1. Hit the $VAPE for your chance to win the Bussin Oil
            <br />
            2. The earlier you hit the vape the more $VAPE you get
            <br />
            3. All $VAPE holders get free hits from all the Hits after them (the
            earlier you hit the more you get).
            <br />
            4. With every Hit, the Battery resets and the Hit price increases.
            <br />
            5. The last person to take a hit b4 the battery dies wins the Bussin
            Oil
            <br />
            6. The first 50 hits of a new game require at least 10,000 $ZOOMER
            in your wallet,{" "}
            <Link href={BUY_ZOOMER_LINK} isExternal color="teal.500">
              buy it here!
            </Link>
            <br />
            7. ONE lucky Zoomer gets a nice payout from the final pot (5% of the
            total). how is it random? our gigabrain devs use{" "}
            <Link
              href="https://docs.chain.link/vrf/v2/introduction"
              isExternal
              color="teal.500"
            >
              Chainlink VRF
            </Link>{" "}
            for provably fair randomness, belee dat!
            <br />
            <br />
            you CANNOT buy $VAPE on an exchange! you cannot sell $VAPE, it is
            non-transferrable. you must play the game to get it, and $VAPE does
            not leave the game.
            <br />
            <br />
            WARNING: this is an addictive af degen ponzinomic game. the code is
            safu{" "}
            <Link
              href={`${
                wallet?.chain.blockExplorers?.etherscan?.url ??
                goerli.blockExplorers.etherscan.url
              }/address/${
                wallet?.chain.id
                  ? vapeGameAddress[
                      wallet?.chain.id as keyof typeof vapeGameAddress
                    ]
                  : vapeGameAddress[5]
              }#code`}
              isExternal
              color="teal.500"
            >
              (read it here)
            </Link>{" "}
            but has not been audited. play at your own risk!
          </Text>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
