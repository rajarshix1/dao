import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { contractABI } from "../abi";
import {
  bscRPC,
  constants,
  contractAddress,
  defaultChainId,
  defaultChainId_hex,
} from "../constants";
import Web3 from "web3";
import { useEffect, useState } from "react";
var Contract = require("web3-eth-contract");

// set provider for all later instances to use
export default function Home() {
  const [walletAddress, setWalletAddress] = useState("");
  const [desc, setDesc] = useState("");
  const [charity, setCharity] = useState(null);
  const [amount, setAmount] = useState(null);
  const [allProposals, setAllProposals] = useState([]);

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
    setWalletAddress(account);
    // Setting a balance
  };

  const getALL = async () => {
    Contract.setProvider(window.ethereum);
    var contract = new Contract(contractABI, contractAddress);
    const all = await contract.methods.getProposals().call();
    console.log(all);
    console.log(all[0].amount);
    setAllProposals(all);
  };
  const createProposal = async () => {
    Contract.setProvider(window.ethereum);
    var contract = new Contract(contractABI, contractAddress);
    // const create = await contract.methods.createProposal(desc, charity, amount).send({ from: walletAddress })
  };
  const vote = async (id, choice) => {
    Contract.setProvider(window.ethereum);
    var contract = new Contract(contractABI, contractAddress);
    const vote = await contract.methods
      .vote(id, choice)
      .send({ from: walletAddress });
  };

  useEffect(() => {
    getALL();
  }, []);

  // const abc = await contract.methods.DEFAULT_ADMIN_ROLE().call()
  // const xx1 = await contract.methods.deployer().call()
  // const grantRole1 = await contract.methods.grantRole('0xf4bb84e1768dd286358a736d195a0b228621173f655a73b89bf8b191ed0ba07d', "0x0f2B0d2A580f1CBb5B377916792AbE5471197f4a").send({ from: walletAddress })
  // const grantRole2 = await contract.methods.grantRole('0xf4bb84e1768dd286358a736d195a0b228621173f655a73b89bf8b191ed0ba07d', "0x905819783825B4395D9B1F276556955705378b0f").send({ from: walletAddress })
  // console.log(abc, xx1)

  return (
    <div className={styles.container}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "8px 16px 8px 16px",
        }}
      >
        {walletAddress && (
          <button className={styles.btn} onClick={connectWallet}>
            {walletAddress.substring(0, 4) +
              "...." +
              walletAddress.substring(38, walletAddress.length)}
          </button>
        )}
        {!walletAddress && (
          <button className={styles.btn} onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
      <form
        action="#"
        style={{
          backgroundColor: "#F6F7FC",
          width: "50%",
          padding: "24px",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <input
            placeholder="Description"
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid grey",
              borderRadius: "10px",
            }}
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          <input
            placeholder="Charity address"
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid grey",
              borderRadius: "10px",
            }}
            type="text"
            value={charity}
            onChange={(e) => setCharity(e.target.value)}
          />
          <input
            placeholder="Amount"
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid grey",
              borderRadius: "10px",
            }}
            type="Number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button className={styles.btn} onClick={() => createProposal()}>
            Create Proposal
          </button>
        </div>
      </form>

      <div
        style={{
          display: "flex",
          columnGap: "24px",
          rowGap: "20px",
          flexWrap: "wrap",
          padding: "24px",
        }}
      >
        {allProposals &&
          allProposals.map((e) => (
            <div
              style={{
                border: "1px solid grey",
                padding: "12px",
                width: "450px",
                borderRadius: "10px",
              }}
            >
              <h3
                style={{
                  fontSize: "24px",
                }}
              >
                Description: {e.description}
              </h3>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  className={styles.btn}
                  onClick={() => {
                    vote(e.id, true);
                  }}
                >
                  Vote for
                </button>
                <button
                  className={styles.btn}
                  onClick={() => {
                    vote(e.id, false);
                  }}
                >
                  Vote against
                </button>
              </div>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                <p>ID: {e.id}</p>
                <p>Amount: {e.amount}</p>
                <p>CharityAddress: {e.charityAddress}</p>
                <p>LivePeriod: {new Date(e.livePeriod * 1000).toISOString()}</p>
                <p>Paid: {e.paid}</p>
                <p>PaidBy: {e.paidBy}</p>
                <p>Proposer: {e.proposer}</p>
                <p>VotesAgainst: {e.votesAgainst}</p>
                <p>VotesFor: {e.votesFor}</p>
                <p>VotingPassed: {e.votingPassed}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
