import { Outlet } from "react-router";
import "./App.css";
import { useData } from "./providers/data-provider";

function App() {
  const data = useData();

  return (
    <>
      <div className="flex w-full">
        {/* DATA MANAGER WINDOW */}

        <div className="w-1/2">
          <Outlet />
        </div>

        {/* THREE.JS VISUALIZATION WINDOW */}

        <div className="w-1/2"></div>
      </div>
    </>
  );
}

export default App;
