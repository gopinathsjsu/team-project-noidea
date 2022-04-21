import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { getUserTypeRdx } from "../../redux/context/contextSelectors";
import Reservations from "../../widget/reservations/Reservations";
import Customer from "./widgets/customer/Customer";
import RoomMgmt from "./widgets/roomMgmt/RoomMgmt";

export function Hotel() {
  const userType = useSelector(getUserTypeRdx);
  const navigate = useNavigate();

  useEffect(() => {
    if (userType && userType !== "hotel") {
      navigate(`/${userType}`);
    }
  }, [userType, navigate]);

  return (
    <div>
      <Container fluid="sm" style={{ maxWidth: 700 }}>
        <Routes>
          <Route index element={<Navigate to="/hotel/stays" />} />
          <Route path="/stays/*" element={<Reservations />}></Route>
          <Route path="/customers/*" element={<Customer />}></Route>
          <Route path="/room-mgmt/*" element={<RoomMgmt />}></Route>
        </Routes>
      </Container>
    </div>
  );
}
