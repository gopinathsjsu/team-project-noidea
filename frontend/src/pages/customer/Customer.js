import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getUserTypeRdx } from "../../redux/context/contextSelectors";
import Book from "./widgets/book/Book";
import Loyalty from "./widgets/loyalty/Loyalty";
import Reservations from "./widgets/reservations/Reservations";

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
      <Container fluid="sm">
        <Routes>
          <Route path="/stays/*" element={<Reservations />}></Route>
          <Route path="/loyalty/*" element={<Loyalty />}></Route>
          <Route path="/book/*" element={<Book />}></Route>
        </Routes>
      </Container>
    </div>
  );
}
