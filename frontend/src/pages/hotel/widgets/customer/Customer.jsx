import { Route, Routes, useNavigate } from "react-router-dom";
import CustomerView from "./component/CustomerView";

const customers = [
  {
    id: "3423523",
    name: "Ansel Wilfried",
    loyaltyStatus: "Boreal Owl",
    phone: "(632) 532-1251"
  },
  {
    id: "4634135",
    name: "Jasmine Stanley",
    loyaltyStatus: "Elf Owl",
    phone: "(632) 532-1251"
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
          <p className="no-margin">
            <b>Tel: </b>
            {cust.phone}
          </p>
          <p>
            <b>Loyalty status: </b>
            {cust.loyaltyStatus}
          </p>
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
