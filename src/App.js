import { useState } from "react";
import "./styles.css";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { newKitFromWeb3 } from "@celo/contractkit";
// import { useContractKit } from "@celo-tools/use-contractkit";
// import "@celo-tools/use-contractkit/lib/styles.css";

export default function App() {
  const [address, setAddress] = useState("");
  // const { address, connect } = useContractKit();

  const web3 = new Web3(Web3.givenProvider);
  const connect = async () => {
    const provider = new WalletConnectProvider({
      rpc: {
        44787: "https://alfajores-forno.celo-testnet.org",
        42220: "https://forno.celo.org"
      }
    });

    await provider.enable();
    const web3 = new Web3(provider);
    let kit = newKitFromWeb3(web3);

    kit.defaultAccount = provider.accounts[0];
    setAddress(kit.defaultAccount);

    provider.on("accountsChanged", (accounts) => {
      console.log(accounts);
    });

    // this.setState({provider, kit})
  };
  // const connect = async () => {
  //   await window.ethereum.request({
  //     method: "wallet_requestPermissions",
  //     params: [
  //       {
  //         eth_accounts: {}
  //       }
  //     ]
  //   });

  //   const account = await web3.eth.requestAccounts();
  //   setAddress(account);
  // };

  const getBalance = async () => {
    const check = web3.utils.fromWei("1", "ETHER");
    console.log(check);
  };
  getBalance();
  console.log(address);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={connect}>Connect</button>
      <p>{address}</p>
    </div>
  );
}
