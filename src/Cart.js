import { useContext, useEffect, useState } from "react"
import { UserContext } from "./App"
import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

import db from './db'
import CartProductItem from "./CartProductItem"
import { useHistory } from "react-router"

export default function Cart({ cartId }) {

    const authUser = useContext(UserContext)
    const history = useHistory()

    const [cart, setCart] = useState(null)
    const [items, setItems] = useState([])
    const [products, setProducts] = useState([])
    const [disablePay, setDisablePay] = useState(false)

    useEffect(() => {
        if (authUser && authUser !== "loggedout")
            if (cartId) db.Carts.getOne(cartId).then(cartData => setCart(cartData))
            else db.Carts.getLastUserCart(authUser.uid).then(cartData => setCart(cartData))
    }, [authUser, cartId])

    useEffect(() => {
        if (cart) return db.CartItems.listenCartItemsByCart(cart.id, setItems)
    }, [cart])

    useEffect(() => {

        Promise.all(items.map(async item => await db.Products.getOne(item.productid))).then(fetchedData => {
            setProducts(fetchedData)
        })
    }, [items])

    const clearItems = async () => {
        setDisablePay(true)
        await Promise.all(items.map(async item => await db.CartItems.removeOne(item.id)))
        setProducts([])
        setDisablePay(false)
    }

    const getTotal = () => {
        if (products.length > 0 && items.length > 0) {
            let total = (items && products?.reduce((acc, c, i) => c.price * { ...items[i] }.count + acc, 0))
            return isNaN(total) ? "..." : total + "$"
        } else {
            return 0
        }
    }

    const checkout = () => {
        db.Carts.payCart(cart.id).then(() => {
            // eslint-disable-next-line
            db.Carts.addOne({ opened: new Date, userid: authUser.uid }).then(() => {
                history.go(0) //refresh
            })
        })
    }

    return (
        <Container className='d-flex justify-content-center pt-5 p-lg-5'>
            <Row style={{ minWidth: '100%' }}>
                <Col>
                    {/* > xs */}
                    <Card className='p-3 d-none d-lg-flex'>

                        <Card.Title className='text-center'>Your Shopping Cart</Card.Title>
                        {
                            cart && products?.map((product, i) =>
                                <CartProductItem
                                    item={{ ...items[i] }}
                                    product={product}
                                    key={i} />
                            )
                        }

                        <Container className="p-2 d-flex justify-content-center">
                            <Card.Text>
                                Total - {getTotal()}
                            </Card.Text>
                        </Container>

                        <Card.Footer className="d-flex">
                            <Button onClick={checkout} disabled={disablePay || products.length === 0}>Checkout</Button>
                            <Button onClick={clearItems} style={{ marginLeft: 'auto' }} variant='danger'>Clear</Button>
                        </Card.Footer>

                    </Card>
                    {/* < xs */}
                    <Card className='p-0 d-lg-none'>

                        <Card.Title className='text-center'>Your Shopping Cart</Card.Title>
                        {
                            cart && products?.map((product, i) =>
                                <CartProductItem
                                    item={{ ...items[i] }}
                                    product={product}
                                    key={i} />
                            )
                        }

                        <Container className="p-2 d-flex justify-content-center">
                            <Card.Text>
                                Total - {getTotal()}
                            </Card.Text>
                        </Container>

                        <Card.Footer className="d-flex">
                            <Button onClick={checkout} disabled={disablePay || products.length === 0}>Checkout</Button>
                            <Button onClick={clearItems} style={{ marginLeft: 'auto' }} variant='danger'>Clear</Button>
                        </Card.Footer>

                    </Card>
                </Col>
            </Row>
        </Container>
    )
}