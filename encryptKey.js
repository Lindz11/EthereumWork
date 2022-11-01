const ethers = require("ethers"); 
const fs = require("fs-extra"); 
require("dotenv").config(); 

async function main() {
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY); 
    // Encypting the private key 
    const encrpytedJsonKey = await wallet.encrypt(
        process.env.PRIVATE_KEY_PASSWORD, 
        process.env.PRIVATE_KEY
        );

    console.log(encrpytedJsonKey);
    // Writing the encrypted key to a new file
    fs.writeFileSync("./.encryptedKey.json", encrpytedJsonKey); 
}



main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });