import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/home-component.";
import Navigation from "./routes/navigation/navigation-component";
import SingIn from "./routes/signin/signin-component";

const Shop = ()=>{
  return <h1>I am the shop page</h1>
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation/>}>
      <Route index element={<Home />} />
      <Route path="shop" element={<Shop />} />
      <Route path="sign-in" element={<SingIn />} />
      </Route>
    </Routes>
  );
}

export default App;
