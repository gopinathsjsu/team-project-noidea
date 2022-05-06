import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserTypeRdx } from "../../../redux/context/contextSelectors";

export default function ReservationList(props) {
  const { reservations, reservationType } = props;
  const navigate = useNavigate();
  const userType = useSelector(getUserTypeRdx);

  return (
    <div style={{ marginTop: 30 }}>
      {reservations &&
        reservations
          .filter((reservs) => (reservationType ? true : true))
          .map((reservs) => (
            <div
              className="listed-item-container"
              onClick={() => navigate(`/${userType}/stays/${reservs.id}`, { state: { ...reservs } })}>
              <h5>Trip to at {reservs.city}</h5>
              <p style={{ marginBottom: 0 }}>
                {reservs.rooms} room(s){userType === "hotel" ? ` by ${reservs.customer} ` : " "}at{" "}
                {reservs.hotelProperty} for {reservs.nights} night(s) between {reservs.checkin} and {reservs.checkout}.
              </p>
            </div>
          ))}
    </div>
  );
}
