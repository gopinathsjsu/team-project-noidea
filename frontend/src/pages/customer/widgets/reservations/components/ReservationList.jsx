import { useNavigate } from "react-router-dom";

export default function ReservationList(props) {
  const { reservations, reservationType } = props;
  const navigate = useNavigate();

  return (
    <div style={{ marginTop: 30 }}>
      {reservations &&
        reservations
          .filter((reservs) => reservs.status === reservationType)
          .map((reservs) => (
            <div
              className="listed-item-container"
              onClick={() => navigate(`/customer/stays/${reservs.id}`, { state: { ...reservs } })}>
              <h5>Trip to at {reservs.city}</h5>
              <p style={{ marginBottom: 0 }}>
                {reservs.rooms} room(s) at {reservs.hotelProperty} for {reservs.nights} night(s) between{" "}
                {reservs.checkin} and {reservs.checkout}.
              </p>
            </div>
          ))}
    </div>
  );
}
