import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { triggerMessage } from "../../../../../redux/globalUI/globalUISlice";
import BookingServiceUtil from "../../../../../util/bookingServiceUtil";

function PricingWidget(props) {
  return (
    <div>
      <div style={{ maxWidth: 700 }}>
        <h5>Pricing</h5>
        <div style={{ display: "flex" }}>
          <p style={{ flex: 1 }} className="no-margin">
            Room subtotal
          </p>
          <p className="no-margin">$945.21</p>
        </div>
        <div style={{ display: "flex" }}>
          <p className="no-margin" style={{ flex: 1 }}>
            Amentities add on
          </p>
          <p className="no-margin">$47.32</p>
        </div>
        <div style={{ display: "flex" }} className="no-margin">
          <p style={{ flex: 1 }} className="no-margin">
            Taxes and fees
          </p>
          <p className="no-margin">$107.42</p>
        </div>
        <div style={{ display: "flex", marginTop: 10 }}>
          <p style={{ flex: 1 }}>
            <b>Total</b>
          </p>
          <p>
            <b>$1,261.21</b>
          </p>
        </div>
      </div>
    </div>
  );
}

function RoomOptionSelector(props) {
  const [fields, setFields] = useState({});

  return (
    <div style={{ marginBottom: 20 }}>
      <hr />
      <h6 style={{ marginBottom: 0 }}>Room {props.roomId} style and amenities</h6>
      <Row>
        {props.hotelRoom?.map &&
          props.hotelRoom.map((h) => (
            <Col xs={12} sm={4}>
              <div
                className={
                  "skinny-item-container " + (fields.roomId === h.roomId ? "skinny-item-container-selected" : "")
                }
                onClick={() =>
                  setFields((fls) => {
                    if (fls.roomId === h.roomId) {
                      return { ...fls, roomId: undefined };
                    }
                    return { ...fls, roomId: h.roomId };
                  })
                }>
                <h6>{h.roomName}</h6>
                <p>{h.roomType}</p>
              </div>
            </Col>
          ))}
      </Row>
      <h6 className="secondary-color" style={{ marginTop: 15 }}>
        Additional amenities
      </h6>
      <Row>
        {props?.hotelAmenity?.map &&
          props.hotelAmenity.map((a) => (
            <Col xs={12} sm={6}>
              <Form.Group>
                <Form.Check type="checkbox" label={`${a.amenityName} $${a.amenityPrice}`} />
              </Form.Group>
            </Col>
          ))}
      </Row>
    </div>
  );
}

export default function BookingRoom(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navLocation = useLocation();
  const navState = navLocation.state;
  const navStateHotel = navState.hotel;
  const [hotelAmenity, setHotelAmenity] = useState([]);
  const [hotelRoom, setHotelRoom] = useState([]);
  const [fields, setFields] = useState({});

  useEffect(() => {
    (async () => {
      const resp = await BookingServiceUtil.getAmenitites();
      if (resp?.length > 0) {
        const hotelAmenity = resp.filter((a) => a.hotelId === navStateHotel.hotelId);
        setHotelAmenity(hotelAmenity);
      }
    })();
    (async () => {
      const resp = await BookingServiceUtil.getRooms();
      if (resp?.length > 0) {
        const hotelAmenity = resp.filter((a) => a.hotelId === navStateHotel.hotelId);
        setHotelRoom(hotelAmenity);
      }
    })();
  }, [navStateHotel]);

  return (
    <Modal show fullscreen onHide={() => navigate(-1)}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Container style={{ maxWidth: 700 }}>
          <h3 style={{ marginTop: 25 }}>
            {navState.bookingParam.rooms} room(s) at the {navState.hotel.BranchName}
          </h3>
          <h6 className="secondary-color" style={{ marginBottom: 30 }}>
            From {navState.bookingParam.checkin} to {navState.bookingParam.checkout} in {navState.bookingParam.location}
          </h6>
          <div>
            {[...Array(parseInt(navState.bookingParam.rooms) ?? 1)].map((_, idx) => (
              <div key={`${idx}`}>
                <RoomOptionSelector roomId={idx + 1} hotelAmenity={hotelAmenity} hotelRoom={hotelRoom} />
              </div>
            ))}
            <hr />
          </div>
          <PricingWidget />
          <div style={{ marginTop: 30, marginBottom: 150 }}>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="By clicking Book, you agree to the terms of service and the privacy statement of Hootel."
              />
            </Form.Group>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Button
                style={{ margin: "20px 0px 0px 0px", paddingLeft: 30, paddingRight: 30 }}
                onClick={() => {
                  navigate("/customer/stays?type=active");
                  dispatch(
                    triggerMessage({
                      errorType: "TOAST_SUCCESS",
                      title: "Your stay has been booked!",
                      body: `Confirmed for ${navState.bookingParam.rooms} room(s) at ${navState.hotel.BranchName} between ${navState.bookingParam.checkin} and ${navState.bookingParam.checkout}`
                    })
                  );
                }}>
                Book
              </Button>
            </div>
          </div>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
