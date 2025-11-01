import { Link, Outlet, useLocation } from "react-router";
import "./App.css";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
import { getDefaultTab } from "./lib/utils";
import { Container3DView } from "./components/3d/three";

function App() {
  const location = useLocation();

  return (
    <>
      <div className="flex w-full h-screen">
        {/* DATA MANAGER WINDOW */}

        <div className="w-1/2 p-16 border-r-2  overflow-scroll">
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

        <div className="w-1/2 h-screen flex flex-col overflow-hidden">
          <Container3DView />
          <div className="h-10 px-4 text-xs bg-linear-to-r from-muted/50 to-muted/30 backdrop-blur-sm flex items-center justify-center border-t border-border/50 gap-4">
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-0.5 text-[10px] font-semibold bg-background/80 border border-border rounded shadow-sm">
                Left Click
              </kbd>
              <span className="text-muted-foreground">Rotate</span>
            </div>
            <div className="h-4 w-px bg-border/50" />
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-0.5 text-[10px] font-semibold bg-background/80 border border-border rounded shadow-sm">
                Right Click
              </kbd>
              <span className="text-muted-foreground">Pan</span>
            </div>
            <div className="h-4 w-px bg-border/50" />
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-0.5 text-[10px] font-semibold bg-background/80 border border-border rounded shadow-sm">
                Scroll
              </kbd>
              <span className="text-muted-foreground">Zoom</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
