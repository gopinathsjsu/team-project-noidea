import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Hotel } from "./widgets/hotel/Hotel";
import { Admin } from "./widgets/admin/Admin";
import { Customer } from "./widgets/customer/Customer";
import UnknownPage from "./components/unknownPage/UnknownPage";
import { getUserTypeRdx } from "./redux/context/contextSelectors";

function HomeRouter(props) {
  const userType = useSelector(getUserTypeRdx);

  if (userType === "customer") return <Navigate to="/customer" />;
  if (userType === "admin") return <Navigate to="/admin" />;
  if (userType === "hotel") return <Navigate to="/hotel" />;

  return <UnknownPage msg="Sign in and try again." />;
}

function App() {
  return (
    <div>
      <Routes>
        <Route path="home/" element={<HomeRouter />}></Route>
        <Route path="hotel/*" element={<Hotel />}></Route>
        <Route path="admin/*" element={<Admin />}></Route>
        <Route path="customer/*" element={<Customer />}></Route>
        <Route path="*" element={<UnknownPage msg="Uh-oh, we can't find what you're looking for." />}></Route>
      </Routes>
    </div>
  );
}

export default App;
