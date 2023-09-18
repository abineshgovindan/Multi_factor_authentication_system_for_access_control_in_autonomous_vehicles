
import { Outlet } from "react-router-dom";
import { Footer } from "../component/Footer";
import { NavBar } from "../component/NavBar";

export function Root() {
  return (
    <div className="wrapper">
      <NavBar />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
