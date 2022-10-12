import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { contractABI } from '../abi'
import { bscRPC, constants, contractAddress, defaultChainId, defaultChainId_hex } from '../constants'
import Web3 from 'web3'
import { useEffect, useState } from 'react'
var Contract = require('web3-eth-contract');

// set provider for all later instances to use
export default function Home() {
  const [walletAddress, setWalletAddress] = useState('')
  const [desc, setDesc] = useState("")
  const [charity, setCharity] = useState(null)
  const [amount, setAmount] = useState(null)
  
  const connectWallet = async () => {
  
    // Asking if metamask is already present or not
    if (window.ethereum) {
  
      // res[0] for fetching a first wallet
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => accountChangeHandler(res[0]));
    } else {
      alert("install metamask extension!!");
    }
  };
  
  // getbalance function for getting a balance in
  // a right format with help of ethers
  
  // Function for getting handling all events
  const accountChangeHandler = (account) => {
    // Setting an address data
    setWalletAddress(account)
    // Setting a balance
  };

  const getALL = async () =>{
    Contract.setProvider(window.ethereum)
    
    var contract = new Contract(contractABI, contractAddress);
    const all = await contract.methods.getProposals().call()
    console.log(all);
  }
  const createProposal = async () =>{
    Contract.setProvider(window.ethereum)
    
    var contract = new Contract(contractABI, contractAddress);
    const create = await contract.methods.createProposal(desc, charity, amount).send({ from: walletAddress })
  }
  const createStakeHolder = async () =>{
    Contract.setProvider(window.ethereum)
    
    var contract = new Contract(contractABI, contractAddress);
    const create = await contract.methods.makeStakeholder(walletAddress).send({ from: walletAddress })
  }
  useEffect(() => {
    getALL()
  
   
  }, [])
  
  // const abc = await contract.methods.DEFAULT_ADMIN_ROLE().call()
  // const xx1 = await contract.methods.deployer().call()
  // const grantRole1 = await contract.methods.grantRole('0xf4bb84e1768dd286358a736d195a0b228621173f655a73b89bf8b191ed0ba07d', "0x0f2B0d2A580f1CBb5B377916792AbE5471197f4a").send({ from: walletAddress })
  // const grantRole2 = await contract.methods.grantRole('0xf4bb84e1768dd286358a736d195a0b228621173f655a73b89bf8b191ed0ba07d', "0x905819783825B4395D9B1F276556955705378b0f").send({ from: walletAddress })
  // console.log(abc, xx1)


  return (
    <div className={styles.container}>
     <h1>{walletAddress}</h1>
     <button onClick={createStakeHolder}>click</button>
     <button onClick={connectWallet}>Connect Wallet</button><br/>
     <div className="flex p-2 px-4 gap-2 bg-gray-100 rounded-sm">
            <input
              placeholder="Description"
              className="flex-1 bg-transparent outline-none border-none font-light"
              type="text"
              value={desc}
              onChange={(e)=>setDesc(e.target.value)}  
            />
            <span>{desc}</span>
          </div>
     <div className="flex p-2 px-4 gap-2 bg-gray-100 rounded-sm">
            <input
              placeholder="Charity address"
              className="flex-1 bg-transparent outline-none border-none font-light"
              type="text"
              value={charity}
              onChange={(e)=>setCharity(e.target.value)}  
            />
            <span>{charity}</span>
          </div>
     <div className="flex p-2 px-4 gap-2 bg-gray-100 rounded-sm">
            <input
              placeholder="Amount"
              className="flex-1 bg-transparent outline-none border-none font-light"
              type="Number"
              value={amount}
              onChange={(e)=>setAmount(e.target.value)}  
            />
            <span>{amount}</span>
          </div>
          <button className="bg-red-300 p-2 px-4 mt-2 rounded w-full" onClick={()=>createProposal()}>
            Create Proposal
          </button>
    </div>
  )
}
