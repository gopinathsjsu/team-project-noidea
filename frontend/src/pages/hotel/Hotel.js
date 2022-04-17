import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { getUserTypeRdx } from "../../redux/context/contextSelectors";

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
          <Route path="/stays/*" element={<h4 style={{ marginTop: 35 }}>Stays</h4>}></Route>
          <Route path="/customers/*" element={<h4 style={{ marginTop: 35 }}>Customers</h4>}></Route>
          <Route path="/room-mgmt/*" element={<h4 style={{ marginTop: 35 }}>Room management</h4>}></Route>
        </Routes>
      </Container>
    </div>
  );
}
