import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { setGlobalLoad } from "../../../redux/globalUI/globalUISlice";
import BookingServiceUtil from "../../../util/bookingServiceUtil";
import HotelServiceUtil from "../../../util/hotelServiceUtil";

export default function ReservationView(props) {
  let params = useParams();
  const navLocation = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [reservs, setReservs] = useState(navLocation.state);
  const [branch, setBranch] = useState({});
  const [amenMapr, setAmenities] = useState({});
  const [roomMapr, setRoomMapper] = useState({});

  useEffect(() => {
    (async () => {
      const reservationId = params.stayId;
      if (!reservs) {
        const reservations = await BookingServiceUtil.allReservations();
        const currentReser = reservations.find((res) => reservationId === res.reservationId);
        setReservs(currentReser);
      }
      console.log(reservs);
      const branch = await HotelServiceUtil.getBranches(reservs.hotelId, reservs.branchId);
      setBranch(branch.branch);
    })();
    (async () => {
      const amenities = await BookingServiceUtil.getAmenitites();
      const amenitiesMapper = {};
      amenities.map((amen) => (amenitiesMapper[amen.amenityId] = amen));
      setAmenities(amenitiesMapper);
    })();
    (async () => {
      const rooms = await BookingServiceUtil.getRooms();
      const roomMapper = {};
      rooms.map((room) => (roomMapper[room.roomId] = room));
      setRoomMapper(roomMapper);
    })();
  }, [params.stayId, reservs]);

  return (
    <div style={{ maxWidth: 700, marginTop: 20, marginBottom: 150 }}>
      <h3>Trip to at {branch.branchName}</h3>
      <p>
        {reservs.room?.length} room(s) between {reservs.startDate} and {reservs.endDate}
      </p>
      <div style={{ display: "flex" }}>
        <p style={{ flex: 1 }}>
          <b>Check in</b>
          <br />
          {reservs.checkin} 11AM on {reservs.startDate}
        </p>
        <p style={{ flex: 1 }}>
          <b>Check out</b>
          <br />
          {reservs.checkout} 3PM on {reservs.endDate}
        </p>
      </div>
      <p>
        <b>Final price</b>
        <br />${reservs.price}
      </p>
      <h5>Booking information</h5>
      {reservs?.room?.map &&
        reservs.room.map((res) => {
          return (
            <div className="skinny-item-container-no-highlight">
              <h6>Room 1 - {roomMapr[res.roomId]?.roomName}</h6>
              <p>
                <b className="secondary-color">Added amenities</b>
                <br />
                {res?.amenityIds.length === 0 && "No added amenities"}
                {res?.amenityIds?.map &&
                  res.amenityIds
                    .map((aid) => {
                      return amenMapr[aid]?.amenityName;
                    })
                    .join(", ")}
              </p>
            </div>
          );
        })}
      <h5 style={{ marginTop: 20 }}>Hotel information</h5>
      <p>
        <b>Address</b>
        <br />
        {branch.address}
      </p>
      <p>
        <b>Email</b>
        <br />
        {branch.email}
      </p>
      {reservs?.reservationStatus === "CONFIRMED" && (
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="outline-danger"
              style={{ flex: 1 }}
              onClick={async () => {
                dispatch(setGlobalLoad(true));
                await BookingServiceUtil.cancelReservation(reservs.reservationId);
                dispatch(setGlobalLoad(false));
                navigate(-1);
              }}>
              Cancel reservation
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
