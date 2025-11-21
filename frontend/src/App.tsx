import { Link, Outlet, useLocation } from "react-router";
import "./App.css";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
import { getDefaultTab } from "./lib/utils";
import Control from "./components/ui/control";
import { lazy } from "react";

const Container3DView = lazy(() => import("./components/3d/three"));

function App() {
  const location = useLocation();

  return (
    <>
      <div className="grid grid-cols-2 w-full h-screen">
        {/* DATA MANAGER WINDOW */}

        <div className="p-16 border-r-2 overflow-auto">
          <main>
            <Tabs className="mb-6" value={getDefaultTab(location.pathname)}>
              <nav>
                <TabsList>
                  <TabsTrigger value="about" asChild>
                    <Link to="/">About</Link>
                  </TabsTrigger>

                  <TabsTrigger value="transits" asChild>
                    <Link to="/transits">Transits</Link>
                  </TabsTrigger>

                  <TabsTrigger value="parcels" asChild>
                    <Link to="/parcels">Parcels</Link>
                  </TabsTrigger>

                  <TabsTrigger value="locations" asChild>
                    <Link to="/locations">Locations</Link>
                  </TabsTrigger>
                </TabsList>
              </nav>
            </Tabs>
            <Outlet />
          </main>
        </div>

        {/* THREE.JS VISUALIZATION WINDOW */}

        <div className="h-screen flex flex-col overflow-hidden">
          <Container3DView />
          <div className="h-10 px-4 text-xs bg-linear-to-r from-muted/50 to-muted/30 backdrop-blur-sm flex items-center justify-center border-t border-border/50 gap-4">
            <Control keyName="Left Click" label="Rotate" />
            <Control keyName="Right Click" label="Pan" />
            <Control keyName="Scroll" label="Zoom" />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
