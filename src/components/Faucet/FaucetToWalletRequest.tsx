import { TezosToolkit } from "@taquito/taquito";
import FaucetRequestButton from "./FaucetRequestButton";
import FaucetSendButton from "./FaucetSendButton";
import UserInfo from "./UserInfo";

function FaucetToWalletRequest({ user, network, status, Tezos }: { user: any, network: any, status: any, Tezos: TezosToolkit }) {

    return (
        <>
            <UserInfo user={user} displayBalance={true}/>
            <FaucetRequestButton network={network} to={user.userAddress} status={status} />
            &nbsp;
            {network.allowSendButton &&

                <FaucetSendButton network={network} user={user} Tezos={Tezos} status={status} />
            }
        </>
    )
}

export default FaucetToWalletRequest;