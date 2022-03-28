import { Dispatch, SetStateAction, useState } from "react";
import { Row, Col, Container } from 'react-bootstrap';
import config from './config/config.json';
import Supply from "./components/Supply";
import './App.css';
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import SplittedFaucet from "./components/Faucet/SplittedFaucet";
import SplittedWallet from "./components/Wallet/SplittedWallet";
import Header from "./components/Header";
import AppLogo from '../public/faucet-logo.png';
import Footer from "./components/Footer";

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

  // For Hangzhounet
  const [hanghzounetTezos, setHanghzounetTezos] = useState<TezosToolkit>(new TezosToolkit(config.networks.hangzhounet.rpcUrl));
  const [hangzhounetWallet, setHangzhounetWallet] = useState<any>(null);
  const [hangzhounetUserBalance, setHangzhounetUserBalance] = useState<number>(0);
  let hangzhounetUser: UserContext = { userAddress, setUserAddress, userBalance: hangzhounetUserBalance, setUserBalance: setHangzhounetUserBalance };

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

  let hangzhounetContext: TestnetContext = {
    userAddress,
    setUserAddress,
    userBalance: hangzhounetUserBalance,
    setUserBalance: setHangzhounetUserBalance,
    network: config.networks.hangzhounet,
    wallet: hangzhounetWallet,
    setWallet: setHangzhounetWallet,
    Tezos: hanghzounetTezos,
    setTezos: setHanghzounetTezos
  }

  const contextList2: TestnetContext[] = [hangzhounetContext, ithacanetContext];


  return (
    <>
      <Header />

      <Container>

        <Row>
          <Col md={4}>
            <img src={AppLogo} />
          </Col>
          <Col md={8}>
            <SplittedWallet user={hangzhounetUser} defaultNetwork={config.networks.hangzhounet} tezos={hangzhounetContext} contexts={contextList2} />
          </Col>
        </Row>

        <Row>
          <Col><SplittedFaucet network={config.networks.hangzhounet} user={hangzhounetUser} Tezos={hanghzounetTezos} /></Col>
          <Col><SplittedFaucet network={config.networks.ithacanet} user={ithacanetUser} Tezos={ithacanetTezos} /></Col>
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