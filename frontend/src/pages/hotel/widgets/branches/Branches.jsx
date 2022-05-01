import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getHotelDataRdx } from "../../../../redux/context/contextSelectors";
import { setGlobalLoad } from "../../../../redux/globalUI/globalUISlice";
import { getBranchesRdx } from "../../../../redux/hotelData/hotelDataSelector";
import { updateBranches } from "../../../../redux/hotelData/hotelDataSlice";
import HotelServiceUtil from "../../../../util/hotelServiceUtil";

function BranchEdit(props) {
  const { fields, setFields } = props;

  return (
    <div className={props.cta === "Save" ? "" : "skinny-item-container"}>
      <Row>
        <Col xs={12}>
          <Form.Group className="mb-3">
            <Form.Label>Branch name</Form.Label>
            <Form.Control
              value={fields?.name}
              onChange={(e) => setFields((fls) => ({ ...fls, name: e.target.value }))}
            />
          </Form.Group>
        </Col>
        <Col xs={12}>
          <Form.Group className="mb-3">
            <Form.Label>Address 1</Form.Label>
            <Form.Control
              value={fields?.address1}
              onChange={(e) => setFields((fls) => ({ ...fls, address1: e.target.value }))}
            />
          </Form.Group>
        </Col>
        <Col xs={12}>
          <Form.Group className="mb-3">
            <Form.Label>Address 2</Form.Label>
            <Form.Control
              value={fields?.address2}
              onChange={(e) => setFields((fls) => ({ ...fls, address2: e.target.value }))}
            />
          </Form.Group>
        </Col>
        <Col xs={12}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={fields?.email}
              onChange={(e) => setFields((fls) => ({ ...fls, email: e.target.value }))}
            />
          </Form.Group>
        </Col>
        <Col xs={12} style={{ marginBottom: 15, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="outline-secondary"
            style={{ marginRight: 10 }}
            onClick={() => {
              props.onCancel && props.onCancel();
            }}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              props.onCTAClick && props.onCTAClick();
            }}>
            {props.cta}
          </Button>
        </Col>
      </Row>
    </div>
  );
}

function BranchItem(props) {
  const { branch } = props;
  const { Address = "\n" } = branch;
  const [editing, setEditing] = useState(false);
  const [fields, setFields] = useState({
    name: branch.BranchName,
    address1: Address.split("\n")[0],
    address2: Address.split("\n")[1],
    email: branch.email
  });

  return (
    <div className="skinny-item-container" onClick={() => !editing && setEditing(true)}>
      <h6>
        {branch?.BranchName ?? "Branch"} - {branch?.branchId}
      </h6>
      {!editing ? (
        <div>
          {branch?.Address?.split && (
            <p style={{ marginBottom: 5 }}>
              {branch.Address.split("\n")[0]}
              <br />
              {branch.Address.split("\n")[1]}
            </p>
          )}
          <p>
            <b>Branch email:</b> {branch?.email}
          </p>
        </div>
      ) : (
        <BranchEdit
          branch={branch}
          cta="Save"
          fields={fields}
          setFields={setFields}
          onCancel={() => {
            setEditing(false);
            setFields({
              name: branch.BranchName,
              address1: Address.split("\n")[0],
              address2: Address.split("\n")[1],
              email: branch.email
            });
          }}
          onCTAClick={() => {
            setEditing(false);
          }}
        />
      )}
    </div>
  );
}

function BranchList(props) {
  const branches = useSelector(getBranchesRdx);
  const hotelData = useSelector(getHotelDataRdx);
  const dispatch = useDispatch();
  const [newHotelData, setNewHotelData] = useState({
    name: "",
    address1: "",
    address2: "",
    email: ""
  });

  useEffect(() => {
    (async () => {
      if (hotelData.hotelId) {
        const resp = await HotelServiceUtil.getBranches(hotelData.hotelId);
        if (resp.message === "No branches found" || resp.error) {
          dispatch(updateBranches([]));
        } else if (resp?.branches && typeof resp.branches === "object") {
          dispatch(updateBranches(resp.branches));
        }
      }
    })();
  }, [hotelData, dispatch]);

  return (
    <div style={{ marginBottom: 150 }}>
      {branches &&
        branches.map((branch, idx) => (
          <div key={`${idx}_${branch.branchId}`}>
            <BranchItem branch={branch} />
          </div>
        ))}
      <BranchEdit
        cta="Add new branch"
        fields={newHotelData}
        setFields={setNewHotelData}
        onCTAClick={async () => {
          dispatch(setGlobalLoad(true));
          await HotelServiceUtil.registerBranch({
            hotelId: hotelData.hotelId,
            address: `${newHotelData.address1}\n${newHotelData.address2}`,
            email: newHotelData.email,
            name: newHotelData.name
          });
          const resp = await HotelServiceUtil.getBranches(hotelData.hotelId);
          if (resp.message === "No branches found" || resp.error) {
            dispatch(updateBranches([]));
          } else if (resp?.branches && typeof resp.branches === "object") {
            dispatch(updateBranches(resp.branches));
          }
          setNewHotelData({ name: "", address1: "", address2: "", email: "" });
          dispatch(setGlobalLoad(false));
        }}
      />
    </div>
  );
}

export default function Branches(props) {
  return (
    <Container style={{ maxWidth: 700 }}>
      <BranchList />
    </Container>
  );
}
