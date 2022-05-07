import { useEffect, useState } from "react";
import { Nav, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Route, Routes, useSearchParams } from "react-router-dom";
import { getHotelDataRdx, getUserIdRdx, getUserTypeRdx } from "../../redux/context/contextSelectors";
import BookingServiceUtil from "../../util/bookingServiceUtil";
import ReservationList from "./components/ReservationList";
import ReservationView from "./components/ReservationView";
import "./Reservations.css";

const STATUS_MAPPER = {
  active: "CONFIRMED",
  cancelled: "CANCELED"
};

export const ReserverationHome = () => {
  const [reservationPage, setReservationPage] = useSearchParams();
  const userType = useSelector(getUserTypeRdx);
  const userId = useSelector(getUserIdRdx);
  const hotelData = useSelector(getHotelDataRdx);
  const reservType = reservationPage.get("type");
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const qParamReservType = reservationPage.get("type");
    if (!qParamReservType || !["active", "cancelled"].includes(qParamReservType)) {
      setReservationPage({ type: "active" });
    }
  }, [setReservationPage, reservationPage]);

  useEffect(() => {
    (async () => {
      const reser = await BookingServiceUtil.allReservations();
      if (!reser.error) {
        if (userType === "hotel") {
          setReservations(reser.filter((r) => r.hotelId === hotelData.hotelId));
        } else {
          setReservations(reser.filter((r) => r.userId === userId));
        }
      }
    })();
  }, [hotelData, userId, userType]);

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
          <Nav.Link eventKey="cancelled" onClick={() => setReservationPage({ type: "cancelled" })}>
            Cancelled
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <ReservationList reservationType={STATUS_MAPPER[reservType]} reservations={reservations} />
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
