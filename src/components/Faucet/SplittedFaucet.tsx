import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { TezosToolkit } from '@taquito/taquito';
import FaucetInfo from "./FaucetInfo";
import FaucetRequestButton from "./FaucetRequestButton";
import FaucetSendButton from "./FaucetSendButton";
import { Alert, Card } from "react-bootstrap";
import Parser from 'html-react-parser';

type StatusContext = {
    isLoading: boolean;
    statusType: string;
    status: string;
    setLoading: Dispatch<SetStateAction<boolean>>;
    setStatusType: Dispatch<SetStateAction<string>>;
    setStatus: Dispatch<SetStateAction<string>>;
}

function SplittedFaucet({ network, user, Tezos }: { network: any, user: any, Tezos: TezosToolkit }) {

    const faucetAddress = network.faucetAddress;
    const [faucetBalance, setFaucetBalance] = useState<number>(0);

    const [isLoading, setLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<string>("");
    const [statusType, setStatusType] = useState<string>("");

    const statusContext = { isLoading, statusType, status, setLoading, setStatusType, setStatus };

    const readBalances = async (): Promise<void> => {
        try {
            const faucetBalance = await Tezos.tz.getBalance(faucetAddress);
            setFaucetBalance(faucetBalance.toNumber());

            user.setUserBalance(await Tezos.tz.getBalance(user.userAddress));
        } catch (error) {
            //console.log(error);
        }
    };

    useEffect(() => {
        readBalances();
    }, [isLoading]);

    return (
        <Card>
            <Card.Header>{network.name} faucet</Card.Header>
            <Card.Body>
                <FaucetInfo faucetAddress={faucetAddress} faucetBalance={faucetBalance} />
                <FaucetRequestButton network={network} user={user} status={statusContext} />
                &nbsp;
                {network.allowSendButton &&

                    <FaucetSendButton network={network} user={user} Tezos={Tezos} status={statusContext} />
                }
                <br />
                <br />
                <Alert variant={statusType}>
                    {Parser(status)}
                </Alert>
            </Card.Body>
        </Card>
    )
}

export default SplittedFaucet;