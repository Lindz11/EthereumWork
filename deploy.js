// const keyword makes it so that ethers can't be changed
const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  // HTTP://0.0.0.0:7545
  // This means we will be able to constantly connect to this URL
  const provider = new ethers.providers.JsonRpcProvider("HTTP://0.0.0.0:7545");
  // This allows us to interact with a wallet to do transactions
  const wallet = new ethers.Wallet(
    "1597f41ba5cf975354320d2bd73eb10d59fa6f10ec43200e09895ad75e3611dc",
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
  console.log(contract);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
