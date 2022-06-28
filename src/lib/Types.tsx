import { Dispatch, SetStateAction } from "react";
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { NetworkType } from "@airgap/beacon-sdk";

type ApplicationConfig = {
    name: string;
    adminAddress: string;
    googleCaptchaSiteKey: string;
    isBeaconWallet?: boolean;
}

type NetworkConfig = {
    name: string;
    rpcUrl: string;
    faucetAddress: string;
    balanceMax: number;
    viewer: string;
    checksum: string;
    allowSendButton: boolean;
    networkType?: any;
}

type ConfigType = {
    application: ApplicationConfig;
    network: NetworkConfig;
}

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

export { ConfigType, Network, UserContext, TestnetContext };