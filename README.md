# Tezos testnet faucet

## Presentation

One-click faucet for Tezos testnets.

Currently supported:
- Ithacanet

## URL

Deployed on https://tezos-testnet-faucet.netlify.app.

[![Netlify Status](https://api.netlify.com/api/v1/badges/ae801f5a-b160-44fb-9a2c-b017977a237a/deploy-status)](https://app.netlify.com/sites/tezos-testnet-faucet/deploys)

## Deep inside

### Made with

![React.js](assets/react-logo.png) | ![Parcel.js](assets/parcel-logo.png) | ![Typescript](assets/typescript-logo.png) | ![Taquito](assets/taquito-logo.png) | ![Beacon wallet](assets/beaconwallet-logo.png) | ![React Bootstrap](assets/react-bootstrap-logo.png)
---|---|---|---|---|---
React | Parcel | Typescript | Taquito | Beacon wallet | React Bootstrap

### Use

Download
```
git clone git@github.com:avysel/tezos-testnet-faucet.git
cd tezos-testnet-faucet
```

Install
```
npm install
```
Build for local
``` 
npm run build
```

Run on local server
```
npm run start
```

Build for deploy
```
npm run predeploy
```

Deploy on Github Pages
```
npm run deploy
```

Parameter the port with environment variable:
```
PORT=3000
```

Default is `1234`.

### Config

Config file is `Config.tsx`.

Update this file to plug the faucet on another testnet.

Create a new `const` with testnet parameters:

```
const IthacanetConfig = {
    "name": "Ithacanet",
    "rpcUrl": "https://ithacanet.smartpy.io",
    "faucetAddress": "tz1cpdS3qoQBYCGohszPWS8Gdya6Wg2e4JnL",
    "balanceMax": 5,
    "viewer": "https://ithaca.tzstats.com",
    "checksum": "xxx",
    "allowSendButton": true,
    "networkType": NetworkType.ITHACANET
};
```

- ```name```: the application name, to be displayed on both web page and wallet when asking for connection.
- ```rpcUrl```: the RPC endpoint to connect to
- ```faucetAddress```: faucet public address
- ```balanceMax```: maximum balance fo a wallet to request a ꜩ.
- ```viewer```: URL of a viewer that allow to display operation detail like `http://viewer-url.com/{tx_hash}`
- ```allowSendButton```: `true` to display a button to create a tx that send 1 ꜩ from user to faucet, `false` otherwise
- ```networkType```: a constant from @airgap/beacon-sdk/NetworkType that represent the testnet

Then use this new object to be returned as `network` field of `Config` export:

```
const Config = { application: ApplicationConfig, network: IthacanetConfig };
```

### Backend

This front-end faucet uses a backend to manage secrets. Please refer to backend project (if you are allowed to) to update testnet secret configuration.


### Deploy

Build Docker image:

```
docker build . -t tezos-ithacanet-faucet
```

Run Docker image:
```
docker run -p 8000:80 tezos-ithacanet-faucet
```
