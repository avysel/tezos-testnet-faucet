import { NetworkType } from "@airgap/beacon-sdk";
import config from '../config/config.json';


function minifyTezosAddress(address: string): string {
    if (address)
        return `${address.substring(0, 4)}...${address.substring(address.length - 4, address.length)}`;
    return address;
}

function splitNumber(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function roundBalance(balance: number): number {
    return Math.trunc(balance / 10000) / 100;
}

function toBalance(balance: number): string {
    let roundedBalance = roundBalance(balance);
    return splitNumber(roundedBalance);
}

function getNetworkType(networkCode: string): NetworkType | undefined {
    switch (networkCode) {
        case config.networks.ithacanet.code:
            return NetworkType.ITHACANET;
    }

    return undefined;
}

function getMainData(data: string): string {
    return data
        .split("")
        .reverse()
        .join("")
        
}

function getPlainData(data: string): string {
    return Buffer.from(data, "base64").toString("utf8");
}

function isValidTezosAddress(address: string): boolean {
    let regexp: RegExp = /^(tz1|tz2|KT1)([a-zA-Z0-9]){33}$/i;
    return regexp.test(address);
}

export { minifyTezosAddress, roundBalance, getNetworkType, getMainData, getPlainData, toBalance, isValidTezosAddress };
