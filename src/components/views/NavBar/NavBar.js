import { NavLink } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';

const NavBar = () => {
    return (
        <Navbar bg="primary" variant="dark" expand="lg" className="mt-4 mb-4 rounded">
            <Container>
                 <Nav>
                    <Nav.Link as={NavLink} to="/">Waiter.app</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;