import { useState } from "react";
import { Collapse, Container } from "react-bootstrap";
import BookingInput from "./components/BookingInput";
import BookingList from "./components/BookingList";

export default function Book(props) {
  const [hotels, setHotels] = useState([]);
  const [bookingParam, setBookingParam] = useState({});

  return (
    <Container style={{ marginTop: 20, maxWidth: 700 }}>
      <h3>Book a stay</h3>
      <div style={{ marginTop: 30 }}>
        <Collapse in={hotels.length === 0}>
          <div>
            <BookingInput
              bookingParam={bookingParam}
              onComplete={(foundHotels, bookParams) => {
                setHotels(foundHotels);
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
}
