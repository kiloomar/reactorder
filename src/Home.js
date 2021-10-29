import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import splashModel from './splash-model.png'
import logo from './logo.svg'

export default function Home() {

    return (
        <Container fluid style={{ ...page }}>
            {/* x >= lg */}
            <Row className="d-none d-lg-flex">
                <Col className="d-flex p-0">
                    <Col lg={4} xl={6} className="text-center align-self-center p-5">
                        <img src={logo} alt="" />
                    </Col>

                    <Col xs className="text-end">
                        <div style={{ ...splashImg }}>
                            <img onSelect={() => false} src={splashModel} height="100%" alt="" />
                        </div>
                    </Col>
                </Col>
            </Row>
            {/* x < lg */}
            <Row className="d-lg-none justify-content-center">
                <Col style={{ ...smLogo }}>
                    <img src={logo} width="100%" alt="" />
                </Col>
                <Col style={{ ...smSplash }} className="text-end">
                    <div style={{ ...smSplashImg }}>
                        <img src={splashModel} height="100%" alt="" />
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

const smSplash = {
    overflow: "hidden",
    position: "absolute",
    zIndex: -1,
    top: 0,
    right: 0,
}

const splashImg = {
    height: "100vh",
    minHeight: "700px"
}

const smSplashImg = {
    height: "100vh",
    minHeight: "500px"
}

const page = {
    padding: 0
}

const smLogo = {
    position: "absolute",
    top: "25%",
    bottom: "50%",
    padding: "20px"
}