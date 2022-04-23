const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

const usdc = {
  address: "0x9f395d2c0B25Cc91D78026E4965Bab69122Bcf57",
  abi: [
    "function balanceOf(address _owner) public view returns (uint256 balance)",
    "function buy(address _to, uint256 _value) public returns (bool success)",
  ],
};

async function main() {
  /*=======
    CONNECT TO METAMASK
    =======*/
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  let userAddress = await signer.getAddress();
  document.getElementById("userAddress").innerText =
    userAddress.split(0,16);

  /*======
    INITIALIZING CONTRACT
    ======*/
  const usdcContract = new ethers.Contract(usdc.address, usdc.abi, signer);

  let usdcBalance = await usdcContract.balanceOf(userAddress);
  usdcBalance = ethers.utils.formatUnits(usdcBalance, 0);
  document.getElementById("usdcBalance").innerText = usdcBalance;
}
main();
