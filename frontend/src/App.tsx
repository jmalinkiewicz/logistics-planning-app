import { Link, Outlet } from "react-router";
import "./App.css";
import { useData } from "./providers/data-provider";
import { Button } from "./components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";

function App() {
  const data = useData();

  return (
    <>
      <div className="flex w-full h-screen">
        {/* DATA MANAGER WINDOW */}

        <div className="w-1/2 p-16 border-r-2">
          <Tabs>
            <TabsList defaultValue={"about"}>
              <Link to="/">
                <TabsTrigger value="about">About</TabsTrigger>
              </Link>
              <Link to="/transits">
                <TabsTrigger value="transits">Transits</TabsTrigger>
              </Link>
              <Link to="/parcels">
                <TabsTrigger value="parcels">Parcels</TabsTrigger>
              </Link>
              <Link to="/locations">
                <TabsTrigger value="locations">Locations</TabsTrigger>
              </Link>
            </TabsList>
          </Tabs>
          <Outlet />
        </div>

        {/* THREE.JS VISUALIZATION WINDOW */}

        <div className="w-1/2"></div>
      </div>
    </>
  );
}

export default App;
