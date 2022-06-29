import { NetworkType } from "@airgap/beacon-sdk";
import configData from './config-ghostnet.json';
import { ConfigType } from "./lib/Types";

let Config: ConfigType = configData;

switch (Config.network.name) {
    case "Mainnet":
        Config.network.networkType = NetworkType.MAINNET;
        break;
    case "Ithacanet":
        Config.network.networkType = NetworkType.ITHACANET;
        break;
    case "Ghostnet":
        Config.network.networkType = NetworkType.ITHACANET;
        break;
    case "Jakartanet":
        Config.network.networkType = NetworkType.JAKARTANET;
        break;
    default:
        Config.network.networkType = undefined;
}

Config.application.isBeaconWallet = (Config.network.networkType !== undefined);

//console.log(Config);

export default Config;