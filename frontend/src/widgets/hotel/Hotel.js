import { Container } from "react-bootstrap";
import { NavbarWrapper } from "../../components/navbar/NavbarWrapper";

export function Hotel(props) {
  return (
    <div>
      <NavbarWrapper userType="hotel" />
      <Container fluid="sm">Hotel</Container>
    </div>
  );
}
