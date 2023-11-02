import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";

const walletConnectProjectId = "296a55745d9880bb16e1386b1b0eb360";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [
    publicProvider(),
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY_MAINNET! }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Zoomer Vape Game",
  chains,
  projectId: walletConnectProjectId,
});

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export { chains };
