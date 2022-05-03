import Card from 'react-bootstrap/Card';
import Config from "../Config";

function Supply() {
    return (
        <Card>
        <Card.Header>You like this faucet?</Card.Header>
        <Card.Body>
            <Card.Title>You can help us keeping this faucet alive:</Card.Title>
            <Card.Text></Card.Text>
            <Card.Text>
                Send ꜩ to faucet testnets addresses to supply it with new ꜩ.
            </Card.Text>
            <Card.Text>
                Send ꜩ to <b>{Config.application.adminAddress}</b> on mainnet to help us supporting faucet costs.
            </Card.Text>
        </Card.Body>
        </Card>
    )
}

export default Supply;