import { Container, Row, Col } from "react-bootstrap";
import Footer from "../Footer";
import Header from "../Header";
import '../../App.css';
import { Link } from "react-router-dom";
import config from '../../config/config.json';

function About() {
    return (
        <>
            <Header />

            <Container className="content">

                <Row>
                    <Col>
                        <Link to="/">
                            &lt; Back to faucet
                        </Link>
                        <h1>About this faucet</h1>

                        <h3>One click faucet</h3>
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

                        <h3>Bug, problem or comments ?</h3>
                        <div>
                            <p>
                                Feel free to create an issue on the <a href="https://github.com/avysel/tezos-testnet-faucet/issues" target="_blank">Github projet repository</a>.
                            </p>
                        </div>

                        <h3>Want to help ?</h3>
                        <div>
                            <p>
                                The faucet definitely needs a better look and feel. If you can help me with that, please contact me.
                            </p>
                            <p>You can also help us by some other way: </p>
                            <p>- Help us keeping thus faucet running by sending ꜩ to faucet testnets addresses to supply it with new ꜩ.</p>
                            <p>- Send ꜩ to <b>{config.application.adminAddress}</b> on mainnet to help us supporting faucet costs.</p>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Footer />
        </>

    );
}

export default About;