import { Button, Collapse } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export default function ReservationView(props) {
  const navLocation = useLocation();
  const reservs = navLocation.state;

  return (
    <div style={{ maxWidth: 700, marginTop: 20, marginBottom: 150 }}>
      <h3>Trip to at {reservs.city}</h3>
      <p>
        {reservs.rooms} room(s) at {reservs.hotelProperty} for {reservs.nights} night(s)
      </p>
      <p>
        <b>Customer</b>
        <br />
        {reservs.customer}
      </p>
      <div style={{ display: "flex" }}>
        <p style={{ flex: 1 }}>
          <b>Check in</b>
          <br />
          {reservs.checkin} 3PM
        </p>
        <p style={{ flex: 1 }}>
          <b>Check out</b>
          <br />
          {reservs.checkout} 11AM
        </p>
      </div>
      <h5>Booking information</h5>
      <div className="skinny-item-container-no-highlight">
        <h6>Room 1 - Double Queen</h6>
        <p>
          <b className="secondary-color">Added amenities</b>
          <br />
          Continental breakfast, Gymnasium, Daily parking
        </p>
      </div>
      <div className="skinny-item-container-no-highlight">
        <h6>Room 2 - Double Queen</h6>

        <p>
          <b className="secondary-color">Added amenities</b>
          <br />
          Continental breakfast, Gymnasium, Daily parking
        </p>
      </div>
      <h5 style={{ marginTop: 20 }}>Hotel information</h5>
      <p>
        <b>Address</b>
        <br />
        8 N. Theatre St.
        <br />
        San Carlos, CA 94070
      </p>
      <p>
        <b>Phone number</b>
        <br />
        Tel: (763) 521-2523
      </p>
      <Collapse in={reservs.status === "active"}>
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="outline-primary" style={{ flex: 1, marginRight: 15 }}>
              Change reservation
            </Button>
            <Button variant="outline-danger" style={{ flex: 1, marginLeft: 15 }}>
              Cancel reservation
            </Button>
          </div>
        </div>
      </Collapse>
    </div>
  );
}
