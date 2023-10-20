import { defineConfig, loadEnv } from "@wagmi/cli";
import { etherscan, react, erc } from "@wagmi/cli/plugins";
import { goerli, mainnet } from "wagmi/chains";

export default defineConfig(() => {
  const env = loadEnv({
    mode: process.env.NODE_ENV,
    envDir: process.cwd(),
  });
  return {
    out: "src/generated.ts",
    plugins: [
      erc({
        20: false,
        721: true,
      }),
      etherscan({
        apiKey: env.ETHERSCAN_API_KEY!,
        chainId: mainnet.id,
        contracts: [
          {
            name: "VapeGame",
            address: {
              [goerli.id]: "0xE7e52781F4D7af7CD008C02d630d06a22dcEAb14",
              [mainnet.id]: "0x0D6dC2a36C5c3EbD6F9B67Afd18b31C0074089E5",
            },
          },
          {
            name: "ZoomerCoin",
            address: {
              [goerli.id]: "0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1",
              [mainnet.id]: "0x0D505C03d30e65f6e9b4Ef88855a47a89e4b7676",
            },
          },
        ],
      }),
      react(),
    ],
  };
});
