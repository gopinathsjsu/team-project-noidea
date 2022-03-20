import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Hotel } from "./widgets/hotel/Hotel";
import { Admin } from "./widgets/admin/Admin";
import { Customer } from "./widgets/customer/Customer";
import UnknownPage from "./components/unknownPage/UnknownPage";
import { getContextRdx } from "./redux/context/contextSelectors";
import FirstTimeUser from "./widgets/firstTimeUser/FirstTimeUser";
import { useEffect } from "react";
import { initiateUserState } from "./redux/context/contextSlice";
import { NavbarWrapper } from "./components/navbar/NavbarWrapper";

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
      <NavbarWrapper userType={context.userType} />
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
