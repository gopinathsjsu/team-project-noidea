import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { OwlStatus } from "../../../../../components/owlStatus/owlStatus";
import { getUserIdRdx } from "../../../../../redux/context/contextSelectors";

export default function CustomerView(props) {
  const navLocation = useLocation();
  const userId = useSelector(getUserIdRdx);

  const navState = navLocation.state;

  return (
    <div style={{ maxWidth: 700, marginTop: 20, marginBottom: 150 }}>
      <h3 style={{ marginBottom: 30 }}>{navState?.name}</h3>
      <OwlStatus userId={userId} />
    </div>
  );
}
