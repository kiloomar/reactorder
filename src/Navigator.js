import React, { useContext, useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import NavLink from 'react-bootstrap/NavLink'
import Nav from 'react-bootstrap/Nav'
import AdvNavLink from './AdvNavLink'

import { UserContext } from './App'
import Logo from './Logo'

export default function Navigator() {

	const authUser = useContext(UserContext)
	const [hoverStyle1, setHoverStyle1] = useState(linksHover)
	const [hoverStyle2, setHoverStyle2] = useState(linksHover)
	const [hoverStyle3, setHoverStyle3] = useState(linksHover)

	const setStyle = (hoverState, i) => {
		switch (i) {
			case 1:
				setHoverStyle1(!hoverState ? linksHover : links)
				break;
			case 2:
				setHoverStyle2(!hoverState ? linksHover : links)
				break;
			case 3:
				setHoverStyle3(!hoverState ? linksHover : links)
				break;
			default: break;
		}
	}

	return (
		<Navbar style={{ ...navigation }} collapseOnSelect bg="white" expand="lg">
			<Navbar.Toggle style={{ width: "100%" }} />
			<Navbar.Collapse>
				<Nav defaultActiveKey="/" className="flex-column">
					<NavLink href="/"><Logo /></NavLink>
					<AdvNavLink onHover={s => setStyle(s, 1)} boldOnPage style={hoverStyle1} href="/products">Products</AdvNavLink>
					<AdvNavLink onHover={s => setStyle(s, 2)} boldOnPage style={hoverStyle2} href="/orders">Orders</AdvNavLink>
					<AdvNavLink onHover={s => setStyle(s, 3)} boldOnPage style={hoverStyle3} href="/cart">Cart</AdvNavLink>
					{
						authUser ?
							authUser === "loggedout" ?
								<>
									<br />
									<NavLink href="/login">Login</NavLink>
								</>
								:
								<>
									<br />
									<NavLink href="/logout">Logout</NavLink>
								</>
							: null
					}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}

const navigation = {
	zIndex: 1,
	width: "100%",
	padding: "5px"
}

const links = {
	textDecoration: "underline 0.15em rgba(0, 0, 0, 0)",
	transition: "text-decoration-color 500ms",
}

const linksHover = {
	textDecorationColor: "rgba(0, 0, 0, 1)"
}