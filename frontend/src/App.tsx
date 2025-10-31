import "./App.css";
import { useData } from "./providers/data-provider";

function App() {
  const data = useData();

  return (
    <>
      <pre
        style={{
          textAlign: "left",
          backgroundColor: "black",
        }}
      >
        {JSON.stringify(data, null, 2)}
      </pre>
    </>
  );
}

export default App;
