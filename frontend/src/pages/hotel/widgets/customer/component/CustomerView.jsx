import { useLocation } from "react-router-dom";
import { OwlStatus } from "../../../../../components/owlStatus/owlStatus";
import ReservationList from "../../../../../widget/reservations/components/ReservationList";
import { mockReservations } from "../../../../../widget/reservations/Reservations";

export default function CustomerView(props) {
  const navLocation = useLocation();
  const navState = navLocation.state;

  return (
    <div style={{ maxWidth: 700, marginTop: 20, marginBottom: 150 }}>
      <h3 style={{ marginBottom: 30 }}>{navState?.name}</h3>
      <OwlStatus />
      <h5 style={{ marginTop: 20 }}>Past reservations</h5>
      <ReservationList reservations={mockReservations} />
    </div>
  );
}
