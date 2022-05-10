import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserTypeRdx } from "../../../../../redux/context/contextSelectors";

export default function BookingList(props) {
  const { hotels, bookingParam, setHotels } = props;
  const navigate = useNavigate();
  const userType = useSelector(getUserTypeRdx);

  return (
    <div>
      <div>
        <p style={{ color: "#999999" }}>
          Results for {bookingParam.rooms} room(s) between {bookingParam.checkin} and {bookingParam.checkout}.{" "}
          <span className="span-fake-link" onClick={() => setHotels([])}>
            Change.
          </span>
        </p>
      </div>
      {hotels &&
        hotels.map((hotel, idx) => (
          <div
            key={`${hotel.branchId}_${idx}`}
            className="listed-item-container"
            onClick={() => {
              if (userType === "customer") {
                navigate("/customer/book/new", { state: { hotel, bookingParam } });
              }
            }}>
            <h5 style={{ marginBottom: 2 }}>{hotel.BranchName}</h5>
            <p style={{ margin: "0px 0px 10px 0px" }}>{hotel.Address}</p>
          </div>
        ))}
    </div>
  );
}
