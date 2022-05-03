import { useEffect, useState } from "react";
import { Row, Col, Container } from 'react-bootstrap';
import { TezosToolkit } from "@taquito/taquito";
import './App.css';
import AppLogo from "../public/faucet-logo.png";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Supply from "./components/Supply";
import SplittedFaucet from "./components/Faucet/SplittedFaucet";
import SplittedWallet from "./components/Wallet/SplittedWallet";
import { Network, TestnetContext, UserContext } from "./lib/Types";
import Config from "./Config";

function App() {

  useEffect(() => {
    console.log(`Loading ${Config.network.name}`);
  }, []);

  // Common user data
  const [userAddress, setUserAddress] = useState<string>("");
  const [userBalance, setUserBalance] = useState<number>(0);

  // network data
  const [network, setNetwork] = useState<Network>(Config.network);
  const [Tezos, setTezos] = useState<TezosToolkit>(new TezosToolkit(network.rpcUrl));
  const [wallet, setWallet] = useState<any>(null);

  let user: UserContext = { userAddress, setUserAddress, userBalance, setUserBalance };

  let testnet: TestnetContext = {
    network,
    wallet,
    setWallet,
    Tezos,
    setTezos
  }

  return (
    <>
      <Header />

      <Container>

        <Row>
          <Col md={4}>
            <img src={AppLogo} />
          </Col>
          <Col md={8}>
            <SplittedWallet user={user} network={network} testnetContext={testnet} />
          </Col>
        </Row>

        <Row>
          <Col>
            <SplittedFaucet network={network} user={user} Tezos={Tezos} />
          </Col>
        </Row>

        <Row>
          <Col>
            <Supply />
          </Col>
        </Row>
      </Container>

      <Footer />

    </>
  );
}


export default App;