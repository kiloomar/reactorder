import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"

import db from './db'
import Loading from './Loading'

export default function ProductDetails() {

    let { productId } = useParams()
    const [product, setProduct] = useState(null)
    const [image, setImage] = useState(null)
    const storage = getStorage()

    useEffect(() => productId && db.Products.getOne(productId).then(data => setProduct(data)), [productId])

    useEffect(() =>
        product && getDownloadURL(ref(storage, `${product.name.toLowerCase()}-b.png`)).then(data => setImage(data))
        , [storage, product])

    const borderRadius = {
        borderStartEndRadius: '20px',
        borderStartStartRadius: '20px'
    }

    return (
        <Container className="d-flex p-2 justify-content-center" fluid>
            {
                product && image ?
                    <Card style={{ width: '50rem', ...borderRadius }}>
                        <Card.Img
                            alt="Product image" height="550px"
                            style={{ objectFit: 'cover', ...borderRadius }} variant="top"
                            src={image || <Loading />}
                        />
                        <Card.Text as="h2" className="p-4">{product.name}</Card.Text>
                        <Card.Text as="h5" className="px-4">{product.price}$</Card.Text>
                        <Card.Text as="h5" className="p-4 text-muted">{product.description}</Card.Text>
                        <Card.Text className="p-4 text-muted">{product.colors.map(color => color + '  ')}</Card.Text>
                    </Card>
                    : null
            }
        </Container>
    )

}