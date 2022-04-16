import { Container } from "react-bootstrap";
import BookingInput from "./components/BookingInput";

export default function Book(props) {
  return (
    <Container style={{ marginTop: 20, maxWidth: 700 }}>
      <h3>Book a stay</h3>
      <div style={{ marginTop: 30 }}>
        <BookingInput />
      </div>
    </Container>
  );
}
