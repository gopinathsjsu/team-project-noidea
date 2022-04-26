import React from "react";
import { Form, Container, Accordion, Row, Col, Modal, Button } from "react-bootstrap";

import customerConfig from "./config/customerConfig.json";
import hotelConfig from "./config/hotelConfig.json";
import adminConfig from "./config/adminConfig.json";

import "./FirstTimeUser.css";
import UserServiceUtil from "../../util/userServiceUtil";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataRdx, getUserIdRdx } from "../../redux/context/contextSelectors";
import { setGlobalLoad, triggerMessage } from "../../redux/globalUI/globalUISlice";
import { Navigate, useNavigate } from "react-router-dom";

function TextField(props) {
  return (
    <Form.Group className="field-wrapper">
      <Form.Label>{props.label}</Form.Label>
      <Form.Control type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.onChange} />
      {props.helper && <Form.Text className="text-muted">{props.helper}</Form.Text>}
    </Form.Group>
  );
}

export function AccordionLayout(props) {
  const { config, fields, updateFields } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = React.useState(0);
  const userId = useSelector(getUserIdRdx);

  return (
    <Container fluid="sm">
      <Accordion defaultActiveKey="0" activeKey={`${activeKey}`}>
        {config.accordions.map((section, idx) => (
          <Accordion.Item eventKey={`${idx}`}>
            <Accordion.Header onClick={() => setActiveKey((actKey) => (actKey === parseInt(idx) ? -1 : parseInt(idx)))}>
              {section.title}
            </Accordion.Header>
            <Accordion.Body>
              <Row>
                {section.hasSubSections
                  ? section.subSections.map((subsection) => (
                      <React.Fragment>
                        <Col xs={12}>
                          <h6 className="accordion-subtitle">{subsection.subtitle}</h6>
                        </Col>
                        {subsection.fields.map((field) => (
                          <Col xs={field.colSizeXS} md={field.colSizeMD}>
                            <TextField
                              {...field}
                              value={fields[field.fieldId]}
                              onChange={(e) => updateFields(field.fieldId, e.target.value)}
                            />
                          </Col>
                        ))}
                      </React.Fragment>
                    ))
                  : section.fields.map((field) => (
                      <Col xs={field.colSizeXS} md={field.colSizeMD}>
                        <TextField
                          {...field}
                          value={fields[field.fieldId]}
                          onChange={(e) => updateFields(field.fieldId, e.target.value)}
                        />
                      </Col>
                    ))}
                <Col xs={12}>
                  <Button className="section-cta-btn" onClick={() => setActiveKey((activeKey) => activeKey + 1)}>
                    {section.nextCTA}
                  </Button>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
      <Row>
        <Form>
          <div className="tc-checkbox-container">
            {config.termsAndConditions.map((tAndC, tAndCIdx) => (
              <Form.Check
                type="checkbox"
                label={tAndC}
                checked={fields[`tAndC_${tAndCIdx}`]}
                onChange={(e) => updateFields(`tAndC_${tAndCIdx}`, e.target.checked)}></Form.Check>
            ))}
          </div>
        </Form>
        <Col>
          <Button
            disabled={config.mandatoryFields.find((fieldId) => fields[fieldId] === undefined)}
            onClick={async () => {
              dispatch(setGlobalLoad(true));
              const response = await UserServiceUtil.registerUserInfo(userId, {
                name: [fields.firstName, fields.lastName],
                email: fields.email,
                address: `${fields.addrStreet}, ${fields.addrCity}, ${fields.addrState} ${fields.addrZipcode}`,
                country: "USA"
              });
              if (response.error) {
                dispatch(
                  triggerMessage({
                    errorType: "TOAST_ERROR",
                    title: "Sorry, we weren't able to register you",
                    body: "Try again in a few minutes, if this keeps occuring, please reach out to us"
                  })
                );
              } else {
                dispatch(
                  triggerMessage({
                    errorType: "TOAST_SUCCESS",
                    title: "You've been successfully registered!",
                    body: "Time to travel more than Karl Malone."
                  })
                );
                navigate("/");
              }
              dispatch(setGlobalLoad(false));
            }}>
            {config.submissionText}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

const configMapper = {
  customer: customerConfig,
  admin: adminConfig,
  hotelConfig: hotelConfig
};

export default function FirstTimeUser(props) {
  const [fields, setFields] = React.useState({});

  const config = configMapper.customer;

  const updateFields = React.useCallback((fieldId, fieldValue) => {
    setFields((fields) => ({ ...fields, [fieldId]: fieldValue }));
  }, []);

  return (
    <Modal show fullscreen>
      <Modal.Header>
        <Modal.Title>{config.modalHeader}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AccordionLayout fields={fields} updateFields={updateFields} config={config} />
      </Modal.Body>
    </Modal>
  );
}
