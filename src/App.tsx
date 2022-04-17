import { Dispatch, SetStateAction, useState } from "react";
import { Row, Col, Container } from 'react-bootstrap';
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import config from './config/config.json';
import './App.css';
import AppLogo from "../public/faucet-logo.png";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Supply from "./components/Supply";
import SplittedFaucet from "./components/Faucet/SplittedFaucet";
import SplittedWallet from "./components/Wallet/SplittedWallet";


type UserContext = {
  userAddress: string;
  setUserAddress: Dispatch<SetStateAction<string>>;
  userBalance: number;
  setUserBalance: Dispatch<SetStateAction<number>>;
};

type TestnetContext = {
  network: any;
  userAddress: string;
  setUserAddress: Dispatch<SetStateAction<string>>;
  userBalance: number;
  setUserBalance: Dispatch<SetStateAction<number>>;
  wallet: BeaconWallet;
  setWallet: Dispatch<SetStateAction<any>>;
  Tezos: TezosToolkit;
  setTezos: Dispatch<SetStateAction<any>>;
}

function App() {

  // Common data
  const [userAddress, setUserAddress] = useState<string>("");

  // For Ithacanet
  const [ithacanetTezos, setIthacanetTezos] = useState<TezosToolkit>(new TezosToolkit(config.networks.ithacanet.rpcUrl));
  const [ithacanetWallet, setIthacanetWallet] = useState<any>(null);
  const [ithacanetUserBalance, setIthacanetUserBalance] = useState<number>(0);
  let ithacanetUser: UserContext = { userAddress, setUserAddress, userBalance: ithacanetUserBalance, setUserBalance: setIthacanetUserBalance };

  let ithacanetContext: TestnetContext = {
    userAddress,
    setUserAddress,
    userBalance: ithacanetUserBalance,
    setUserBalance: setIthacanetUserBalance,
    network: config.networks.ithacanet,
    wallet: ithacanetWallet,
    setWallet: setIthacanetWallet,
    Tezos: ithacanetTezos,
    setTezos: setIthacanetTezos
  }

  const contextList: TestnetContext[] = [ ithacanetContext];


  return (
    <>
      <Header />

      <Container>

        <Row>
          <Col md={4}>
            <img src={AppLogo} />
          </Col>
          <Col md={8}>
            <SplittedWallet user={ithacanetUser} defaultNetwork={config.networks.ithacanet} tezos={ithacanetContext} testnetContexts={contextList} />
          </Col>
        </Row>

        <Row>
          <Col>
            <SplittedFaucet network={config.networks.ithacanet} user={ithacanetUser} Tezos={ithacanetTezos} />
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