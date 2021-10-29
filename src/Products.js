import { useEffect, useState, useRef, useContext } from "react"

import db from "./db"
import Product from "./Product"

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Alert from "react-bootstrap/Alert"
import { UserContext } from "./App"

export default function Products() {

    const authUser = useContext(UserContext)
    const [products, setProducts] = useState([])
    const successAlert = useRef(null)

    useEffect(() => {
        db.Products.getAll().then(products => { setProducts(products) })
    }, [])

    return (
        <Container fluid className="mb-5">
            <Alert style={{ ...alert }} ref={successAlert} variant="success">
                Item added to Cart successfully! &nbsp;&nbsp;&nbsp;
                <Alert.Link href="/cart">Check it out</Alert.Link>
            </Alert>
            <Row className="d-flex justify-content-center">
                {
                    products.map((product, i) =>
                        <Col key={i} className="d-flex justify-content-center p-3" xs={12} lg="auto">
                            <Product authUser={authUser} successAlert={successAlert} product={product} />
                        </Col>

                    )
                }
            </Row>
        </Container>
    )
}

const alert = {
    visibility: "hidden"
}