import { Outlet } from "react-router-dom";
import Categories from "../..//components/categories/categories";
/**
 * Outled used for nested matching
 * Outlet a component that renders the next match in a set of matches
 * We can use outlet inorder to persist navigation bar
 */


function Home() {
  return (
    <div>
      <Categories />;
      <Outlet />
    </div>
  );
}

export default Home;
