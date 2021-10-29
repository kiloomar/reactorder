import Home from './Home'
import Products from './Products'
import Cart from './Cart'
import Login from './Login'
import Logout from './Logout'
import Loader from './Loader'
import Orders from './Orders'
import ProductDetails from './ProductDetails'

import { createContext, useState } from 'react'
import firebase from 'firebase/compat/app'
import Navigator from './Navigator'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"


export let UserContext = createContext(null)

export default function App() {

  const [authUser, setAuthUser] = useState(null)

  firebase.auth().onAuthStateChanged(newUser => {
    if (newUser) {
      setAuthUser(newUser)
    } else {
      setAuthUser("loggedout")
    }
  })

  return (
    <UserContext.Provider value={authUser}>
      <Container fluid>
        <Row className="d-flex justify-content-center" style={{ ...navSection }}>
          <Col xs={12} md={12} lg={2} xl={1} style={{ ...navSection }} >
            <Navigator />
          </Col>
          <Col xs={12} md={12} lg={10} xl={11}>

            <Router>
              <Switch>
                <Route path="/products/:productId">
                  <Loader public={true}><ProductDetails /></Loader>
                </Route>
                <Route path="/products">
                  <Loader public={true}><Products /></Loader>
                </Route>
                <Route path="/orders">
                  <Loader public={false}><Orders /></Loader>
                </Route>
                <Route path="/cart">
                  <Loader public={false}><Cart /></Loader>
                </Route>
                <Route path="/logout">
                  <Logout />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/">
                  <Loader public={true}><Home /></Loader>
                </Route>
                <Route>
                  <Login />
                </Route>
              </Switch>
            </Router>

          </Col>
        </Row>
      </Container>
    </UserContext.Provider>
  )
}

const navSection = {
  padding: 0
}