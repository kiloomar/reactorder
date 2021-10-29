import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useContext, useRef } from 'react'
import firebase from 'firebase/compat/app'
import { useHistory } from 'react-router-dom'
import { UserContext } from './App'

export default function Login() {

    const email = useRef(null)
    const password = useRef(null)
    const foundError = useRef(null)

    const history = useHistory()
    const authUser = useContext(UserContext)

    if (authUser && authUser !== "loggedout") history.push('/products')

    async function signIn(event) {
        event.preventDefault()
        event.stopPropagation()

        try {
            let user = await firebase.auth().signInWithEmailAndPassword(email.current.value, password.current.value)
            if (user) history.push('/products')
        } catch (error) {
            if (error.code === "auth/user-not-found") {
                foundError.current.innerText = "Email or password incorrect"
                foundError.current.hidden = false
            }

        }
    }

    async function signUp(event) {
        event.preventDefault()
        event.stopPropagation()

        try {
            let user = await firebase.auth().createUserWithEmailAndPassword(email.current.value, password.current.value)
            if (user) history.push('/products')
        } catch (error) {
            console.log("error", error.code)
            if (error.code === "auth/email-already-in-use") {
                foundError.current.innerText = "Email already in use"
                foundError.current.hidden = false
            }
        }

    }

    return (
        <Container fluid>
            <Row className="d-flex flex-column align-content-center">
                <Col xs={12} sm={6} className="mt-5">
                    <Form onSubmit={signIn}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                ref={email}
                                type="email"
                                placeholder="Enter email"
                                required
                            />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                ref={password}
                                minLength={4}
                                type="password"
                                placeholder="Password"
                                required
                            />
                        </Form.Group>

                        <Form.Text hidden={true} ref={foundError}
                            className="text-danger mt-3 mb-3"
                        >
                            Email or password incorrect
                        </Form.Text>
                        <br /><br />

                        <div className="d-flex">
                            <Button type="submit" variant="primary">Submit</Button>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Button style={{ marginLeft: 'auto' }} onClick={signUp} variant="outline-secondary">Register</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}