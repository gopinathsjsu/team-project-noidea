import { Route, Routes, useNavigate } from "react-router-dom";
import CustomerView from "./component/CustomerView";

const customers = [
  {
    id: "3423523",
    name: "Ansel Wilfried",
    loyaltyStatus: "Boreal Owl"
  },
  {
    id: "4634135",
    name: "Jasmine Stanley",
    loyaltyStatus: "Elf Owl"
  }
];

function CustomerList(props) {
  const navigate = useNavigate();

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Customers</h3>
      {customers.map((cust) => (
        <div className="skinny-item-container" onClick={() => navigate(cust.id, { state: { ...cust } })}>
          <h6>{cust.name}</h6>
          <p>{cust.loyaltyStatus}</p>
        </div>
      ))}
    </div>
  );
}

export default function Customer(props) {
  return (
    <Routes>
      <Route index element={<CustomerList />}></Route>
      <Route path="/:customerId" element={<CustomerView />}></Route>
    </Routes>
  );
}
