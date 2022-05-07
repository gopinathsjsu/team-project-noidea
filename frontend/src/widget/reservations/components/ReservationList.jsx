import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserTypeRdx } from "../../../redux/context/contextSelectors";
import HotelServiceUtil from "../../../util/hotelServiceUtil";

export default function ReservationList(props) {
  const { reservations, reservationType } = props;
  const navigate = useNavigate();
  const userType = useSelector(getUserTypeRdx);
  const [hotels, setHotels] = useState({});

  useEffect(() => {
    (async () => {
      const hotelsReturn = await HotelServiceUtil.getHotels();
      const hotelNameMapper = {};
      hotelsReturn?.hotels?.forEach &&
        hotelsReturn.hotels.forEach((hot) => (hotelNameMapper[hot.hotelId] = hot.HotelName));
      setHotels(hotelNameMapper);
    })();
  }, []);

  return (
    <div style={{ marginTop: 30 }}>
      {reservations &&
        reservations
          .filter((reservs) => reservationType === reservs.reservationStatus)
          .map((reservs) => (
            <div
              className="listed-item-container"
              onClick={() => navigate(`/${userType}/stays/${reservs.reservationId}`, { state: { ...reservs } })}>
              <h5>Stay at {hotels[reservs?.hotelId]}</h5>
              <p style={{ marginBottom: 0 }}>
                {reservs?.room?.length} room(s){userType === "hotel" ? ` by ${reservs.customer} ` : " "} between{" "}
                {reservs.startDate} and {reservs.endDate}.
              </p>
            </div>
          ))}
    </div>
  );
}
