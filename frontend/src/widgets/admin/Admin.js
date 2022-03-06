import { Container } from "react-bootstrap";
import { NavbarWrapper } from "../../components/navbar/NavbarWrapper";

export function Admin(props) {
  return (
    <div>
      <NavbarWrapper userType="admin" />
      <Container fluid="sm">Admin</Container>
    </div>
  );
}
