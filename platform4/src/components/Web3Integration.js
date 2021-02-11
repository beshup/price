import Web3 from 'web3';

WEB3.HTTP = 'http://localhost:3000/'
WEB3.ABI = 
WEB3.ADDRESS_CONTRACT = 

let web3 = new Web3(new Web3.providers.HttpProvider(WEB3.HTTP))

const SimpleStorage = web3.eth.contract(WEB3.ABI)
const contract = SimpleStorage(WEB3.ADDRESS_CONTRACT)

async function loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
    }
}

async function load() {
    await loadWeb3();
    updateStatus('Ready!');
}

function updateStatus(status) {
    const statusEl = document.getElementById('status');
    statusEl.innerHTML = status;
    console.log(status);
}

async function loadContract() {
    return await new window.web3.eth.Contract(ABI, contractAddress);
}

load();