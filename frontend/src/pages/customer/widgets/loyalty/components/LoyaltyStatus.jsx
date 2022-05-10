import { useSelector } from "react-redux";
import { OwlStatus } from "../../../../../components/owlStatus/owlStatus";
import { getUserIdRdx } from "../../../../../redux/context/contextSelectors";

export default function LoyaltyStatus() {
  const userId = useSelector(getUserIdRdx);

  return (
    <div>
      <div style={{ marginTop: 35 }}>
        <OwlStatus userId={userId} />
      </div>
      <div
        style={{
          border: "2px solid #e0e0e0",
          borderRadius: 10,
          padding: "30px 40px 30px 40px",
          marginTop: 25,
          marginBottom: 50
        }}>
        <h5 style={{ marginBottom: 25 }}>Understanding your Owl status</h5>
        <p>
          Having owl status gives you certain perks like free upgrad when available and discounted room rates. See below
          to see how your status can help make your next stay amazing!
        </p>
        <h6 style={{ marginTop: 20, marginBottom: 10 }}>Elf Owl Status</h6>
        <ul>
          <li>2% off hotel bookings</li>
        </ul>
        <h6 style={{ marginTop: 20, marginBottom: 10 }}>Boreal Owl Status</h6>
        <ul>
          <li>5% off hotel bookings</li>
        </ul>
        <h6 style={{ marginTop: 20, marginBottom: 10 }}>Snowy Owl Status</h6>
        <ul>
          <li>10% off hotel bookings</li>
        </ul>
        <h6 style={{ marginTop: 20, marginBottom: 10 }}>Great Horned Owl Status</h6>
        <ul>
          <li>15% off hotel bookings</li>
        </ul>
      </div>
    </div>
  );
}
