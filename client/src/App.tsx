import { Routes, Route } from "react-router-dom"
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { useEffect } from "react";


const Shop = () => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  useEffect(()=>{
    console.log(userInfo)
  },[])
  return (
    <h1>Shop page</h1>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element = {<Authentication/>}/>
      </Route>

    </Routes>
  );
}

export default App;
