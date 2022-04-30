import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { getUserDataRdx, getUserTypeRdx } from "../../redux/context/contextSelectors";
import Reservations from "../../widget/reservations/Reservations";
import Branches from "./widgets/branches/Branches";
import Customer from "./widgets/customer/Customer";
import RoomMgmt from "./widgets/roomMgmt/RoomMgmt";

export function Hotel() {
  const userType = useSelector(getUserTypeRdx);
  const userData = useSelector(getUserDataRdx);
  const navigate = useNavigate();

  useEffect(() => {
    if (userType && userType !== "hotel") {
      navigate(`/${userType}`);
    }
    if (userData && !userData.userId) {
      navigate("/ftu");
    }
  }, [userType, navigate, userData]);

  return (
    <div>
      <Container fluid="sm" style={{ maxWidth: 700 }}>
        <Routes>
          <Route index element={<Navigate to="/hotel/stays" />} />
          <Route path="/branches/*" element={<Branches />}></Route>
          <Route path="/stays/*" element={<Reservations />}></Route>
          <Route path="/customers/*" element={<Customer />}></Route>
          <Route path="/room-mgmt/*" element={<RoomMgmt />}></Route>
        </Routes>
      </Container>
    </div>
  );
}
