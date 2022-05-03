import { Nav, Navbar, Container } from 'react-bootstrap';
import { Github, Twitter } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import Config from "../Config";

function Header() {
    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Nav>
                    <Navbar.Brand>
                        <Link className="nav-link" to="/">
                            {Config.application.name}
                        </Link>
                    </Navbar.Brand>
                </Nav>
                <Nav>

                    <Link className="nav-link" to="/about">
                        About
                    </Link>

                    <Nav.Link href="https://github.com/avysel/tezos-testnet-faucet" target="_blank">
                        <Github />
                    </Nav.Link>

                    <Nav.Link href="#" target="_blank">
                        <Twitter />
                    </Nav.Link>

                </Nav>

            </Container>
        </Navbar>
    )
}

export default Header;
