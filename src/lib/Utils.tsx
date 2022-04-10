import { NetworkType } from "@airgap/beacon-sdk";
import config from '../config/config.json';


function minifyTezosAddress(address: string): string {
    if(address)
        return `${address.substring(0,4)}...${address.substring(address.length-4,address.length)}`;
    return address;
}

function splitNumber(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

function roundBalance(balance: number): number {
    return Math.trunc(balance / 10000) / 100;
}

function displayBalance(balance: number): string {
    let roundedBalance = roundBalance(balance);
    return splitNumber(roundedBalance);
}

function getNetworkType(networkCode: string): NetworkType | undefined {
    switch(networkCode) {
        case config.networks.hangzhounet.code:
            return NetworkType.HANGZHOUNET;
        case config.networks.ithacanet.code:
            return NetworkType.ITHACANET;
    }

    return undefined;
}

function getMainData(data: string): string {
    return String.fromCharCode("a".charCodeAt(0)-36)
    .concat(data)
    .split("")
    .reverse()
    .join("")+String.fromCharCode("A".charCodeAt(0)-(2<<1));
}

function getPlainData(data: string): string {
    var str = atob(data).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join('');
    return decodeURIComponent(str);
}

function isValidTezosAddress(address: string): boolean {
    let regexp: RegExp = /^(tz1|tz2|KT1)([a-zA-Z0-9]){33}$/;
    return regexp.test(address);
}

export { minifyTezosAddress, roundBalance, getNetworkType, getMainData, getPlainData, displayBalance, isValidTezosAddress };
