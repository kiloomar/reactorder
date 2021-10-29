import React from 'react'
import NavLink from 'react-bootstrap/NavLink'

export default function AdvNavLink({ onHover, children, href, boldOnPage, style, ...rest }) {

    const pathname = window.location.pathname
    let bold = pathname.toLowerCase() === href && boldOnPage ? true : false

    return (
        <NavLink
            onMouseEnter={onHover ? () => onHover(true) : null}
            onMouseLeave={onHover ? () => onHover(false) : null}
            href={ href }
            style={{ ...style, fontWeight: bold ? "bold" : "normal" }}
            {...rest}
        >
            {children}
        </NavLink>
    )
}
