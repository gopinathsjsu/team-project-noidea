import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Hotel } from "./pages/hotel/Hotel";
import { Admin } from "./pages/admin/Admin";
import { Customer } from "./pages/customer/Customer";
import UnknownPage from "./components/unknownPage/UnknownPage";
import { getContextRdx, getUserTypeRdx } from "./redux/context/contextSelectors";
import FirstTimeUser from "./pages/firstTimeUser/FirstTimeUser";
import { useEffect } from "react";
import { initiateUserState } from "./redux/context/contextSlice";
import { NavbarWrapper } from "./components/navbar/NavbarWrapper";
import GlobalUIHandler from "./components/errors/GlobalUIHandler";

import "./App.css";

export function HomeRedirector() {
  const userType = useSelector(getUserTypeRdx);

  return (
    <>
      {userType === "admin" && <Navigate to="/admin" />}
      {userType === "customer" && <Navigate to="/customer" />}
      {userType === "hotel" && <Navigate to="/hotel" />}
    </>
  );
}

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const context = useSelector(getContextRdx);

  useEffect(() => {
    dispatch(
      initiateUserState({
        userId: "bfkwong_admin",
        userType: "customer"
      })
    );
  }, [navigate, dispatch]);

  return (
    <div>
      <GlobalUIHandler>
        <NavbarWrapper userType={context.userType} />
        <Routes>
          <Route path="/ftu" element={<FirstTimeUser />}></Route>
          <Route path="/hotel/*" element={<Hotel />}></Route>
          <Route path="/admin/*" element={<Admin />}></Route>
          <Route path="/customer/*" element={<Customer />}></Route>
          <Route path="/" element={<HomeRedirector />}></Route>
          <Route path="*" element={<UnknownPage msg="Uh-oh, we can't find what you're looking for." />}></Route>
        </Routes>
      </GlobalUIHandler>
    </div>
  );
}

export default App;
