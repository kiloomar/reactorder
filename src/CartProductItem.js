import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { XLg } from "react-bootstrap-icons"
import Button from "react-bootstrap/Button"

import db from './db'

export default function CartProductItem({ product, item }) {

    const removeCartItem = async () =>
        await db.CartItems.removeOne(item.id)

    return (
        <Card body>
            <Container>
                <Row>
                    <Col>
                        {product.name}
                        &nbsp; &nbsp; &nbsp;
                        <p className="text-muted d-inline">{product.price}$</p>
                    </Col>
                    <Col>
                        <Container
                            className="d-flex align-items-center justify-content-end p-0 mr-0">
                            {
                                item.count ?
                                    <strong className="text-muted d-inline">
                                        X {item.count} &nbsp; &nbsp; &nbsp;
                                    </strong>
                                    : null
                            }
                            <Button onClick={removeCartItem} variant="outline-danger" >
                                <XLg />
                            </Button>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </Card>
    )
}