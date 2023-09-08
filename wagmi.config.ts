import { defineConfig } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import { erc20ABI } from "wagmi";
import { goerli } from "wagmi/chains";

export default defineConfig({
  out: "src/generated.ts",
  contracts: [
    {
      name: "erc20",
      abi: erc20ABI,
    },
  ],
  plugins: [
    etherscan({
      apiKey: process.env.ETHERSCAN_API_KEY!,
      chainId: goerli.id,
      contracts: [
        {
          name: "VapeToken",
          address: {
            [goerli.id]: "0x38A305d6250895b9d3f496305F4c2eC8265FD7aA",
          },
        },
      ],
    }),
    react(),
  ],
});
