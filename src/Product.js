import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Loading from './Loading'
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import { useEffect, useState } from 'react'

import db from './db'
import { useHistory } from 'react-router'

export default function Product({ product, successAlert, authUser }) {

    const storage = getStorage()
    const history = useHistory()
    const [image, setImage] = useState(null)

    useEffect(() => {
        (async () => {
            let url = await getDownloadURL(ref(storage, `${product.name.toLowerCase()}-s.png`))
            setImage(url)
        })()
    }, [storage, product.name])

    const addToCart = productId => {
        (async () => {
            let cart = await db.Carts.getLastUserCart(authUser.uid)
            if (cart) {
                await db.CartItems.addCartItem(cart.id, productId)
            } else {
                let addedCart = await db.Carts.addOne({
                    userid: authUser.uid,
                    opened: new Date()
                })
                addedCart = await db.Carts.getOne(addedCart.id)
                await db.CartItems.addCartItem(addedCart.id, productId)
            }
        })()
        successAlert.current.style.visibility = "inherit"
    }

    const viewDetails = productId => {
        history.push(`/products/${productId}`)
    }

    return (
        product ?
            <Card style={{ ...card }}>
                <Card.Img height="191px" style={{ ...cardImg }} variant="top" src={image || <Loading />} />
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Subtitle>{product.price}$</Card.Subtitle>
                    <div className="pt-3">
                    {
                        product?.colors ?
                            product.colors.map((color, i) =>
                                <Card.Text className="d-inline" key={i}>
                                    {color} &nbsp;
                                </Card.Text>
                            ) : null
                    }
                    </div>
                    <br />
                    <Button onClick={() => { addToCart(product.id) }} variant="primary">Add to cart</Button> &nbsp;
                    <Button onClick={() => { viewDetails(product.id) }} variant="outline-secondary">Details</Button>
                </Card.Body>
            </Card>
            : null
    )
}

const cardImg = {
    objectFit: 'cover'
}

const card = {
    width: '18rem'
}