import { useEffect, useState } from "react";
import { Button, Collapse, Form } from "react-bootstrap";
import BookingServiceUtil from "../../../../../util/bookingServiceUtil";

function AmenityEdit(props) {
  const { setEditing, fields, setFields } = props;

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Form.Group className="mb-3" style={{ flex: 1, marginRight: 5 }}>
          <Form.Label>Amenity name</Form.Label>
          <Form.Control
            placeholder="Hogwarts"
            value={fields.amenityName}
            onChange={(e) => setFields((fls) => ({ ...fls, amenityName: e.target.value }))}
          />
        </Form.Group>
        <Form.Group className="mb-3" style={{ marginLeft: 5 }}>
          <Form.Label>Price</Form.Label>
          <Form.Control
            placeholder="$25.00"
            value={fields.amenityPrice}
            onChange={(e) => setFields((fls) => ({ ...fls, amenityPrice: e.target.value }))}
          />
        </Form.Group>
      </div>
      <div style={{ marginBottom: 20, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="outline-primary"
          style={{ marginRight: 5 }}
          onClick={() => {
            setEditing(false);
            props.onCancel && props.onCancel();
          }}>
          Cancel
        </Button>
        <Button
          style={{ marginLeft: 5 }}
          onClick={() => {
            setEditing(false);
            props.onSubmit && props.onSubmit();
          }}>
          Save changes
        </Button>
      </div>
    </div>
  );
}

function AmenityItem(props) {
  const { amen } = props;
  const [editing, setEditing] = useState(false);
  const [fields, setFields] = useState({
    amenityName: amen.amenityName,
    amenityPrice: amen.amenityPrice
  });

  return (
    <div className="skinny-item-container">
      <Collapse in={!editing}>
        <h6 onClick={() => setEditing(true)}>
          {fields.amenityName} - (${fields.amenityPrice})
        </h6>
      </Collapse>
      <Collapse in={editing}>
        <div>
          <AmenityEdit
            setEditing={setEditing}
            fields={fields}
            setFields={setFields}
            onCancel={() => setFields({ amenityName: amen.amenityName, amenityPrice: amen.amenityPrice })}
          />
        </div>
      </Collapse>
    </div>
  );
}

export default function Amenities(props) {
  const [adding, setAdding] = useState(false);
  const [amenities, setAmenities] = useState([]);
  const [newAmenity, setNewAmenity] = useState({
    amenityPrice: "",
    amenityName: ""
  });

  useEffect(() => {
    (async () => {
      const resp = await BookingServiceUtil.getAmenitites();
      if (resp && !resp.error) {
        setAmenities(resp);
      }
    })();
  }, []);

  return (
    <div style={{ maxWidth: 700 }}>
      {amenities && amenities.map((amen) => <AmenityItem amen={amen} />)}
      <div className="skinny-item-container">
        <Collapse in={!adding}>
          <div onClick={() => setAdding(true)} style={{ marginBottom: 10 }}>
            <h6>+ Add an new amenity</h6>
          </div>
        </Collapse>
        <Collapse in={adding}>
          <div>
            <AmenityEdit
              setEditing={setAdding}
              fields={newAmenity}
              setFields={setNewAmenity}
              onCancel={() => setNewAmenity({ amenityPrice: "", amenityName: "" })}
            />
          </div>
        </Collapse>
      </div>
    </div>
  );
}
