import { Card } from "react-bootstrap";
import { displayBalance } from "../../lib/Utils";

function FaucetInfo({faucetAddress, faucetBalance} : {faucetAddress: string, faucetBalance: number}) {
    return (
        <>
            <Card.Text>
                <p><b>Address:</b> {faucetAddress}</p>
                <p><b>Balance:</b> {displayBalance(faucetBalance)} ꜩ</p>
            </Card.Text>
        </>
    )
}

export default FaucetInfo;