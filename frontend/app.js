let web3;
let contract;

// ✅ PUT YOUR CONTRACT ADDRESS FROM REMIX HERE
const contractAddress = "0x4042aD9B8Cb162bCDCb5BAB8bfBeb4b436AceBf2";

const abi = [
  {
    "inputs": [{"internalType": "string","name": "candidate","type": "string"}],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "string","name": "candidate","type": "string"}],
    "name": "getVotes",
    "outputs": [{"internalType": "uint256","name":"","type":"uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
];

window.onload = async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);

    await ethereum.request({ method: 'eth_requestAccounts' });

    contract = new web3.eth.Contract(abi, contractAddress);

    loadVotes();
  } else {
    alert("Install MetaMask!");
  }
};

async function vote(name) {
  const accounts = await web3.eth.getAccounts();

  await contract.methods.vote(name).send({
    from: accounts[0]
  });

  loadVotes();
}

async function loadVotes() {
  const alice = await contract.methods.getVotes("Alice").call();
  const bob = await contract.methods.getVotes("Bob").call();

  document.getElementById("aliceVotes").innerText = "Alice: " + alice;
  document.getElementById("bobVotes").innerText = "Bob: " + bob;
  setInterval(loadVotes, 3000); // refresh every 3 seconds
}