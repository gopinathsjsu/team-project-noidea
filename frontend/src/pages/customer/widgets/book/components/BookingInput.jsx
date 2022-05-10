import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import ChangePayment from "../../../../../widget/changePayment/ChangePayment";

import "./BookingInput.css";

export function ActionSuggestion(props) {
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);

  return (
    <>
      <div>
        <div className="more-you-can-do" onClick={() => navigate("/customer/stays?type=active")}>
          <h6 style={{ marginBottom: 2 }}>Change or cancel an upcoming reservation</h6>
          <p style={{ margin: 0 }}>Make changes to your itinerary or cancel an upcoming reservation</p>
        </div>
        <div className="more-you-can-do" onClick={() => navigate("/customer/loyalty")}>
          <h6 style={{ marginBottom: 2 }}>See your Owl Reward points</h6>
          <p style={{ margin: 0 }}>See, manage or redeem your Owl reward points</p>
        </div>
        <div className="more-you-can-do" onClick={() => setShowPayment(true)}>
          <h6 style={{ marginBottom: 2 }}>Update your payments information</h6>
          <p style={{ margin: 0 }}>Check or update your payment information</p>
        </div>
      </div>
      {showPayment && <ChangePayment onHide={() => setShowPayment(false)} />}
    </>
  );
}

export default function BookingInput(props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [fields, setFields] = useState({
    checkin: "",
    checkout: "",
    rooms: "1"
  });

  useEffect(() => {
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
          {dayjs(fields.checkout).diff(fields.checkin, "day") > 7 && (
            <Col xs={12}>
              <p style={{ color: "red" }}>The max stay is 7 days</p>
            </Col>
          )}
          {dayjs(fields.checkout).diff(fields.checkin, "day") < 1 && (
            <Col xs={12}>
              <p style={{ color: "red" }}>End date has to be after start date</p>
            </Col>
          )}
          <Col xs={12} style={{ marginTop: 20 }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                disabled={
                  !fields.checkin ||
                  !fields.checkout ||
                  !fields.rooms ||
                  dayjs(fields.checkout).diff(fields.checkin, "day") > 7 ||
                  dayjs(fields.checkout).diff(fields.checkin, "day") < 1
                }
                style={{ paddingLeft: 30, paddingRight: 30 }}
                onClick={() => {
                  setSearchParams(fields);
                  props.onQuery();
                  props.onComplete(fields);
                }}>
                Search
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      <h5 style={{ marginTop: 35 }}>Here's what else you can do</h5>
      <ActionSuggestion />
    </div>
  );
}
