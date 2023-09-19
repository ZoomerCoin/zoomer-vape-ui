import {
  Button,
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
  useDisclosure,
} from "@chakra-ui/react";
import {
  usePrepareVapeGamePayMyDividend,
  useVapeGameGameTime,
  useVapeGameGetMyDividend,
  useVapeGameHasEnoughZoomer,
  useVapeGameIsPaused,
  useVapeGameLastPurchasedAddress,
  useVapeGameLastPurchasedTime,
  useVapeGameMinInvest,
  useVapeGameNumHits,
  useVapeGamePayMyDividend,
  useVapeGamePotValueEth,
  useVapeGameTakeAVapeHit,
  useZoomerCoinBalanceOf,
  vapeGameAddress,
} from "../generated";
import { Address, formatEther } from "viem";
import { useAccount, useWalletClient } from "wagmi";
import { goerli } from "wagmi/chains";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { useState } from "react";

const BUY_ZOOMER_LINK =
  "https://app.uniswap.org/#/tokens/ethereum/0x0d505c03d30e65f6e9b4ef88855a47a89e4b7676";

export const GameUI = () => {
  const { address } = useAccount();
  return (
    <VStack align={"stretch"}>
      <Center>
        <Heading>$VAPE</Heading>
      </Center>
      <Center>
        <Heading as="h4" size="md">
          we str8 vapin belee dat
        </Heading>
      </Center>
      <Flex>
        <GameDescription />
      </Flex>
      <Flex pt={4}>
        <CurrentWinner />
      </Flex>
      <Flex>
        <Jackpot />
        <TimeLeft />
      </Flex>
      {address ? (
        <>
          <Flex>
            <TakeAHit address={address} />
          </Flex>
          <Flex>
            <Dividend address={address} />
          </Flex>
        </>
      ) : (
        <Heading pt={6}>CONNECT YOUR WALLET TO PLAY</Heading>
      )}
    </VStack>
  );
};

const CurrentWinner = () => {
  const { data: lastPurchased, isSuccess: lastPurchasedIsSuccess } =
    useVapeGameLastPurchasedAddress();
  const { data: numHits, isSuccess: numHitsIsSuccess } = useVapeGameNumHits();
  const need = (
    <>
      , need{" "}
      <Link href={BUY_ZOOMER_LINK} isExternal color="teal.500">
        $ZOOMER
      </Link>{" "}
      to take a hit
    </>
  );
  return (
    <Stat>
      <StatLabel>Last Hit By</StatLabel>
      <StatNumber>{lastPurchasedIsSuccess ? lastPurchased : "..."}</StatNumber>
      <StatHelpText>
        {numHitsIsSuccess ? numHits?.toString() : "..."} hits taken
        {numHitsIsSuccess ?? numHits! < 50 ? need : ""}
      </StatHelpText>
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
};

const TakeAHit = ({ address }: TakeAHitProps) => {
  const { data: isPaused } = useVapeGameIsPaused();
  const { data: minInvest, isSuccess: isSuccessMinInvest } =
    useVapeGameMinInvest({ watch: true });
  const { writeAsync, isLoading: isLoadingTakeAHit } =
    useVapeGameTakeAVapeHit();
  const { data: hasEnough, isSuccess: isSuccessHasEnough } =
    useVapeGameHasEnoughZoomer({ args: [address], watch: true });
  const { data: balance, isSuccess: isSuccessBalance } = useZoomerCoinBalanceOf(
    { args: [address], watch: true }
  );
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
              not enough $ZOOMER! you need 10000, you have{" "}
              {isSuccessBalance ? balance!.toString() : "..."}!{" "}
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
      <ModalOverlay />
      <ModalContent>
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
            Peep Game
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
        <StatLabel>My Dividend</StatLabel>
        <StatNumber>
          {isSuccess ? formatEther(myDividend!) + " ETH" : "..."}
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
          GET MY DIVIDEND
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
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>YOU COLLECTED YOUR DIVIDEND</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <video autoPlay loop src={require("../../public/dance.mp4")} />
        </ModalBody>
        <ModalFooter>
          <Link
            href={`${wallet?.chain.blockExplorers?.etherscan?.url}/tx/${txHash}`}
            isExternal
          >
            Peep Game
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const GameDescription = () => {
  const { data: wallet } = useWalletClient();
  return (
    <Text as="b">
      {"it's"} smooth af:
      <br />
      1. Hit the $VAPE for your chance to win the Bussin Oil
      <br />
      2. The earlier you hit the vape the more $VAPE you get
      <br />
      3. All $VAPE holders get a share of all new hits after them (the earlier
      you hit the more you get).
      <br />
      4. With every Hit, the Battery resets and the Hit price increases.
      <br />
      5. The last person to take a hit b4 the battery resets wins the Bussin Oil
      <br />
      6. The first 50 hits require at least 10,000 $ZOOMER in your wallet,{" "}
      <Link href={BUY_ZOOMER_LINK} isExternal color="teal.500">
        buy it here!
      </Link>
      <br />
      <br />
      you CANNOT buy $VAPE on an exchange! you must play the game to get it!
      <br />
      <br />
      WARNING: this is an addictive af degen ponzinomic game. the code is safu{" "}
      <Link
        href={`${
          wallet?.chain.blockExplorers?.etherscan?.url ??
          goerli.blockExplorers.etherscan.url
        }/address/${
          wallet?.chain.id
            ? vapeGameAddress[wallet?.chain.id as keyof typeof vapeGameAddress]
            : vapeGameAddress[5]
        }#code`}
        isExternal
        color="teal.500"
      >
        (read it here)
      </Link>{" "}
      but has not been audited. play at your own risk!
    </Text>
  );
};
