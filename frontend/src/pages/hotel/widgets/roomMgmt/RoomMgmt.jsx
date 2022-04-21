import { Container, Nav } from "react-bootstrap";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Amenities from "./component/Amenities";
import Rooms from "./component/Rooms";

export default function RoomMgmt(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const activePill = location.pathname.includes("amenities") ? "amenities" : "rooms";

  return (
    <Container className="reservation-container" style={{ maxWidth: 700 }}>
      <h3>Room management</h3>
      <Nav fill variant="pills" activeKey={activePill} style={{ marginTop: 30 }}>
        <Nav.Item>
          <Nav.Link eventKey="rooms" onClick={() => navigate("rooms")}>
            Rooms
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="amenities" onClick={() => navigate("amenities")}>
            Amenities
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Routes>
        <Route path="/rooms" element={<Rooms />}></Route>
        <Route path="/amenities" element={<Amenities />}></Route>
      </Routes>
    </Container>
  );
}
