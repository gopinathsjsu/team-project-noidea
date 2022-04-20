import { OwlStatus } from "../../../../../components/owlStatus/owlStatus";

export default function LoyaltyStatus() {
  return (
    <div>
      <div style={{ marginTop: 35 }}>
        <OwlStatus />
      </div>
      <div style={{ border: "2px solid #e0e0e0", borderRadius: 10, padding: "30px 40px 30px 40px", marginTop: 25 }}>
        <h5 style={{ marginBottom: 25 }}>Recent reward activities</h5>
        <div style={{ display: "flex" }}>
          <h6 style={{ flex: 1 }}>Hyatt Regency at Ferry Terminal</h6>
          <h6>+3 nights</h6>
        </div>
        <div style={{ display: "flex" }}>
          <h6 style={{ flex: 1 }}>Intercontinental SF</h6>
          <h6>+6 nights</h6>
        </div>
        <div style={{ display: "flex" }}>
          <h6 style={{ flex: 1 }}>Hyatt Place San Jose Airport</h6>
          <h6>+2 nights</h6>
        </div>
        <p style={{ margin: 0, textAlign: "center", width: "100%" }} className="span-fake-link">
          See more
        </p>
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
          <li>2.5% off hotel bookings</li>
        </ul>
        <h6 style={{ marginTop: 20, marginBottom: 10 }}>Boreal Owl Status</h6>
        <ul>
          <li>5% off hotel bookings</li>
        </ul>
        <h6 style={{ marginTop: 20, marginBottom: 10 }}>Snowy Owl Status</h6>
        <ul>
          <li>10% off hotel bookings</li>
        </ul>
      </div>
    </div>
  );
}
