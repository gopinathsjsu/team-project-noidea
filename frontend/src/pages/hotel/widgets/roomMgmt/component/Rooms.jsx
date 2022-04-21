import { useState } from "react";
import { Button, Collapse, Form } from "react-bootstrap";

const mockRooms = [
  {
    name: "Standard Queen",
    price: "$100",
    description: "The standard single room with basic view and amenities."
  },
  {
    name: "Double Queen",
    price: "$150",
    description: "Room with 2 queen beds with basic view and amenities."
  },
  {
    name: "Deluxe Suite",
    price: "$300",
    description: "Luxurious suite with 2 bedroom each with a King bed."
  }
];

export default function Rooms(props) {
  const [adding, setAdding] = useState(false);

  return (
    <div style={{ maxWidth: 700, marginBottom: 150 }}>
      {mockRooms &&
        mockRooms.map((room) => (
          <div className="skinny-item-container">
            <h6>
              {room.name} - {room.price}
            </h6>
            <p>{room.description}</p>
          </div>
        ))}
      <div className="skinny-item-container">
        <Collapse in={!adding}>
          <div>
            <h6 style={{ marginBottom: 10 }} onClick={() => setAdding(true)}>
              + Add a new hotel room
            </h6>
          </div>
        </Collapse>
        <Collapse in={adding}>
          <div>
            <div style={{ display: "flex" }}>
              <Form.Group className="mb-3" style={{ flex: 1 }}>
                <Form.Label>Room name</Form.Label>
                <Form.Control placeholder="Standard room" />
              </Form.Group>
              <Form.Group className="mb-3" style={{ marginLeft: 10 }}>
                <Form.Label>Price</Form.Label>
                <Form.Control />
              </Form.Group>
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
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
