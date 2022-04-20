import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserTypeRdx } from "../../../../../redux/context/contextSelectors";

export default function BookingList(props) {
  const { hotels, bookingParam, setHotels } = props;
  const navigate = useNavigate();
  const userType = useSelector(getUserTypeRdx);

  return (
    <div>
      <div>
        <p style={{ color: "#999999" }}>
          Results for {bookingParam.rooms} room(s) in {bookingParam.location} between {bookingParam.checkin} and{" "}
          {bookingParam.checkout}.{" "}
          <span className="span-fake-link" onClick={() => setHotels([])}>
            Change.
          </span>
        </p>
      </div>
      {hotels &&
        hotels.map((hotel) => (
          <div
            className="listed-item-container"
            onClick={() => {
              if (userType === "customer") {
                navigate("/customer/book/new", { state: { hotel, bookingParam } });
              }
            }}>
            <h5 style={{ marginBottom: 2 }}>{hotel.name}</h5>
            <p style={{ margin: "0px 0px 10px 0px" }}>{hotel.location}</p>
            <div style={{ display: "flex" }}>
              <div style={{ flex: 1 }}>
                <ul style={{ marginBottom: 0 }}>
                  {hotel.amenities.map((ameni) => (
                    <li>{ameni}</li>
                  ))}
                </ul>
              </div>
              <div style={{ alignSelf: "flex-end", textAlign: "right" }}>
                <h4 style={{ margin: 0 }}>{hotel.price}</h4>
                <p style={{ margin: 0, color: "#999999" }}>{hotel.totalPrice} total</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
