import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { OwlStatus } from "../../components/owlStatus/owlStatus";
import { getUserDataRdx, getUserTypeRdx } from "../../redux/context/contextSelectors";
import Reservations from "../../widget/reservations/Reservations";
import Book from "./widgets/book/Book";
import { ActionSuggestion } from "./widgets/book/components/BookingInput";
import Loyalty from "./widgets/loyalty/Loyalty";

function CustomerHome() {
  return (
    <div>
      <h5 style={{ marginTop: 35 }}>Here's something you can do</h5>
      <ActionSuggestion />
      <h5 style={{ marginTop: 35 }}>Your rewards status</h5>
      <div style={{ marginTop: 20, marginBottom: 50 }}>
        <OwlStatus />
      </div>
    </div>
  );
}

export function Customer() {
  const userType = useSelector(getUserTypeRdx);
  const navigate = useNavigate();

  useEffect(() => {
    if (userType && userType !== "customer") {
      navigate(`/${userType}`);
    }
  }, [userType, navigate]);

  return (
    <div>
      <Container fluid="sm" style={{ maxWidth: 700 }}>
        <Routes>
          <Route index element={<CustomerHome />}></Route>
          <Route path="/stays/*" element={<Reservations />}></Route>
          <Route path="/loyalty/*" element={<Loyalty />}></Route>
          <Route path="/book/*" element={<Book />}></Route>
        </Routes>
      </Container>
    </div>
  );
}
