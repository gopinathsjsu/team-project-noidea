import { useEffect } from "react";
import { Nav, Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import ReservationList from "./components/ReservationList";
import "./Reservations.css";

export default function Reservations() {
  const [reservationPage, setReservationPage] = useSearchParams();
  const reservType = reservationPage.get("type");

  useEffect(() => {
    const qParamReservType = reservationPage.get("type");
    if (!qParamReservType || !["active", "past", "cancelled"].includes(qParamReservType)) {
      setReservationPage({ type: "active" });
    }
  }, [setReservationPage, reservationPage]);

  return (
    <Container className="reservation-container">
      <h3>Reservations</h3>
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
      <ReservationList reservationType={reservType} />
    </Container>
  );
}
