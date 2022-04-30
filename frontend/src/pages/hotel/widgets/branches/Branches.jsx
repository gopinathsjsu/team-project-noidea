import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { v4 as uuid4 } from "uuid";

function BranchEdit(props) {
  const [fields, setFields] = useState({
    address1: props.branch.address.split("\n")[0],
    address2: props.branch.address.split("\n")[1],
    email: props.branch.email
  });

  return (
    <div className={props.cta === "Save" ? "" : "skinny-item-container"}>
      <Row>
        <Col xs={12}>
          <Form.Group className="mb-3">
            <Form.Label>Address 1</Form.Label>
            <Form.Control
              value={fields.address1}
              onChange={(e) => setFields((fls) => ({ ...fls, address1: e.target.value }))}
            />
          </Form.Group>
        </Col>
        <Col xs={12}>
          <Form.Group className="mb-3">
            <Form.Label>Address 2</Form.Label>
            <Form.Control
              value={fields.address2}
              onChange={(e) => setFields((fls) => ({ ...fls, address2: e.target.value }))}
            />
          </Form.Group>
        </Col>
        <Col xs={12}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={fields.email}
              onChange={(e) => setFields((fls) => ({ ...fls, email: e.target.value }))}
            />
          </Form.Group>
        </Col>
        <Col xs={12} style={{ marginBottom: 15, display: "flex", justifyContent: "flex-end" }}>
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
  const [editing, setEditing] = useState(false);
  return (
    <div className="skinny-item-container">
      <h6>Branch {branch.branchId}</h6>
      {!editing ? (
        <div onClick={() => setEditing(true)}>
          <p style={{ marginBottom: 5 }}>
            {branch.address.split("\n")[0]}
            <br />
            {branch.address.split("\n")[1]}
          </p>
          <p>
            <b>Branch email:</b> {branch.email}
          </p>
        </div>
      ) : (
        <BranchEdit
          branch={branch}
          cta="Save"
          onCTAClick={() => {
            setEditing(false);
          }}
        />
      )}
    </div>
  );
}

function BranchList(props) {
  const [addNewBranch, setAddNewBranch] = useState(false);
  const [branches, setBranches] = useState([
    {
      branchId: uuid4(),
      address: "123 Google St.\nHello, CA 34231",
      country: "USA",
      email: "2hg2@gwe.cs"
    },
    {
      branchId: uuid4(),
      address: "123 Google St.\nHello, CA 34231",
      country: "USA",
      email: "2hg2@gwe.cs"
    }
  ]);

  return (
    <div style={{ marginBottom: 150 }}>
      {branches && branches.map((branch) => <BranchItem branch={branch} />)}
      <BranchEdit branch={{ address: "\n", email: "" }} cta="Add new branch" />
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
