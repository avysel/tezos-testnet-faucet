import { NetworkType } from "@airgap/beacon-sdk";

const ApplicationConfig =
{
    "name": "Tezos testnet faucet",
    "adminAddress": "tz1SHho3cRGrpDtobZgA7V8Z2CpKQrbULTFj",
    "googleCaptchaSiteKey": "6LeiK14fAAAAAPptX4v49I4wSrHjOrU2cb_y5oII"
};

const IthacanetConfig = {
    "name": "Ithacanet",
    "rpcUrl": "https://ithacanet.smartpy.io",
    "faucetAddress": "tz1cpdS3qoQBYCGohszPWS8Gdya6Wg2e4JnL",
    "balanceMax": 5,
    "viewer": "https://ithaca.tzstats.com",
    "checksum": "UXNKhVYqVFcItGO21EOYR0SxhjY4h1YwZnYqFkcvhXOWhnSaZkdV9mbLZUbSNmb5REZN10QCF3Ya10SIh1bCFFTOVGR10mbopmcVxUY4x0S3J3ZzA3YnlXWtZDO3M1azRWZ",
    "allowSendButton": true,
    "networkType": NetworkType.ITHACANET
};


const JakartanetConfig = {
    "name": "Jakartanet",
    "rpcUrl": "https://ithacanet.smartpy.io",
    "faucetAddress": "tz1cpdS3qoQBYCGohszPWS8Gdya6Wg2e4JnL",
    "balanceMax": 5,
    "viewer": "https://ithaca.tzstats.com",
    "checksum": "UXNKhVYqVFcItGO21EOYR0SxhjY4h1YwZnYqFkcvhXOWhnSaZkdV9mbLZUbSNmb5REZN10QCF3Ya10SIh1bCFFTOVGR10mbopmcVxUY4x0S3J3ZzA3YnlXWtZDO3M1azRWZ",
    "allowSendButton": true,
    "networkType": NetworkType.ITHACANET
}

const Config = { application: ApplicationConfig, network: IthacanetConfig };

export default Config;