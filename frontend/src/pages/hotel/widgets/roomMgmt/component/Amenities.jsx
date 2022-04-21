import { useState } from "react";
import { Button, Collapse, Form } from "react-bootstrap";

const mockAmenities = [
  {
    name: "Daily Parking",
    price: "$70.00"
  },
  {
    name: "Continental Breakfast",
    price: "$15.00"
  },
  {
    name: "All meals included",
    price: "$45.00"
  },
  {
    name: "Gymnasium",
    price: "$10.00"
  }
];

export default function Amenities(props) {
  const [adding, setAdding] = useState(false);

  return (
    <div style={{ maxWidth: 700 }}>
      {mockAmenities &&
        mockAmenities.map((amen) => (
          <div className="skinny-item-container">
            <h6>
              {amen.name} - ({amen.price})
            </h6>
          </div>
        ))}
      <div className="skinny-item-container">
        <Collapse in={!adding}>
          <div onClick={() => setAdding(true)} style={{ marginBottom: 10 }}>
            <h6>+ Add an new amenity</h6>
          </div>
        </Collapse>
        <Collapse in={adding}>
          <div>
            <div style={{ display: "flex" }}>
              <Form.Group className="mb-3" style={{ flex: 1, marginRight: 5 }}>
                <Form.Label>Amenity name</Form.Label>
                <Form.Control placeholder="Hogwarts" />
              </Form.Group>
              <Form.Group className="mb-3" style={{ marginLeft: 5 }}>
                <Form.Label>Price</Form.Label>
                <Form.Control placeholder="$25.00" />
              </Form.Group>
            </div>
            <div style={{ marginBottom: 20, display: "flex", justifyContent: "flex-end" }}>
              <Button variant="outline-primary" style={{ marginRight: 5 }} onClick={() => setAdding(false)}>
                Cancel
              </Button>
              <Button style={{ marginLeft: 5 }} onClick={() => setAdding(false)}>
                Add amenity
              </Button>
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
}
