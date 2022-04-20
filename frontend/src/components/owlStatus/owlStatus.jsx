import { ProgressBar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getUserTypeRdx } from "../../redux/context/contextSelectors";

export function OwlStatus(props) {
  const userType = useSelector(getUserTypeRdx);

  return (
    <div style={{ border: "2px solid #e0e0e0", borderRadius: 10, padding: "30px 40px 30px 40px" }}>
      {userType === "customer" && <h5>You're on your way to becoming an Elf owl!</h5>}

      <h6 style={{ marginTop: 20, marginBottom: 0 }}>Elf Owl Status</h6>
      <ProgressBar variant="success" animated now={(15 / 25) * 100} style={{ marginTop: 10, marginBottom: 5 }} />
      <p style={{ textAlign: "right" }}>15 out of 25 nights</p>

      <h6 style={{ marginTop: 20, marginBottom: 0 }}>Boreal Owl Status</h6>
      <ProgressBar variant="warning" animated now={(15 / 50) * 100} style={{ marginTop: 10, marginBottom: 5 }} />
      <p style={{ textAlign: "right" }}>15 out of 50 nights</p>

      <h6 style={{ marginTop: 20, marginBottom: 0 }}>Snowy Owl Status</h6>
      <ProgressBar variant="secondary" animated now={(15 / 100) * 100} style={{ marginTop: 10, marginBottom: 5 }} />
      <p style={{ textAlign: "right" }}>15 out of 100 nights</p>
    </div>
  );
}
