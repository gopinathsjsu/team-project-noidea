import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserIdRdx } from "../../redux/context/contextSelectors";
import { setCardData } from "../../redux/context/contextSlice";
import UserServiceUtil from "../../util/userServiceUtil";

export default function ChangePayment(props) {
  const [fields, setFields] = useState({});
  const dispatch = useDispatch();
  const userId = useSelector(getUserIdRdx);

  const setFieldInfo = (fieldId, value) => setFields((fls) => ({ ...fls, [fieldId]: value }));

  return (
    <Modal show>
      <Modal.Header closeButton onHide={props.onHide}>
        <Modal.Title>Change your payment info</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group>
          <Form.Label>Card number</Form.Label>
          <Form.Control value={fields.number} onChange={(e) => setFieldInfo("number", e.target.value)} />
        </Form.Group>
      </Modal.Body>
      <Modal.Body>
        <Form.Group>
          <Form.Label>CVV</Form.Label>
          <Form.Control value={fields.cvv} onChange={(e) => setFieldInfo("cvv", e.target.value)} />
        </Form.Group>
      </Modal.Body>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Expiration Date</Form.Label>
          <Form.Control value={fields.expDate} onChange={(e) => setFieldInfo("expDate", e.target.value)} />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={async () => {
            await UserServiceUtil.updateCardInfo(userId, fields);
            const userInfoResp = await UserServiceUtil.getUserInfo(userId);
            dispatch(setCardData(userInfoResp.card));
            props.onHide();
          }}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
