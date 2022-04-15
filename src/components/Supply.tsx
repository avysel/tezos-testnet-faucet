import Card from 'react-bootstrap/Card';
import config from '../config/config.json';

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
                Send ꜩ to <b>{config.application.adminAddress}</b> on mainnet to help us supporting faucet costs.
            </Card.Text>
        </Card.Body>
        </Card>
    )
}

export default Supply;