import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function BookingInput(props) {
  const navigate = useNavigate();

  return (
    <div>
      <div style={{ border: "1px solid #e0e0e0", borderRadius: 10, padding: "30px 40px 30px 40px" }}>
        <Row>
          <Col xs={12}>
            <Form.Group className="mb-3">
              <Form.Label>Where do you want to go?</Form.Label>
              <Form.Control placeholder="Hogwarts" />
            </Form.Group>
          </Col>
          <Col xs={12} sm={5}>
            <Form.Group className="mb-3">
              <Form.Label>Check-in</Form.Label>
              <Form.Control placeholder="Hogwarts" type="date" />
            </Form.Group>
          </Col>
          <Col xs={12} sm={5}>
            <Form.Group className="mb-3">
              <Form.Label>Check-out</Form.Label>
              <Form.Control placeholder="Hogwarts" type="date" />
            </Form.Group>
          </Col>
          <Col xs={12} sm={2}>
            <Form.Group className="mb-3">
              <Form.Label>Rooms</Form.Label>
              <Form.Control placeholder="1" />
            </Form.Group>
          </Col>
          <Col xs={12} style={{ marginTop: 20 }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button style={{ paddingLeft: 30, paddingRight: 30 }}>Search</Button>
            </div>
          </Col>
        </Row>
      </div>

      <h5 style={{ marginTop: 35 }}>Here's what else you can do</h5>
      <div
        style={{ border: "1px solid #e0e0e0", borderRadius: 10, padding: "10px 15px 10px 15px", marginTop: 15 }}
        onClick={() => navigate("/customer/stays?type=active")}>
        <h6 style={{ marginBottom: 2 }}>Change or cancel an upcoming reservation</h6>
        <p style={{ margin: 0 }}>Make changes to your itinerary or cancel an upcoming reservation</p>
      </div>
      <div
        style={{ border: "1px solid #e0e0e0", borderRadius: 10, padding: "10px 15px 10px 15px", marginTop: 15 }}
        onClick={() => navigate("/customer/loyalty")}>
        <h6 style={{ marginBottom: 2 }}>See your Owl Reward points</h6>
        <p style={{ margin: 0 }}>See, manage or redeem your Owl reward points</p>
      </div>
      <div
        style={{ border: "1px solid #e0e0e0", borderRadius: 10, padding: "10px 15px 10px 15px", marginTop: 15 }}
        onClick={() => navigate("/customer/stays?type=active")}>
        <h6 style={{ marginBottom: 2 }}>Update your payments information</h6>
        <p style={{ margin: 0 }}>Check or update your payment information</p>
      </div>
    </div>
  );
}
