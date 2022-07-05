import Directory from "../../components/directory/directory";
import { Outlet } from "react-router-dom";

function Home() {


  return (
    <div className="directory-container">
      <Outlet/>
      <Directory/>
    </div>
  );
}

export default Home;
