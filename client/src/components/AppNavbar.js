import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container } from "reactstrap"
import { useState } from 'react'

const AppNavbar = ( props ) => {

    const [isOpen, setIsOpen] = useState(false)
    
    const toggle = () => setIsOpen(!isOpen)


    return (
        <div>
            <Navbar color="dark" dark expand="md" className="mb-5">
                <Container>
                    <NavbarBrand href="/">TDP</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="justify-content-end" style={{width: "100%"}} navbar>
                            <NavItem>
                                <NavLink href="https://github.com/vsredshift">
                                    Github
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    )
}



export default AppNavbar
