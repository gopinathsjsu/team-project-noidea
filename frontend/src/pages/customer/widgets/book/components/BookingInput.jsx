import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";

import "./BookingInput.css";

export default function BookingInput(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [fields, setFields] = useState({
    location: "",
    checkin: "",
    checkout: "",
    rooms: "1"
  });

  useEffect(() => {
    if (searchParams.get("location")) {
      setFields((fls) => ({ ...fls, location: searchParams.get("location") }));
    }
    if (searchParams.get("checkin")) {
      setFields((fls) => ({ ...fls, checkin: searchParams.get("checkin") }));
    }
    if (searchParams.get("checkout")) {
      setFields((fls) => ({ ...fls, checkout: searchParams.get("checkout") }));
    }
    if (searchParams.get("rooms")) {
      setFields((fls) => ({ ...fls, rooms: searchParams.get("rooms") }));
    }
  }, [searchParams]);

  return (
    <div>
      <div style={{ border: "2px solid #e0e0e0", borderRadius: 10, padding: "30px 40px 30px 40px" }}>
        <Row>
          <Col xs={12}>
            <Form.Group className="mb-3">
              <Form.Label>Where do you want to go?</Form.Label>
              <Form.Control
                placeholder="Hogwarts"
                value={fields.location}
                onChange={(e) => setFields((fls) => ({ ...fls, location: e.target.value }))}
              />
            </Form.Group>
          </Col>
          <Col xs={12} sm={5}>
            <Form.Group className="mb-3">
              <Form.Label>Check-in</Form.Label>
              <Form.Control
                type="date"
                value={fields.checkin}
                onChange={(e) => setFields((fls) => ({ ...fls, checkin: e.target.value }))}
              />
            </Form.Group>
          </Col>
          <Col xs={12} sm={5}>
            <Form.Group className="mb-3">
              <Form.Label>Check-out</Form.Label>
              <Form.Control
                type="date"
                value={fields.checkout}
                onChange={(e) => setFields((fls) => ({ ...fls, checkout: e.target.value }))}
              />
            </Form.Group>
          </Col>
          <Col xs={12} sm={2}>
            <Form.Group className="mb-3">
              <Form.Label>Rooms</Form.Label>
              <Form.Control
                value={fields.rooms}
                onChange={(e) => setFields((fls) => ({ ...fls, rooms: e.target.value }))}
              />
            </Form.Group>
          </Col>
          <Col xs={12} style={{ marginTop: 20 }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                disabled={!fields.location || !fields.checkin || !fields.checkout || !fields.rooms}
                style={{ paddingLeft: 30, paddingRight: 30 }}
                onClick={() => {
                  setSearchParams(fields);
                  props.onComplete(
                    [
                      {
                        name: "Hyatt Regency",
                        location: "San Francisco, CA",
                        price: "$209.33",
                        totalPrice: "$1083.32",
                        amenities: ["Pool and Gymnasium", "Free parking", "Free breakfast"]
                      },
                      {
                        name: "Hyatt Place",
                        location: "San Jose, CA",
                        price: "$73.54",
                        totalPrice: "$487.64",
                        amenities: ["Free parking", "Free breakfast", "Pool"]
                      }
                    ],
                    fields
                  );
                }}>
                Search
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      <h5 style={{ marginTop: 35 }}>Here's what else you can do</h5>
      <div className="more-you-can-do" onClick={() => navigate("/customer/stays?type=active")}>
        <h6 style={{ marginBottom: 2 }}>Change or cancel an upcoming reservation</h6>
        <p style={{ margin: 0 }}>Make changes to your itinerary or cancel an upcoming reservation</p>
      </div>
      <div className="more-you-can-do" onClick={() => navigate("/customer/loyalty")}>
        <h6 style={{ marginBottom: 2 }}>See your Owl Reward points</h6>
        <p style={{ margin: 0 }}>See, manage or redeem your Owl reward points</p>
      </div>
      <div className="more-you-can-do" onClick={() => navigate("/customer/stays?type=active")}>
        <h6 style={{ marginBottom: 2 }}>Update your payments information</h6>
        <p style={{ margin: 0 }}>Check or update your payment information</p>
      </div>
    </div>
  );
}
