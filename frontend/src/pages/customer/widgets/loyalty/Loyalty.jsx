import { Container } from "react-bootstrap";
import LoyaltyStatus from "./components/LoyaltyStatus";

export default function Loyalty(props) {
  return (
    <Container style={{ marginTop: 20, maxWidth: 700 }}>
      <h3>Owl Loyalty Program</h3>
      <LoyaltyStatus />
    </Container>
  );
}
