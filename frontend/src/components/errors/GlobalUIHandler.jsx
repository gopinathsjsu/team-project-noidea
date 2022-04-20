import { Modal, Alert, Spinner } from "react-bootstrap";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircleFill, ExclamationCircleFill, InfoCircleFill } from "react-bootstrap-icons";
import { getGUILoading, getGUIMessage } from "../../redux/globalUI/globalUISelectors";
import { clearMessage } from "../../redux/globalUI/globalUISlice";

function ModalMessageHandler(props) {
  const error = useSelector(getGUIMessage);
  const dispatch = useDispatch();

  const errorClasses = {
    MODAL_ERROR: "text-danger",
    MODAL_WARNING: "text-warning",
    MODAL_SUCCESS: "text-success",
    MODAL_BLANK: ""
  };

  const errorIcon = {
    MODAL_ERROR: <ExclamationCircleFill />,
    MODAL_WARNING: <ExclamationCircleFill />,
    MODAL_SUCCESS: <CheckCircleFill />,
    MODAL_BLANK: <InfoCircleFill />
  };

  if (error?.errorType?.includes && error.errorType.includes("MODAL")) {
    return (
      <Modal show onHide={() => dispatch(clearMessage())}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div style={{ display: "flex", alignItems: "center" }} class={errorClasses[error.errorType]}>
              {errorIcon[error.errorType] ?? <InfoCircleFill />}
              <div style={{ marginLeft: 5 }}>{error?.title ?? "Uh-oh, something went wrong"}</div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{error?.body ?? "Something went wrong and we're not sure why. Refresh the page and try again"}</p>
        </Modal.Body>
      </Modal>
    );
  }
  return <></>;
}

function ToastMessageHandler(props) {
  const error = useSelector(getGUIMessage);
  const dispatch = useDispatch();

  const errorClasses = {
    TOAST_ERROR: "danger",
    TOAST_WARNING: "warning",
    TOAST_SUCCESS: "success",
    TOAST_BLANK: "primary"
  };

  if (error?.errorType?.includes && error.errorType.includes("TOAST")) {
    console.log(error);

    return (
      <Alert
        variant={errorClasses[error.errorType]}
        dismissible
        style={{ position: "absolute", left: "5%", right: "5%", bottom: 20, zIndex: 5000 }}
        onClose={() => dispatch(clearMessage())}>
        <Alert.Heading>{error?.title ?? "Uh-oh, something went wrong"}</Alert.Heading>
        <p>{error?.body ?? "Something went wrong and we're not sure why. Refresh the page and try again"}</p>
      </Alert>
    );
  }
  return <></>;
}

export default function GlobalUIHandler(props) {
  const error = useSelector(getGUIMessage);
  const globalLoad = useSelector(getGUILoading);

  if (error && error.errorType === "FATAL_ERROR") {
    return (
      <div style={{ margin: 30 }}>
        <h1 style={{ fontSize: 100 }}>:(</h1>
        <h1>{error?.title ?? "Uh-oh, something went wrong"}</h1>
        <p>{error?.body ?? "Something went wrong and we're not sure why. Refresh the page and try again"}</p>
      </div>
    );
  }

  return (
    <div>
      {globalLoad && (
        <div
          style={{
            background: "rgba(0,0,0,0.1)",
            width: "100vw",
            height: "100vh",
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 5
          }}>
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      <ModalMessageHandler />
      <ToastMessageHandler />
      {props.children}
    </div>
  );
}
