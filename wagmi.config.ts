import { defineConfig, loadEnv } from "@wagmi/cli";
import { etherscan, react, erc } from "@wagmi/cli/plugins";
import { goerli } from "wagmi/chains";

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
        chainId: goerli.id,
        contracts: [
          {
            name: "VapeGame",
            address: {
              [goerli.id]: "0x2C39b2ac0A7261F95E4495b1d4910b9B8f16caa6",
            },
          },
          {
            name: "ZoomerCoin",
            address: {
              [goerli.id]: "0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1",
            },
          },
        ],
      }),
      react(),
    ],
  };
});
