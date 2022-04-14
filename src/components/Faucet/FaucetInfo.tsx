import { Badge, Card } from "react-bootstrap";
import { DropletFill } from "react-bootstrap-icons";
import { toBalance } from "../../lib/Utils";

function FaucetInfo({faucetAddress, faucetBalance} : {faucetAddress: string, faucetBalance: number}) {
    return (
        <>
            <Card.Text  className="faucet-info">

                <Badge bg="light" text="dark" className="balance-badge">
                        <DropletFill /> &nbsp; {faucetAddress} &nbsp;                        
                        <Badge bg="secondary" as="span" className="balance-badge">{toBalance(faucetBalance)} ꜩ</Badge>                    
                </Badge>

            </Card.Text>
        </>
    )
}

export default FaucetInfo;

/*

                <p><b>Address:</b> {faucetAddress}</p>
                <p><b>Balance:</b> {toBalance(faucetBalance)} ꜩ</p>

                */