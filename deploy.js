// const keyword makes it so that ethers can't be changed
const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  // "http://127.0.0.1:4444"
  // This means we will be able to constantly connect to this URL
  const provider = new ethers.providers.JsonRpcProvider(
    "HTTP://127.0.0.1:8545"
  );
  // This allows us to interact with a wallet to do transactions
  const wallet = new ethers.Wallet(
    "0x2b9941b3f6806cc9da3d3646f9f5253b3e770eb2c3be3ba412ce3348621314bb",
    provider
  );

  // reads both the bin and abi for simple storage constract
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying contracts pls wait...");
  const contract = await contractFactory.deploy();
  const deploymentReceipt = await contract.deployTransaction.wait(1);
  console.log(deploymentReceipt);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
