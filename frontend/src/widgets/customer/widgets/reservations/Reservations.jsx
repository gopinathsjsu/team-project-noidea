import { useEffect } from "react";
import { Nav, Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import "./Reservations.css";

export default function Reservations(props) {
  const [reservationPage, setReservationPage] = useSearchParams();
  const reservType = reservationPage.get("type");

  useEffect(() => {
    if (!reservationPage.get("type")) {
      setReservationPage({ type: "active" });
    }
  }, [setReservationPage, reservationPage]);

  return (
    <Container className="reservation-container">
      <Nav fill variant="tabs" activeKey={reservType}>
        <Nav.Item>
          <Nav.Link eventKey="active" onClick={() => setReservationPage({ type: "active" })}>
            Active
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="past" onClick={() => setReservationPage({ type: "past" })}>
            Past
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="cancelled" onClick={() => setReservationPage({ type: "cancelled" })}>
            Cancelled
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {reservType === "active" && <div>active</div>}
      {reservType === "past" && <div>past</div>}
      {reservType === "cancelled" && <div>cancelled</div>}
    </Container>
  );
}
