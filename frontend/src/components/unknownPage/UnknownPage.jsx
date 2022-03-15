import { Container, Image } from "react-bootstrap";
import "./UnknownPage.css";

export default function UnknownPage(props) {
  return (
    <Container fluid="sm" className="error-container">
      <Image src="owl_error.png" width={200} className="error-image"></Image>
      <h4>{props.msg}</h4>
    </Container>
  );
}
