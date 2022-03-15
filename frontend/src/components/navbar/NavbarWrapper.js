import { Container, Nav, NavDropdown, Navbar, Image } from "react-bootstrap";
import { Auth } from "aws-amplify";

import "./NavbarWrapper.css";

const userTypeText = {
  admin: "Admin",
  customer: "Customer",
  hotel: "Hotel"
};

export function NavbarWrapper(props) {
  return (
    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <Image src="owl_head.png" height={23} className="logo-img" />
          Hootel<span className="user-type-text">{userTypeText[props.userType]}</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">Accounts</Nav.Link>
            <Nav.Link
              onClick={async () => {
                try {
                  await Auth.signOut();
                } catch (error) {
                  console.log("error signing out: ", error);
                }
              }}>
              Sign out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
