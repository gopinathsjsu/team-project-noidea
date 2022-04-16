import { useState } from "react";
import { Container } from "react-bootstrap";
import BookingInput from "./components/BookingInput";
import BookingList from "./components/BookingList";

export default function Book(props) {
  const [hotels, setHotels] = useState([]);
  const [bookingParam, setBookingParam] = useState({});

  return (
    <Container style={{ marginTop: 20, maxWidth: 700 }}>
      <h3>Book a stay</h3>
      <div style={{ marginTop: 30 }}>
        {hotels.length === 0 ? (
          <BookingInput
            bookingParam={bookingParam}
            onComplete={(foundHotels, bookParams) => {
              setHotels(foundHotels);
              setBookingParam(bookParams);
            }}
          />
        ) : (
          <BookingList hotels={hotels} bookingParam={bookingParam} setHotels={setHotels} />
        )}
      </div>
    </Container>
  );
}
