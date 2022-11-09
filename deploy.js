// const keyword makes it so that ethers can't be changed
const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config(); 

async function main() {
  // "http://127.0.0.1:4444"
  // This means we will be able to constantly connect to this URL
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_URL
  );
  // This allows us to interact with a wallet to do transactions
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY,provider);
 
  // const encrpytedJson = fs.readFileSync("./.encryptedKey.json", "utf8");
  // let wallet = new ethers.Wallet.fromEncryptedJsonSync(
  //   encrpytedJson, 
  //   process.env.PRIVATE_KEY_PASSWORD
  // ); 
  // wallet = await wallet.connect(provider);

  // reads both the bin and abi for simple storage constract
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying contracts pls wait...");
  const contract = await contractFactory.deploy();
  await contract.deployTransaction.wait(1); 
  // Outputs the contract address
  console.log(`Contract Address: ${contract.address}`)

  // Get fav number from smart contract  
  const currentFavoriteNumber = await contract.retrieve(); 
  // Use backticks and use dollar sign to read the variable
  console.log(`Current Favorite Number: ${currentFavoriteNumber.toString()}`); 

  // Changing favorite number using store function
  const transactionResponse = await contract.store("7"); 
  const transactionReceipt = await transactionResponse.wait(1); 
  const updatedFavoriteNumber = await contract.retrieve(); 
  console.log(`Updated Favorite Number is: ${updatedFavoriteNumber.toString()}`); 

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
