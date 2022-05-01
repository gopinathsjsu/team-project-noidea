import { useEffect, useState } from "react";
import { Button, Collapse, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getHotelDataRdx } from "../../../../../redux/context/contextSelectors";
import { setGlobalLoad } from "../../../../../redux/globalUI/globalUISlice";
import { getRoomsRdx } from "../../../../../redux/hotelData/hotelDataSelector";
import { updateRoom } from "../../../../../redux/hotelData/hotelDataSlice";
import BookingServiceUtil from "../../../../../util/bookingServiceUtil";

function RoomEditing(props) {
  const { setAdding, fields, setFields } = props;

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Form.Group className="mb-3" style={{ flex: 1 }}>
          <Form.Label>Room name</Form.Label>
          <Form.Control
            placeholder="Standard room"
            value={fields.roomName}
            onChange={(e) => setFields((fls) => ({ ...fls, roomName: e.target.value }))}
          />
        </Form.Group>
        <Form.Group className="mb-3" style={{ marginLeft: 10 }}>
          <Form.Label>Price</Form.Label>
          <Form.Control
            value={fields.roomPrice}
            onChange={(e) => setFields((fls) => ({ ...fls, roomPrice: e.target.value }))}
          />
        </Form.Group>
      </div>
      <Form.Group className="mb-3">
        <Form.Label>Room Type</Form.Label>
        <Form.Select
          value={fields.roomType}
          onChange={(e) => setFields((fls) => ({ ...fls, roomType: e.target.value }))}>
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="Triple">Triple</option>
          <option value="Quad">Quad</option>
        </Form.Select>
      </Form.Group>
      <div style={{ marginBottom: 20, display: "flex", justifyContent: "flex-end" }}>
        <div style={{ flex: 1 }}>
          <Button variant="outline-danger">Delete</Button>
        </div>
        <div>
          <Button
            variant="outline-primary"
            style={{ marginRight: 5 }}
            onClick={() => {
              setAdding(false);
              props.onCancel && props.onCancel();
            }}>
            Cancel
          </Button>
          <Button
            style={{ marginLeft: 5 }}
            onClick={() => {
              setAdding(false);
              props.onSubmit && props.onSubmit();
            }}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

function RoomItem(props) {
  const { room } = props;
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [fields, setFields] = useState({
    roomName: room.roomName,
    roomPrice: room.roomPrice,
    roomType: room.roomType
  });

  return (
    <div className="skinny-item-container">
      <Collapse in={!editing}>
        <div onClick={() => setEditing(true)}>
          <div>
            <h6>
              {fields.roomName} - ${fields.roomPrice}
            </h6>
          </div>
          <p>{fields.roomType}</p>
        </div>
      </Collapse>
      <Collapse in={editing}>
        <div>
          <RoomEditing
            setAdding={setEditing}
            fields={fields}
            setFields={setFields}
            onCancel={() =>
              setFields({
                roomName: room.roomName,
                roomPrice: room.roomPrice,
                roomType: room.roomType
              })
            }
            onSubmit={async () => {
              dispatch(setGlobalLoad(true));
              await BookingServiceUtil.updateExistingRoom(room.roomId, {
                ...fields
              });
              const resp = await BookingServiceUtil.getRooms();
              if (resp && !resp.error) {
                dispatch(updateRoom(resp));
              }
              dispatch(setGlobalLoad(false));
            }}
          />
        </div>
      </Collapse>
    </div>
  );
}

export default function Rooms(props) {
  const hotelData = useSelector(getHotelDataRdx);
  const dispatch = useDispatch();
  const roomsRdx = useSelector(getRoomsRdx);
  const [adding, setAdding] = useState(false);
  const [newRoom, setNewRoom] = useState({
    roomName: "",
    roomType: "",
    roomPrice: ""
  });

  useEffect(() => {
    if (!roomsRdx || roomsRdx.length === 0) {
      (async () => {
        const resp = await BookingServiceUtil.getRooms();
        if (resp && !resp.error) {
          dispatch(updateRoom(resp));
        }
      })();
    }
  }, [dispatch, roomsRdx]);

  return (
    <div style={{ maxWidth: 700, marginBottom: 150 }}>
      {roomsRdx &&
        roomsRdx.map((room, idx) => (
          <div key={`${idx}_${room.roomId}`}>
            <RoomItem room={room} />
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
            <RoomEditing
              setAdding={setAdding}
              fields={newRoom}
              setFields={setNewRoom}
              onCancel={() =>
                setNewRoom({
                  roomName: "",
                  roomType: "",
                  roomPrice: ""
                })
              }
              onSubmit={async () => {
                dispatch(setGlobalLoad(true));
                await BookingServiceUtil.updateRoom({
                  hotelId: hotelData.hotelId,
                  ...newRoom
                });
                const resp = await BookingServiceUtil.getRooms();
                if (resp && !resp.error) {
                  dispatch(updateRoom(resp));
                }
                setNewRoom({
                  roomName: "",
                  roomType: "",
                  roomPrice: ""
                });
                dispatch(setGlobalLoad(false));
              }}
            />
          </div>
        </Collapse>
      </div>
    </div>
  );
}
