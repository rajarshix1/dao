import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { contractABI } from '../abi'
import { constants } from '../constants'
var Contract = require('web3-eth-contract');

// set provider for all later instances to use
export default function Home() {
  Contract.setProvider(constants.bscRPC)
  
  var contract = new Contract(contractABI, constants.contractAddress);
  const func = async () =>{
    contract.methods.deployer().call()
  }
  return (
    <div className={styles.container}>
     <h1>8k DAO</h1>
     <button onClick={func}>click</button>
    </div>
  )
}
