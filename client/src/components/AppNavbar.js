import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Container } from "reactstrap"
import { Fragment, useState } from 'react'
import RegisterModal from "./auth/RegisterModal"
import Logout from './auth/Logout'
import LoginModal from "./auth/LoginModal"
import { connect } from "react-redux"

const AppNavbar = ( { auth }) => {

    const [isOpen, setIsOpen] = useState(false)
    
    const toggle = () => setIsOpen(!isOpen)

    const authLinks = (
        <Fragment>
            <NavItem>
                <span className="navbar-text mr-3"><strong>{auth && auth.user ? `Welcome ${auth.user.name}` : ''}</strong></span>
            </NavItem>
            <NavItem>
                <Logout />
            </NavItem>
        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <NavItem>
                <RegisterModal />
            </NavItem>
            <NavItem>
                <LoginModal />
            </NavItem>
        </Fragment>
    )

    return (
        <div>
            <Navbar color="dark" dark expand="md" className="mb-5">
                <Container>
                    <NavbarBrand href="/">TDP</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="justify-content-end" style={{width: "100%"}} navbar>
                            {auth && auth.isAuthenticated ? authLinks : guestLinks}
                                
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(AppNavbar)
