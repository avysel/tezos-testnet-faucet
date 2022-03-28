import { Container, Row, Col } from "react-bootstrap";
import Footer from "../Footer";
import Header from "../Header";
import '../../App.css';

function Unknown() {
    return (
        <>
            <Header />

            <Container  className="content">
                <Row>
                    <Col>
                        <div>
                            There's nothing here
                        </div>
                    </Col>
                </Row>
            </Container>


            <Footer />
        </>
    )
}

export default Unknown;