import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Hotel } from "./widgets/hotel/Hotel";
import { Admin } from "./widgets/admin/Admin";
import { Customer } from "./widgets/customer/Customer";
import UnknownPage from "./components/unknownPage/UnknownPage";
import { getUserTypeRdx } from "./redux/context/contextSelectors";
import FirstTimeUser from "./widgets/firstTimeUser/FirstTimeUser";
import { useEffect } from "react";
import { initiateUserState } from "./redux/context/contextSlice";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      initiateUserState({
        userId: "bfkwong_admin",
        userType: "customer"
      })
    );
    navigate("/customer");
  }, [navigate, dispatch]);

  return (
    <div>
      <Routes>
        <Route path="ftu" element={<FirstTimeUser />}></Route>
        <Route path="hotel/*" element={<Hotel />}></Route>
        <Route path="admin/*" element={<Admin />}></Route>
        <Route path="customer/*" element={<Customer />}></Route>
        <Route path="*" element={<UnknownPage msg="Uh-oh, we can't find what you're looking for." />}></Route>
      </Routes>
    </div>
  );
}

export default App;
