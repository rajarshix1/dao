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
  const [addr, setAddr] = useState(null)
  const [amount, setAmount] = useState(null)
  const [admin, setAdmin] = useState(false)
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

  const isAdmin = async () =>{
    Contract.setProvider(window.ethereum)
    var contract = new Contract(contractABI, contractAddress);
    if(walletAddress.length>1){
        const check = await contract.methods.hasRole('0x0000000000000000000000000000000000000000000000000000000000000000', walletAddress).call()
        setAdmin(check)
        console.log(check);
    }
  }
//   const createProposal = async () =>{
//     Contract.setProvider(window.ethereum)
    
//     var contract = new Contract(contractABI, contractAddress);
//     const create = await contract.methods.createProposal(desc, charity, amount).send({ from: walletAddress })
//   }
  const createStakeHolder = async () =>{
    if(admin){
        const create = await contract.methods.makeStakeholder(addr).send({ from: walletAddress })
    }
  }
  useEffect(() => {
    isAdmin()
  }, [walletAddress])



  return (
    <div className={styles.container}>
     <h1>{walletAddress}</h1>
     <button onClick={connectWallet}>Connect Wallet</button><br/>
     <input onChange={(e)=>setAddr(e.target.value)}  ></input>
     <button onClick={createStakeHolder}>Make StakeHolder</button>
    </div>
  )
}
