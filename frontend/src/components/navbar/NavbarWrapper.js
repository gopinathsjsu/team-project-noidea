import { Container, Nav, NavDropdown, Navbar, Image } from "react-bootstrap";
import { Auth } from "aws-amplify";

import "./NavbarWrapper.css";
import { useNavigate } from "react-router-dom";

const userTypeText = {
  admin: "Admin",
  customer: "Customer",
  hotel: "Hotel"
};

const CustomerMenu = (props) => {
  return (
    <>
      <Nav className="me-auto">
        <Nav.Link onClick={() => props.navigate("/customer/stays")}>Stays</Nav.Link>
        <Nav.Link onClick={() => props.navigate("/customer/loyalty")}>Loyalty</Nav.Link>
      </Nav>
      <Nav>
        <NavDropdown title="Account" id="collasible-nav-dropdown">
          <NavDropdown.Item>Personal Info</NavDropdown.Item>
          <NavDropdown.Item>Payment</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item
            onClick={async () => {
              try {
                await Auth.signOut();
              } catch (error) {
                console.log("error signing out: ", error);
              }
            }}>
            Sign out
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </>
  );
};
const HotelMenu = () => {
  return (
    <>
      <Nav className="me-auto">
        <Nav.Link>Reservations</Nav.Link>
        <Nav.Link>Customers</Nav.Link>
        <NavDropdown title="Hotel" id="collasible-nav-dropdown">
          <NavDropdown.Item>Rooms</NavDropdown.Item>
          <NavDropdown.Item>Amenitites</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Nav>
        <NavDropdown title="Account" id="collasible-nav-dropdown">
          <NavDropdown.Item>Personal Info</NavDropdown.Item>
          <NavDropdown.Item>Payment</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item
            onClick={async () => {
              try {
                await Auth.signOut();
              } catch (error) {
                console.log("error signing out: ", error);
              }
            }}>
            Sign out
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </>
  );
};

const AdminMenu = () => {
  return (
    <>
      <Nav className="me-auto">
        <Nav.Link>Features</Nav.Link>
        <Nav.Link>Pricing</Nav.Link>
        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
          <NavDropdown.Item>Action</NavDropdown.Item>
          <NavDropdown.Item>Another action</NavDropdown.Item>
          <NavDropdown.Item>Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item>Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Nav>
        <Nav.Link>Accounts</Nav.Link>
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
    </>
  );
};

export function NavbarWrapper(props) {
  const navigate = useNavigate();

  return (
    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand onClick={() => navigate("/customer")}>
          <Image src="owl_head.png" height={23} className="logo-img" />
          Hootel<span className="user-type-text">{userTypeText[props.userType]}</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {props.userType === "admin" && <AdminMenu navigate={navigate} />}
          {props.userType === "customer" && <CustomerMenu navigate={navigate} />}
          {props.userType === "hotel" && <HotelMenu navigate={navigate} />}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
