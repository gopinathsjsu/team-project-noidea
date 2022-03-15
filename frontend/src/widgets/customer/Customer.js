import { Container } from "react-bootstrap";
import { NavbarWrapper } from "../../components/navbar/NavbarWrapper";

export function Customer(props) {
  return (
    <div>
      <NavbarWrapper userType="customer" />
      <Container fluid="sm">Customer</Container>
    </div>
  );
}
