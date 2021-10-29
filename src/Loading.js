import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Spinner from 'react-bootstrap/Spinner'

export default function Loading() {
    return (
        <Container fluid className="d-flex justify-content-center mt-5">
            <Row>
                <Col>
                    <Spinner
                        animation="border"
                        role="status"
                        style={{ width: "5rem", height: "5rem", borderWidth: "0.5rem" }}
                    >
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Col>
            </Row>
        </Container>
    )
}