import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as dayjs from "dayjs";

import { getCardDataRdx, getUserIdRdx } from "../../../../../redux/context/contextSelectors";
import { setGlobalLoad, triggerMessage } from "../../../../../redux/globalUI/globalUISlice";
import BookingServiceUtil from "../../../../../util/bookingServiceUtil";
import LoyaltyServiceUtil from "../../../../../util/loyaltyServiceUtil";

const DAY_MAPPER = {
  0: "Weekends",
  1: "Weekdays",
  2: "Weekdays",
  3: "Weekdays",
  4: "Weekdays",
  5: "Weekdays",
  6: "Weekends"
};

const SEASON_MAPPER = {
  0: "Regular",
  1: "Regular",
  2: "Regular",
  3: "Regular",
  4: "Regular",
  5: "Regular",
  6: "Summer",
  7: "Summer",
  8: "Summer",
  9: "Regular",
  10: "Regular",
  11: "Christmas"
};

function RoomOptionSelector(props) {
  const { fields, setFields } = props;

  return (
    <div style={{ marginBottom: 20 }}>
      <hr />
      <h6 style={{ marginBottom: 0 }}>Room {props.roomId} style and amenities</h6>
      <Row>
        {props.hotelRoom?.map &&
          props.hotelRoom.map((h) => (
            <Col xs={12} sm={4}>
              <div
                className={
                  "skinny-item-container " +
                  (fields[props.roomId]?.roomId === h.roomId ? "skinny-item-container-selected" : "")
                }
                onClick={() =>
                  setFields((fls) => {
                    if (fls.roomId === h.roomId) {
                      return { ...fls, [props.roomId]: { ...(fls[props.roomId] ?? {}), roomId: undefined } };
                    }
                    return { ...fls, [props.roomId]: { ...(fls[props.roomId] ?? {}), roomId: h.roomId } };
                  })
                }>
                <h6>{h.roomName}</h6>
                <p>{h.roomType}</p>
              </div>
            </Col>
          ))}
      </Row>
      <h6 className="secondary-color" style={{ marginTop: 15 }}>
        Additional amenities
      </h6>
      <Row>
        {props?.hotelAmenity?.map &&
          props.hotelAmenity.map((a) => (
            <Col xs={12} sm={6}>
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  label={`${a.amenityName} $${a.amenityPrice}`}
                  onClick={(e) => {
                    setFields((fls) => ({
                      ...fls,
                      [props.roomId]: { ...(fls[props.roomId] ?? {}), [`amenity_${a.amenityId}`]: e.target.checked }
                    }));
                  }}
                />
              </Form.Group>
            </Col>
          ))}
      </Row>
    </div>
  );
}

export default function BookingRoom(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navLocation = useLocation();
  const userId = useSelector(getUserIdRdx);
  const cardData = useSelector(getCardDataRdx);
  const navState = navLocation?.state;
  const navStateHotel = navState?.hotel;
  const [hotelAmenity, setHotelAmenity] = useState([]);
  const [hotelRoom, setHotelRoom] = useState([]);
  const [fields, setFields] = useState({});

  useEffect(() => {
    (async () => {
      const resp = await BookingServiceUtil.getAmenitites();
      if (resp?.length > 0) {
        const hotelAmenity = resp.filter((a) => a.hotelId === navStateHotel.hotelId);
        setHotelAmenity(hotelAmenity);
      }
    })();
    (async () => {
      const resp = await BookingServiceUtil.getRooms();
      if (resp?.length > 0) {
        const hotelAmenity = resp.filter((a) => a.hotelId === navStateHotel.hotelId);
        setHotelRoom(hotelAmenity);
      }
    })();
  }, [navStateHotel]);

  return (
    <Modal show fullscreen onHide={() => navigate(-1)}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Container style={{ maxWidth: 700 }}>
          <h3 style={{ marginTop: 25 }}>
            {navState.bookingParam.rooms} room(s) at the {navState.hotel.BranchName}
          </h3>
          <h6 className="secondary-color" style={{ marginBottom: 30 }}>
            From {navState.bookingParam.checkin} to {navState.bookingParam.checkout} in {navState.bookingParam.location}
          </h6>
          <div>
            {[...Array(parseInt(navState.bookingParam.rooms) ?? 1)].map((_, idx) => (
              <div key={`${idx}`}>
                <RoomOptionSelector
                  roomId={idx + 1}
                  hotelAmenity={hotelAmenity}
                  hotelRoom={hotelRoom}
                  fields={fields}
                  setFields={setFields}
                />
              </div>
            ))}
            <hr />
            <p>Charged to card ending in ••••{cardData.CardNumber.slice(-4)}</p>
          </div>
          <div style={{ marginTop: 30, marginBottom: 150 }}>
            <Form.Group>
              <Form.Check
                onChange={(e) => setFields((fls) => ({ ...fls, tacCheck: e.target.checked }))}
                type="checkbox"
                label="By clicking Book, you agree to the terms of service and the privacy statement of Hootel."
              />
            </Form.Group>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Button
                disabled={!fields.tacCheck}
                style={{ margin: "20px 0px 0px 0px", paddingLeft: 30, paddingRight: 30 }}
                onClick={async () => {
                  console.log(fields);
                  dispatch(setGlobalLoad(true));
                  const resp = await BookingServiceUtil.bookRoom({
                    userId,
                    room: Object.keys(fields)
                      .filter((f) => f !== "tacCheck")
                      .map((bookingRoomId) => {
                        const bookRoomInfo = fields[bookingRoomId];
                        const amenityIds = Object.keys(bookRoomInfo)
                          .filter((fieldKey) => fieldKey.includes("amenity_"))
                          .map((fieldKey) => fieldKey.split("_")[1]);
                        return {
                          amenityIds,
                          roomId: bookRoomInfo.roomId
                        };
                      }),
                    branchId: navStateHotel.branchId,
                    startDate: navState.bookingParam.checkin,
                    endDate: navState.bookingParam.checkout,
                    days: DAY_MAPPER[dayjs(navState.bookingParam.checkin).day()],
                    season: SEASON_MAPPER[dayjs(navState.bookingParam.checkin).month()]
                  });
                  const daysStayed = dayjs(navState.bookingParam.checkout).diff(navState.bookingParam.checkin, "day");
                  const loyaltyId = await LoyaltyServiceUtil.getLoyaltyAccountId(userId);

                  const addPoint = await LoyaltyServiceUtil.addPoints(loyaltyId?.loyalty?.id, daysStayed);
                  if (resp.error || addPoint.error) {
                    dispatch(
                      triggerMessage({
                        errorType: "TOAST_ERROR",
                        title: "Something went wrong",
                        body: "Try again later and it should work"
                      })
                    );
                  }
                  navigate("/customer/stays?type=active");
                  dispatch(
                    triggerMessage({
                      errorType: "TOAST_SUCCESS",
                      title: "Your stay has been booked!",
                      body: `Confirmed for ${navState.bookingParam.rooms} room(s) at ${navState.hotel.BranchName} between ${navState.bookingParam.checkin} and ${navState.bookingParam.checkout}`
                    })
                  );
                  dispatch(setGlobalLoad(false));
                }}>
                Book
              </Button>
            </div>
          </div>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
