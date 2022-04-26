import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Hotel } from "./pages/hotel/Hotel";
import { Customer } from "./pages/customer/Customer";
import UnknownPage from "./components/unknownPage/UnknownPage";
import { getUserDataRdx, getUserTypeRdx } from "./redux/context/contextSelectors";
import FirstTimeUser from "./pages/firstTimeUser/FirstTimeUser";
import { useEffect } from "react";
import { setUserData, updateUserId, updateUserType } from "./redux/context/contextSlice";
import { NavbarWrapper } from "./components/navbar/NavbarWrapper";
import GlobalUIHandler from "./components/errors/GlobalUIHandler";

import "./App.css";
import { Auth } from "aws-amplify";
import UserServiceUtil from "./util/userServiceUtil";
import { setGlobalLoad, triggerMessage } from "./redux/globalUI/globalUISlice";

export function HomeRedirector() {
  const userType = useSelector(getUserTypeRdx);

  const determinePath = () => {
    if (userType === "hotel") {
      return <Navigate to="/hotel" />;
    } else if (userType === "customer") {
      return <Navigate to="/customer" />;
    } else {
      return <Navigate to="/unknownUser" />;
    }
  };

  return <>{determinePath()}</>;
}

function App() {
  const dispatch = useDispatch();
  const userType = useSelector(getUserTypeRdx);
  const userData = useSelector(getUserDataRdx);

  useEffect(() => {
    (async () => {
      // Show full page spinner
      dispatch(setGlobalLoad(true));

      const cogUserId = await Auth.currentSession();
      const userId = cogUserId?.idToken?.payload["cognito:username"];
      if (userId) {
        dispatch(updateUserId({ userId }));
        const userInfoResp = await UserServiceUtil.getUserInfo(userId);
        if (userInfoResp?.user?.userId && userInfoResp?.user?.role) {
          if (userInfoResp?.user?.role?.length === 1) {
            const userType = userInfoResp?.user?.role[0].toLowerCase && userInfoResp?.user?.role[0].toLowerCase();
            dispatch(updateUserType({ userType }));
            dispatch(setUserData(userInfoResp.user));
          }
        } else {
          dispatch(setUserData({}));
        }
      } else {
        dispatch(triggerMessage({ errorType: "FATAL_ERROR" }));
      }

      // Hide full page spinner
      dispatch(setGlobalLoad(false));
    })();
  }, [dispatch]);

  if (!userData) {
    return <div />;
  }

  return (
    <div>
      <GlobalUIHandler>
        <NavbarWrapper userType={userType} />
        <Routes>
          <Route path="/ftu" element={<FirstTimeUser />}></Route>
          <Route path="/hotel/*" element={<Hotel />}></Route>
          <Route path="/customer/*" element={<Customer />}></Route>
          <Route path="/" element={<HomeRedirector />}></Route>
          <Route path="*" element={<UnknownPage msg="Uh-oh, we can't find what you're looking for." />}></Route>
        </Routes>
      </GlobalUIHandler>
    </div>
  );
}

export default App;
