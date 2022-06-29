import { Container, Row, Col } from "react-bootstrap";
import '../../App.css';
import Config from "../../Config";

function About() {
    return (
        <>

            <Container className="content about">

                <Row>
                    <Col>

                        <h2>About this faucet</h2>

                        <h4>One click faucet</h4>
                        <div>
                            <p><b>One click = one ꜩ</b></p>
                            <p>
                                Contrary to <a href="https://teztnets.xyz">teztnets.xyz</a>, you don't need to connect to a Tezos node and activate your account on testnets. You can grab some ꜩ in only one click.
                                <br />
                                But this faucet is able to manage some testnet accounts thanks to <a href="https://teztnets.xyz">teztnets.xyz</a>!
                            </p>
                            <p>
                                This faucet is free to use, but there is no guarantee that it will work.
                            </p>
                        </div>

                        <h4>Bug, problem or comments ?</h4>
                        <div>
                            <p>
                                Feel free to create an issue on the <a href="https://github.com/avysel/tezos-testnet-faucet/issues" target="_blank">Github project repository</a>.
                            </p>
                        </div>

                        <h4>Want to help ?</h4>
                        <div>
                            <p>
                                The faucet definitely needs a better look and feel. If you can help me with that, please contact me.
                            </p>
                            <p>You can also help us by some other way: </p>
                            <p>- Help us keeping this faucet running by sending ꜩ to faucet testnets addresses to supply it with new ꜩ.</p>
                            <p>- Send ꜩ to <b>{Config.application.adminAddress}</b> on mainnet to help us supporting faucet costs.</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>

    );
}

export default About;