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
  StatLabel,
  StatNumber,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import {
  usePrepareVapeGamePayMyDividend,
  useVapeGameGetMyDividend,
  useVapeGameIsPaused,
  useVapeGameLastPurchasedAddress,
  useVapeGameLastPurchasedTime,
  useVapeGameMinInvest,
  useVapeGamePayMyDividend,
  useVapeGamePotValueEth,
  useVapeGameTakeAVapeHit,
} from "../generated";
import { formatEther } from "viem";
import { useAccount, useWalletClient } from "wagmi";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { useState } from "react";

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
            <TakeAHit />
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
  const { data, isSuccess } = useVapeGameLastPurchasedAddress();

  return (
    <Stat>
      <StatLabel>Current Winner</StatLabel>
      <StatNumber>{isSuccess ? data : "..."}</StatNumber>
    </Stat>
  );
};

const Jackpot = () => {
  const { data, isSuccess } = useVapeGamePotValueEth();

  return (
    <Stat>
      <StatLabel>Current Jackpot</StatLabel>
      <StatNumber>{isSuccess ? formatEther(data!) + " ETH" : "..."}</StatNumber>
    </Stat>
  );
};

const TimeLeft = () => {
  const { data, isSuccess } = useVapeGameLastPurchasedTime();

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

const TakeAHit = () => {
  const { data: isPaused } = useVapeGameIsPaused();
  const { data: minInvest, isSuccess: isSuccessMinInvest } =
    useVapeGameMinInvest();
  const { writeAsync, isLoading: isLoadingTakeAHit } =
    useVapeGameTakeAVapeHit();
  const addRecentTransaction = useAddRecentTransaction();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [txHash, setTxHash] = useState("");

  return (
    <>
      <Stat>
        <StatLabel>Ticket Price</StatLabel>
        <StatNumber>
          {isSuccessMinInvest ? formatEther(minInvest!) + " ETH" : "..."}
        </StatNumber>
      </Stat>
      <Center width={"50%"}>
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
          <video autoPlay loop src={require("../../media/vape.mp4")} />
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
  address: `0x${string}`;
};

const Dividend = ({ address }: DividendProps) => {
  const { data: myDividend, isSuccess } = useVapeGameGetMyDividend({
    args: [address],
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
          <video autoPlay loop src={require("../../media/dance.mp4")} />
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
      you CANNOT buy $VAPE on an exchange! you must play the game to get it!
    </Text>
  );
};
