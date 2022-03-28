import { BeaconEvent, defaultEventCallbacks } from "@airgap/beacon-sdk";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";
import config from '../../config/config.json';
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { displayBalance, getNetworkType } from "../../lib/Utils";

function SplittedWallet({ user, tezos, defaultNetwork, contexts }: { user: any, tezos: any, defaultNetwork: any, contexts: any[] }) {

    const [balanceList, setBalanceList] = useState<any>();

    /**
     * Set user address and balances on wallet connection
     */
    const setup = async (userAddress: string): Promise<void> => {

        user.setUserAddress(userAddress);

        contexts.map(async (context) => {
            context.setUserAddress(userAddress);
            const balance = await context.Tezos.tz.getBalance(userAddress);
            context.setUserBalance(balance.toNumber());
        })
    };

    const connectWallet = async (): Promise<void> => {
        try {
            await tezos.wallet.requestPermissions({
                network: {
                    type: getNetworkType(defaultNetwork.code),
                    rpcUrl: defaultNetwork.rpcUrl
                }
            });
            // gets user's address
            const userAddress = await tezos.wallet.getPKH();
            await setup(userAddress);
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Update balance display from context data
     */
     const updateBalances = (): void => {

        let bl = contexts.map((context) =>
            <Col>
                <b>{context.network.name} balance: </b>
                {displayBalance(context.userBalance)} ꜩ
            </Col>
        );
        setBalanceList(bl);
    }


    useEffect(
        () => {
            updateBalances();
        },
        [contexts.map(context => context.userBalance)],
    );

    useEffect(() => {
        (async () => {
            // creates a wallet instance
            const wallet = new BeaconWallet({
                name: config.application.name,
                preferredNetwork: getNetworkType(defaultNetwork.code),
                disableDefaultEvents: true, // Disable all events / UI. This also disables the pairing alert.
                eventHandlers: {
                    // To keep the pairing alert, we have to add the following default event handlers back
                    [BeaconEvent.PAIR_INIT]: {
                        handler: defaultEventCallbacks.PAIR_INIT
                    },
                    [BeaconEvent.PAIR_SUCCESS]: {
                        handler: data => console.log(data.publicKey)
                    }
                }
            });
            tezos.Tezos.setWalletProvider(wallet);
            tezos.setWallet(wallet);
            // checks if wallet was connected before
            const activeAccount = await wallet.client.getActiveAccount();
            if (activeAccount) {
                const userAddress = await wallet.getPKH();
                await setup(userAddress);
            }

        })();
    }, []);

    const disconnectWallet = async (): Promise<void> => {
        user.setUserAddress("");
        user.setUserBalance(0);
        //tezos.setWallet(null);
        const tezosTK = new TezosToolkit(defaultNetwork.rpcUrl);
        tezos.setTezos(tezosTK);
        console.log("disconnecting wallet");
        if (tezos.wallet) {
            await tezos.wallet.clearActiveAccount();
            /*await tezos.wallet.client.removeAllAccounts();
            await tezos.wallet.client.removeAllPeers();
            await tezos.wallet.client.destroy();*/
        }
        location.reload();
    };

    return (
        <Card>
            <Card.Header>My wallet</Card.Header>
            <Card.Body>
                {(user.userAddress != null && user.userAddress != "") &&
                    <Card.Text>
                        <div><b>Address:</b> {user.userAddress}</div>
                        <Container className="balances">
                            <Row>
                                {balanceList}
                            </Row>
                        </Container>
                        <br />
                        <div><Button variant="outline-danger" onClick={disconnectWallet}>Disconnect</Button></div>
                    </Card.Text>
                }

                {(user.userAddress == null || user.userAddress == "") &&
                    <Card.Text>
                        <Button variant="outline-primary" onClick={connectWallet}>Sync wallet</Button>
                    </Card.Text>
                }

            </Card.Body>
        </Card>
    )
}

export default SplittedWallet;