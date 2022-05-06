import { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getUserTypeRdx } from "../../redux/context/contextSelectors";
import LoyaltyServiceUtil from "../../util/loyaltyServiceUtil";

export function OwlStatus(props) {
  const userType = useSelector(getUserTypeRdx);
  const [loyaltyAccnt, setLoyaltyAccnt] = useState({});

  useEffect(() => {
    (async () => {
      if (props.userId) {
        const resp = await LoyaltyServiceUtil.getLoyaltyAccountId(props.userId);
        if (!resp.error) {
          setLoyaltyAccnt(resp.loyalty);
        }
      }
    })();
  }, [props.userId]);

  return (
    <div style={{ border: "2px solid #e0e0e0", borderRadius: 10, padding: "30px 40px 30px 40px" }}>
      {userType === "customer" && <h5>You're on your way to becoming an Elf owl!</h5>}

      <h6 style={{ marginTop: 20, marginBottom: 0 }}>Elf Owl Status</h6>
      <ProgressBar
        variant="success"
        animated
        now={(loyaltyAccnt.amount / 25) * 100}
        style={{ marginTop: 10, marginBottom: 5 }}
      />
      <p style={{ textAlign: "right" }}>{loyaltyAccnt.amount} out of 25 nights</p>

      <h6 style={{ marginTop: 20, marginBottom: 0 }}>Boreal Owl Status</h6>
      <ProgressBar
        variant="warning"
        animated
        now={(loyaltyAccnt.amount / 50) * 100}
        style={{ marginTop: 10, marginBottom: 5 }}
      />
      <p style={{ textAlign: "right" }}>{loyaltyAccnt.amount} out of 50 nights</p>

      <h6 style={{ marginTop: 20, marginBottom: 0 }}>Snowy Owl Status</h6>
      <ProgressBar
        variant="secondary"
        animated
        now={(loyaltyAccnt.amount / 100) * 100}
        style={{ marginTop: 10, marginBottom: 5 }}
      />
      <p style={{ textAlign: "right" }}>{loyaltyAccnt.amount} out of 100 nights</p>
    </div>
  );
}
