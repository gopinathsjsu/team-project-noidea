import { useState } from "react";
import { Collapse, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { setGlobalLoad } from "../../../../redux/globalUI/globalUISlice";
import HotelServiceUtil from "../../../../util/hotelServiceUtil";
import BookingInput from "./components/BookingInput";
import BookingList from "./components/BookingList";
import BookingRoom from "./components/BookingRoom";

export default function Book(props) {
  const [hotels, setHotels] = useState([]);
  const dispatch = useDispatch();
  const [bookingParam, setBookingParam] = useState({});

  const queryBook = async () => {
    dispatch(setGlobalLoad(true));
    const resp = await HotelServiceUtil.getBranches("-1");
    if (resp?.branches) {
      let tmpHotel = [];
      Object.entries(resp.branches).forEach(([key, val]) => {
        if (val?.length > 0) {
          const tmpVal = val.map((v) => ({ ...v, hotelId: key }));
          tmpHotel = [...tmpHotel, ...tmpVal];
        }
      });
      console.log(tmpHotel);
      setHotels(tmpHotel);
    }
    dispatch(setGlobalLoad(false));
  };

  const BookBody = () => (
    <Container style={{ marginTop: 20, maxWidth: 700, marginBottom: 150 }}>
      <h3>Book a stay</h3>
      <div style={{ marginTop: 30 }}>
        <Collapse in={hotels.length === 0}>
          <div>
            <BookingInput
              onQuery={queryBook}
              bookingParam={bookingParam}
              onComplete={(bookParams) => {
                setBookingParam(bookParams);
              }}
            />
          </div>
        </Collapse>
        <Collapse in={hotels.length !== 0}>
          <div>
            <BookingList hotels={hotels} bookingParam={bookingParam} setHotels={setHotels} />
          </div>
        </Collapse>
      </div>
    </Container>
  );

  return (
    <Routes>
      <Route index element={<BookBody />}></Route>
      <Route path="/new" element={<BookingRoom />}></Route>
    </Routes>
  );
}
