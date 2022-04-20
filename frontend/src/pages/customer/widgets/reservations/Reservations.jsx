import { useEffect } from "react";
import { Nav, Container } from "react-bootstrap";
import { Route, Routes, useSearchParams } from "react-router-dom";
import ReservationList from "./components/ReservationList";
import ReservationView from "./components/ReservationView";
import "./Reservations.css";

const mockReservations = [
  {
    id: "231422",
    status: "active",
    city: "San Francisco",
    hotelProperty: "Hyatt Regency at Ferry Terminal",
    nights: "3",
    rooms: "2",
    checkin: "03/12/2019",
    checkout: "03/21/2019",
    totalPrice: "$2031.43"
  },
  {
    id: "2314223423",
    status: "active",
    city: "Los Angeles",
    hotelProperty: "San Gabriel Sheraton",
    nights: "3",
    rooms: "2",
    checkin: "04/12/2019",
    checkout: "05/21/2019",
    totalPrice: "$2031.43"
  },
  {
    id: "2314226433",
    status: "past",
    city: "Los Angeles",
    hotelProperty: "San Gabriel Sheraton",
    nights: "3",
    rooms: "2",
    checkin: "04/12/2019",
    checkout: "05/21/2019",
    totalPrice: "$2031.43"
  },
  {
    id: "3525231",
    status: "cancelled",
    city: "Los Angeles",
    hotelProperty: "San Gabriel Sheraton",
    nights: "3",
    rooms: "2",
    checkin: "04/12/2019",
    checkout: "05/21/2019",
    totalPrice: "$2031.43"
  }
];

const ReserverationHome = () => {
  const [reservationPage, setReservationPage] = useSearchParams();
  const reservType = reservationPage.get("type");

  useEffect(() => {
    const qParamReservType = reservationPage.get("type");
    if (!qParamReservType || !["active", "past", "cancelled"].includes(qParamReservType)) {
      setReservationPage({ type: "active" });
    }
  }, [setReservationPage, reservationPage]);

  return (
    <Container className="reservation-container" style={{ maxWidth: 700 }}>
      <h3>Reservations</h3>
      <Nav fill variant="pills" activeKey={reservType} style={{ marginTop: 30 }}>
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
      <ReservationList reservationType={reservType} reservations={mockReservations} />
    </Container>
  );
};

export default function Reservations() {
  return (
    <Routes>
      <Route index element={<ReserverationHome />}></Route>
      <Route path="/:stayId" element={<ReservationView />}></Route>
    </Routes>
  );
}
