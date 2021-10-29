import { useEffect, useState, useContext } from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { UserContext } from './App'
import db from './db'

export default function Orders() {

    const authUser = useContext(UserContext)
    const [carts, setCarts] = useState([])
    const [cartsWithItems, setCartsWithItems] = useState([])

    useEffect(() => db.Carts.getPaidCartsByUser(authUser.uid).then(data => setCarts(data.reverse())), [authUser])
    useEffect(() => carts.length > 0 && attachCartItemsAndProducts(carts), [carts])

    const attachCartItemsAndProducts = async cartArr => {
        let itemsPerCart = await Promise.all(cartArr.map(cart => db.CartItems.getCartItemsByCart(cart.id)))
        let productsPerCart = await Promise.all(itemsPerCart.map(items => Promise.all(items.map(async item => db.Products.getOne(item.productid)))))
        let itemsAndProducts = itemsPerCart.map((items, i) =>
            items.map(item => {
                item.price = productsPerCart[i].find(p => p.id === item.productid).price
                return item
            })
        )
        let mergedData = cartArr.map((cart, i) => ({ ...cart, items: itemsAndProducts[i] }))
        setCartsWithItems(mergedData)
    }

    const getTotal = items => (items.reduce((acc, c, i) => c.price * c.count + acc, 0))

    return (
        <Container style={{ ...stopPadding }} className="justify-content-center px-lg-5 pt-5 mb-5" fluid>
            <Row style={{ ...stopPadding }}>
                <Col className="mx-md-5 mx-lg-5 mx-xl-5" style={{ ...stopPadding }}>
                    <Container fluid style={{ ...stopPadding, ...tableContainer }}>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>Opened</th>
                                    <th>Paid</th>
                                    <th># of items</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cartsWithItems.length > 0 ?
                                        cartsWithItems.map((c, i) =>
                                            <tr key={i}>
                                                <td>{c.opened.toDate().toLocaleDateString()}</td>
                                                <td>{c.closed.toDate().toLocaleDateString()}</td>
                                                <td>{c.items.reduce((acc, c) => c.count + acc, 0)}</td>
                                                <td>{getTotal(c.items)}</td>
                                            </tr>
                                        ) : null
                                }
                            </tbody>
                        </Table>
                    </Container>
                </Col>
            </Row>
        </Container >
    )
}

const stopPadding = {
    padding: 0
}

const tableContainer = {
    borderRadius: "10px",
    borderStyle: "solid",
    borderWidth: "1px"
}