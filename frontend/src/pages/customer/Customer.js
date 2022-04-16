import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Reservations from "./widgets/reservations/Reservations";

export function Customer(props) {
  return (
    <div>
      <Container fluid="sm">
        <Routes>
          <Route path="/stays/*" element={<Reservations />}></Route>
          <Route path="/loyalty/*" element={<div>Loyalty</div>}></Route>
        </Routes>
      </Container>
    </div>
  );
}
