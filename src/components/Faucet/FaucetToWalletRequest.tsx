import { TezosToolkit } from "@taquito/taquito";
import { Row, Col } from "react-bootstrap";
import FaucetRequestButton from "./FaucetRequestButton";
import FaucetSendButton from "./FaucetSendButton";
import UserInfo from "./UserInfo";

function FaucetToWalletRequest({ user, network, status, Tezos }: { user: any, network: any, status: any, Tezos: TezosToolkit }) {

    return (
        <>
            <div className="faucet-part-user">
                <UserInfo user={user} displayBalance={true} />
            </div>

            <div>
                <FaucetRequestButton network={network} to={user.userAddress} status={status} />
                &nbsp;
                {network.allowSendButton &&

                    <FaucetSendButton network={network} user={user} Tezos={Tezos} status={status} />
                }
            </div>
        </>
    )
}

export default FaucetToWalletRequest;