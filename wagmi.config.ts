import { defineConfig, loadEnv } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import { goerli } from "wagmi/chains";

export default defineConfig(() => {
  const env = loadEnv({
    mode: process.env.NODE_ENV,
    envDir: process.cwd(),
  });
  return {
    out: "src/generated.ts",
    plugins: [
      etherscan({
        apiKey: env.ETHERSCAN_API_KEY!,
        chainId: goerli.id,
        contracts: [
          {
            name: "VapeGame",
            address: {
              [goerli.id]: "0xD38f9B96BE3b5d9D5e245D1Bb35ed65Bd596B338",
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
