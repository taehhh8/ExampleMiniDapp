import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    hardhat: {},
    kaia: {
      url: "https://public-en.node.kaia.io",
      accounts: process.env.PRIVATE_KEY
        ? [process.env.PRIVATE_KEY]
        : [
            "0x7eff112dab68890a60c89d69c2ce1ebb115172f6760508ce6c8ea8fe8afe1e20",
            "0xc696ccd259792f2ffb87e0012e4a37ae3526a3224686225af679e3aaa2aeab0d",
          ],
    },
    kairos: {
      url: "https://public-en-kairos.node.kaia.io",
      accounts: process.env.PRIVATE_KEY
        ? [process.env.PRIVATE_KEY]
        : [
            "0x7eff112dab68890a60c89d69c2ce1ebb115172f6760508ce6c8ea8fe8afe1e20",
            "0xc696ccd259792f2ffb87e0012e4a37ae3526a3224686225af679e3aaa2aeab0d",
          ],
    },
  },
  solidity: {
    version: "0.8.27",
    settings: {
      optimizer: {
        enabled: false,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 40000,
  },
};

export default config;
