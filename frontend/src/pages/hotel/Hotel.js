import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
      <Container fluid="sm">Hotel</Container>
    </div>
  );
}
