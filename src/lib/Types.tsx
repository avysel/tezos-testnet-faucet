import { Dispatch, SetStateAction } from "react";
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { NetworkType } from "@airgap/beacon-sdk";

// Must match Config.tsx "network" item
type Network = {
    name: string;
    rpcUrl: string;
    faucetAddress: string;
    balanceMax: number;
    viewer: string;
    checksum: string;
    allowSendButton: boolean;
    networkType: NetworkType;
}

type UserContext = {
    userAddress: string;
    setUserAddress: Dispatch<SetStateAction<string>>;
    userBalance: number;
    setUserBalance: Dispatch<SetStateAction<number>>;
};

type TestnetContext = {
    network: Network;
    wallet: BeaconWallet;
    setWallet: Dispatch<SetStateAction<any>>;
    Tezos: TezosToolkit;
    setTezos: Dispatch<SetStateAction<any>>;
}

export { Network, UserContext, TestnetContext };