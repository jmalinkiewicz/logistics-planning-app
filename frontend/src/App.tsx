import { Link, Outlet, useLocation } from "react-router";
import "./App.css";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
import { getDefaultTab } from "./lib/utils";

function App() {
  // const data = useData();
  const location = useLocation();
  console.log(getDefaultTab(location.pathname));

  return (
    <>
      <div className="flex w-full h-screen">
        {/* DATA MANAGER WINDOW */}

        <div className="w-1/2 p-16 border-r-2">
          <Tabs className="mb-6" value={getDefaultTab(location.pathname)}>
            <TabsList>
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
